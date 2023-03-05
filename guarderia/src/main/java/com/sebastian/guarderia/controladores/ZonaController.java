package com.sebastian.guarderia.controladores;

import com.sebastian.guarderia.excepciones.EmpleadoNoEncontradoException;
import com.sebastian.guarderia.excepciones.GarageNoEncontradoException;
import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import com.sebastian.guarderia.excepciones.ZonaNoEncontradoException;
import com.sebastian.guarderia.modelo.ensambladores.EmpleadoModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.GarageModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.ZonaModelAssembler;
import com.sebastian.guarderia.modelo.entidades.Empleado;
import com.sebastian.guarderia.modelo.entidades.EmpleadoZona;
import com.sebastian.guarderia.modelo.entidades.Garage;
import com.sebastian.guarderia.modelo.entidades.Vehiculo;
import com.sebastian.guarderia.modelo.entidades.Zona;
import com.sebastian.guarderia.repositorios.EmpleadoRepository;
import com.sebastian.guarderia.repositorios.EmpleadoZonaRepository;
import com.sebastian.guarderia.repositorios.GarageRepository;
import com.sebastian.guarderia.repositorios.VehiculoRepository;
import com.sebastian.guarderia.repositorios.ZonaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author sebastian
 */
@RestController
public class ZonaController {

    private ZonaRepository repository;
    private ZonaModelAssembler assembler;
    private EmpleadoRepository empleadoRepository;
    private EmpleadoModelAssembler empleadoAssembler;
    private GarageRepository garageRepository;
    private GarageModelAssembler garageAssembler;
    private VehiculoRepository vehiculoRepository;
    private EmpleadoZonaRepository empleadoZonaRepository;

    /**
     *
     * @param repository
     * @param assembler
     * @param empleadoRepository
     * @param empleadoAssembler
     * @param garageRepository
     * @param garageAssembler
     * @param vehiculoRepository
     * @param empleadoZonaRepository
     */
    public ZonaController(ZonaRepository repository, ZonaModelAssembler assembler, EmpleadoRepository empleadoRepository, EmpleadoModelAssembler empleadoAssembler, GarageRepository garageRepository, GarageModelAssembler garageAssembler, VehiculoRepository vehiculoRepository, EmpleadoZonaRepository empleadoZonaRepository) {
        this.repository = repository;
        this.assembler = assembler;
        this.empleadoRepository = empleadoRepository;
        this.empleadoAssembler = empleadoAssembler;
        this.garageRepository = garageRepository;
        this.garageAssembler = garageAssembler;
        this.vehiculoRepository = vehiculoRepository;
        this.empleadoZonaRepository = empleadoZonaRepository;
    }

    /**
     *
     * @param letra
     * @return
     */
    @GetMapping("/zonas/{letra}")
    public EntityModel<Zona> one(@PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        return assembler.toModel(zona);
    }

    /**
     *
     * @return
     */
    @GetMapping("/zonas")
    public CollectionModel<EntityModel<Zona>> all() {
        List<EntityModel<Zona>> zonas = repository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(zonas, linkTo(methodOn(ZonaController.class).all()).withSelfRel());
    }

