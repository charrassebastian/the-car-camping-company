package com.sebastian.guarderia.controladores;

import com.sebastian.guarderia.excepciones.GarageNoEncontradoException;
import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import com.sebastian.guarderia.excepciones.VehiculoNoEncontradoException;
import com.sebastian.guarderia.modelo.ensambladores.GarageModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.SocioModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.VehiculoModelAssembler;
import com.sebastian.guarderia.modelo.entidades.Garage;
import com.sebastian.guarderia.modelo.entidades.Socio;
import com.sebastian.guarderia.modelo.entidades.Vehiculo;
import com.sebastian.guarderia.repositorios.GarageRepository;
import com.sebastian.guarderia.repositorios.SocioRepository;
import com.sebastian.guarderia.repositorios.VehiculoRepository;
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
public class VehiculoController {

    private VehiculoRepository repository;
    private VehiculoModelAssembler assembler;
    private GarageRepository garageRepository;
    private GarageModelAssembler garageAssembler;
    private SocioRepository socioRepository;
    private SocioModelAssembler socioAssembler;

    /**
     *
     * @param repository
     * @param assembler
     * @param garageRepository
     * @param garageAssembler
     * @param socioRepository
     * @param socioAssembler
     */
    public VehiculoController(VehiculoRepository repository, VehiculoModelAssembler assembler, GarageRepository garageRepository, GarageModelAssembler garageAssembler, SocioRepository socioRepository, SocioModelAssembler socioAssembler) {
        this.repository = repository;
        this.assembler = assembler;
        this.garageRepository = garageRepository;
        this.garageAssembler = garageAssembler;
        this.socioRepository = socioRepository;
        this.socioAssembler = socioAssembler;
    }

    /**
     *
     * @param matricula
     * @return
     */
    @GetMapping("/vehiculos/{matricula}")
    public EntityModel<Vehiculo> one(@PathVariable String matricula) {
        Vehiculo vehiculo = repository.findById(matricula).orElseThrow(() -> new VehiculoNoEncontradoException(matricula));
        return assembler.toModel(vehiculo);
    }

    /**
     *
     * @return
     */
    @GetMapping("/vehiculos")
    public CollectionModel<EntityModel<Vehiculo>> all() {
        List<EntityModel<Vehiculo>> vehiculos = repository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(vehiculos, linkTo(methodOn(VehiculoController.class).all()).withSelfRel());
    }

    /**
     *
     * @param vehiculo
     * @return
     */
    @PostMapping("/vehiculos")
    public ResponseEntity<?> newVehiculo(@RequestBody Vehiculo vehiculo) {
        Optional<Vehiculo> empleadoBuscado = repository.findById(vehiculo.getMatricula());
        if(empleadoBuscado.isPresent()){
            throw new IdAsignadoActualmenteException(vehiculo.getMatricula());
        }
        EntityModel<Vehiculo> vehiculoModel = assembler.toModel(repository.save(vehiculo));
        return ResponseEntity.created(vehiculoModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(vehiculoModel);
    }

    /**
     *
     * @param matricula
     * @return
     */
    @DeleteMapping("/vehiculos/{matricula}")
    public ResponseEntity<?> deleteVehiculo(@PathVariable String matricula) {
        repository.deleteById(matricula);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param vehiculoNuevo
     * @param matricula
     * @return
     */
    @PutMapping("/vehiculos/{matricula}")
    public ResponseEntity<?> replace(@RequestBody Vehiculo vehiculoNuevo, @PathVariable String matricula) {
        Vehiculo vehiculoActualizado = repository.findById(matricula).map(vehiculo -> {
            vehiculo.setAlto(vehiculoNuevo.getAlto());
            vehiculo.setAncho(vehiculoNuevo.getAncho());
            vehiculo.setFechaAsignacionGarage(vehiculoNuevo.getFechaAsignacionGarage());
            vehiculo.setGarage(vehiculoNuevo.getGarage());
            vehiculo.setNombre(vehiculoNuevo.getNombre());
            vehiculo.setProfundidad(vehiculoNuevo.getProfundidad());
            vehiculo.setSocio(vehiculoNuevo.getSocio());
            vehiculo.setTipo(vehiculoNuevo.getTipo());
            return repository.save(vehiculo);
        })
                .orElseGet(() -> {
                    vehiculoNuevo.setMatricula(matricula);
                    return repository.save(vehiculoNuevo);
                });
        EntityModel<Vehiculo> vehiculoModel = assembler.toModel(vehiculoActualizado);
        return ResponseEntity.created(vehiculoModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(vehiculoModel);
    }

    /**
     *
     * @param matricula
     * @param garageNuevo
     * @return
     */
    @PostMapping("/vehiculos/{matricula}/garages")
    public ResponseEntity<?> addGarage(@PathVariable String matricula, @RequestBody Garage garageNuevo) {
        Vehiculo vehiculo = repository.findById(matricula).orElseThrow(() -> new VehiculoNoEncontradoException(matricula));
        Garage garage = garageRepository.findById(garageNuevo.getNumeroGarage()).orElseThrow(() -> new GarageNoEncontradoException(garageNuevo.getNumeroGarage()));
        vehiculo.setGarage(garage);
        repository.save(vehiculo);
        garageRepository.save(garage);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param matricula
     * @return
     */
    @DeleteMapping("/vehiculos/{matricula}/garages")
    public ResponseEntity<?> removeGarage(@PathVariable String matricula) {
        Vehiculo vehiculo = repository.findById(matricula).orElseThrow(() -> new VehiculoNoEncontradoException(matricula));
        vehiculo.setGarage(null);
        repository.save(vehiculo);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param matricula
     * @return
     */
    @GetMapping("/vehiculos/{matricula}/garages/asignables")
    public CollectionModel<EntityModel<Garage>> getGaragesAsignables(@PathVariable String matricula) {
        List<Vehiculo> vehiculos = repository.findAll();
        List<Garage> garages = garageRepository.findAll();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getGarage() != null) {
                garages.remove(vehiculo.getGarage());
            }
        }
        List<EntityModel<Garage>> garagesAsignablesModel = garages.stream().map(garageAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(garagesAsignablesModel, linkTo(methodOn(VehiculoController.class).getGaragesAsignables(matricula)).withSelfRel());
    }

    /**
     *
     * @param matricula
     * @return
     */
    @GetMapping("/vehiculos/{matricula}/socio")
    public EntityModel<Socio> getSocioAsignado(@PathVariable String matricula) {
        Vehiculo vehiculo = repository.findById(matricula).orElseThrow(() -> new VehiculoNoEncontradoException(matricula));
        boolean encontrado = false;
        List<Socio> socios = socioRepository.findAll();
        int i = 0;
        while (i < socios.size() && !encontrado) {
            if (socios.get(i).getVehiculos() != null && socios.get(i).getVehiculos().contains(vehiculo)) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado ? socioAssembler.toModel(socios.get(i)) : null;
    }
}