    /**
     *
     * @param zona
     * @return
     */
    @PostMapping("/zonas")
    public ResponseEntity<?> newZona(@RequestBody Zona zona) {
        Optional<Zona> empleadoBuscado = repository.findById(zona.getLetra());
        if(empleadoBuscado.isPresent()){
            throw new IdAsignadoActualmenteException(Character.toString(zona.getLetra()));
        }
        EntityModel<Zona> zonaModel = assembler.toModel(repository.save(zona));
        return ResponseEntity.created(zonaModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(zonaModel);
    }

    /**
     *
     * @param letra
     * @return
     */
    @DeleteMapping("/zonas/{letra}")
    public ResponseEntity<?> deleteZona(@PathVariable Character letra) {
        repository.deleteById(letra);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param zonaNuevo
     * @param letra
     * @return
     */
    @PutMapping("/zonas/{letra}")
    public ResponseEntity<?> replace(@RequestBody Zona zonaNuevo, @PathVariable Character letra) {
        Zona zonaActualizada = repository.findById(letra).map(zona -> {
            zona.setAnchoGarage(zonaNuevo.getAnchoGarage());
            zona.setGarages(zonaNuevo.getGarages());
            zona.setProfundidadGarage(zonaNuevo.getProfundidadGarage());
            zona.setTipoVehiculo(zonaNuevo.getTipoVehiculo());
            return repository.save(zona);
        }).orElseGet(() -> {
            zonaNuevo.setLetra(letra);
            return repository.save(zonaNuevo);
        });
        EntityModel<Zona> zonaModel = assembler.toModel(zonaActualizada);
        return ResponseEntity.created(zonaModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(zonaModel);
    }

    /**
     *
     * @param empleadoNuevo
     * @param letra
     * @return
     */
    @PostMapping("/zonas/{letra}/empleados")
    public ResponseEntity<?> addEmpleado(@RequestBody Empleado empleadoNuevo, @PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        Empleado empleado = empleadoRepository.findById(empleadoNuevo.getCodigo()).orElseThrow(() -> new EmpleadoNoEncontradoException(empleadoNuevo.getCodigo()));
        EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
        empleado.getZonas().add(empleadoZona);
        zona.getEmpleados().add(empleadoZona);
        empleadoZonaRepository.save(empleadoZona);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param codigo
     * @param letra
     * @return
     */
    @DeleteMapping("/zonas/{letra}/empleados/{codigo}")
    public ResponseEntity<?> removeEmpleado(@PathVariable Integer codigo, @PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        Empleado empleado = empleadoRepository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        EmpleadoZona empleadoZonaBuscado = new EmpleadoZona(empleado, zona);
        EmpleadoZona empleadoZonaEncontrado = null;
        int i = 0;
        while (empleadoZonaEncontrado == null && i < zona.getEmpleados().size()) {
            if (zona.getEmpleados().get(i).equals(empleadoZonaBuscado)) {
                empleadoZonaEncontrado = zona.getEmpleados().get(i);
            } else {
                i++;
            }
        }
        if (empleadoZonaEncontrado != null) {
            zona.getEmpleados().remove(empleadoZonaBuscado);
            empleado.getZonas().remove(empleadoZonaBuscado);
            empleadoZonaBuscado.setEmpleado(null);
            empleadoZonaBuscado.setZona(null);
            empleadoZonaRepository.delete(empleadoZonaEncontrado);
        }
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param garageNuevo
     * @param letra
     * @return
     */
    @PostMapping("/zonas/{letra}/garages")
    public ResponseEntity<?> addGarage(@RequestBody Garage garageNuevo, @PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        Garage garage = garageRepository.findById(garageNuevo.getNumeroGarage()).orElseThrow(() -> new GarageNoEncontradoException(garageNuevo.getNumeroGarage()));
        zona.addGarage(garage);
        repository.save(zona);
        garageRepository.save(garage);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param letra
     * @param numeroGarage
     * @return
     */
    @DeleteMapping("/zonas/{letra}/garages/{numeroGarage}")
    public ResponseEntity<?> removeGarage(@PathVariable Character letra, @PathVariable Integer numeroGarage) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        Garage garage = garageRepository.findById(numeroGarage).orElseThrow(() -> new GarageNoEncontradoException(numeroGarage));
        zona.removeGarage(garage);
        repository.save(zona);
        garageRepository.save(garage);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param letra
     * @return
     */
    @GetMapping("/zonas/{letra}/empleados/asignables")
    public CollectionModel<EntityModel<Empleado>> getEmpleadosAsignables(@PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        List<Empleado> empleados = empleadoRepository.findAll();
        List<Empleado> empleadosAsignables = empleados.stream().filter(empleado -> {
            EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
            return !empleado.getZonas().contains(empleadoZona);
        }).collect(Collectors.toList());
        List<EntityModel<Empleado>> empleadosAsignablesModel = empleadosAsignables.stream().map(empleadoAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(empleadosAsignablesModel, linkTo(methodOn(ZonaController.class).getEmpleadosAsignables(letra)).withSelfRel());
    }

    /**
     *
     * @param letra
     * @return
     */
    @GetMapping("/zonas/{letra}/empleados/asignados")
    public CollectionModel<EntityModel<Empleado>> getEmpleadosAsignados(@PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        List<Empleado> empleados = empleadoRepository.findAll();
        List<Empleado> empleadosAsignados = empleados.stream().filter(empleado -> {
            EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
            return empleado.getZonas().contains(empleadoZona);
        }).collect(Collectors.toList());
        List<EntityModel<Empleado>> empleadosAsignadosModel = empleadosAsignados.stream().map(empleadoAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(empleadosAsignadosModel, linkTo(methodOn(ZonaController.class).getEmpleadosAsignables(letra)).withSelfRel());
    }

    /**
     *
     * @param letra
     * @return
     */
    @GetMapping("/zonas/{letra}/garages/asignables")
    public CollectionModel<EntityModel<Garage>> getGaragesAsignables(@PathVariable Character letra) {
        List<Garage> garages = garageRepository.findAll();
        List<Garage> garagesAsignables = new ArrayList<>();
        for (Garage garage : garages) {
            if (garage.getZona() == null) {
                garagesAsignables.add(garage);
            }
        }
        List<EntityModel<Garage>> garagesAsignablesModel = garagesAsignables.stream().map(garageAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(garagesAsignablesModel, linkTo(methodOn(ZonaController.class).getGaragesAsignables(letra)).withSelfRel());
    }

    /**
     *
     * @param letra
     * @return
     */
    @GetMapping("/zonas/{letra}/numeroVehiculosContenidos")
    public Integer getNumeroVehiculosContenidos(@PathVariable Character letra) {
        Zona zona = repository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        List<Vehiculo> vehiculos = vehiculoRepository.findAll();
        Integer numeroVehiculosContenidos = 0;
        if (zona.getGarages() != null) {
            for (Vehiculo vehiculo : vehiculos) {
                if (vehiculo.getGarage() != null && zona.getGarages().contains(vehiculo.getGarage())) {
                    numeroVehiculosContenidos++;
                }
            }
        }
        return numeroVehiculosContenidos;
    }

}
