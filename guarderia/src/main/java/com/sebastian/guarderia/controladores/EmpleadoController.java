package com.sebastian.guarderia.controladores;

import com.sebastian.guarderia.excepciones.EmpleadoNoEncontradoException;
import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import com.sebastian.guarderia.excepciones.ZonaNoEncontradoException;
import com.sebastian.guarderia.modelo.ensambladores.EmpleadoModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.ZonaModelAssembler;
import com.sebastian.guarderia.modelo.entidades.Empleado;
import com.sebastian.guarderia.modelo.entidades.EmpleadoZona;
import com.sebastian.guarderia.modelo.entidades.Zona;
import com.sebastian.guarderia.repositorios.EmpleadoRepository;
import com.sebastian.guarderia.repositorios.EmpleadoZonaRepository;
import com.sebastian.guarderia.repositorios.ZonaRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
public class EmpleadoController {

    private EmpleadoRepository repository;
    private EmpleadoModelAssembler assembler;
    private ZonaRepository zonaRepository;
    private ZonaModelAssembler zonaAssembler;
    private EmpleadoZonaRepository empleadoZonaRepository;

    /**
     *
     * @param repository
     * @param assembler
     * @param zonaRepository
     * @param zonaAssembler
     * @param empleadoZonaRepository
     */
    public EmpleadoController(EmpleadoRepository repository, EmpleadoModelAssembler assembler, ZonaRepository zonaRepository, ZonaModelAssembler zonaAssembler, EmpleadoZonaRepository empleadoZonaRepository) {
        this.repository = repository;
        this.assembler = assembler;
        this.zonaRepository = zonaRepository;
        this.zonaAssembler = zonaAssembler;
        this.empleadoZonaRepository = empleadoZonaRepository;
    }

    /**
     *
     * @param codigo
     * @return
     */
    @GetMapping("/empleados/{codigo}")
    public EntityModel<Empleado> one(@PathVariable Integer codigo) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        return assembler.toModel(empleado);
    }

    /**
     *
     * @return
     */
    @GetMapping("/empleados")
    public CollectionModel<EntityModel<Empleado>> all() {
        List<EntityModel<Empleado>> empleados = repository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(empleados, linkTo(methodOn(EmpleadoController.class).all()).withSelfRel());
    }

    /**
     *
     * @param empleado
     * @return
     */
    @PostMapping("/empleados")
    public ResponseEntity<?> newEmpleado(@RequestBody Empleado empleado) {
        Optional<Empleado> empleadoBuscado = repository.findById(empleado.getCodigo());
        if (empleadoBuscado.isPresent()) {
            throw new IdAsignadoActualmenteException(Integer.toString(empleado.getCodigo()));
        }
        EntityModel<Empleado> empleadoModel = assembler.toModel(repository.save(empleado));
        return ResponseEntity.created(empleadoModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(empleadoModel);
    }

    /**
     *
     * @param codigo
     * @return
     */
    @DeleteMapping("/empleados/{codigo}")
    public ResponseEntity<?> deleteEmpleado(@PathVariable Integer codigo) {
        repository.deleteById(codigo);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param empleadoNuevo
     * @param codigo
     * @return
     */
    @PutMapping("/empleados/{codigo}")
    public ResponseEntity<?> replace(@RequestBody Empleado empleadoNuevo, @PathVariable Integer codigo) {
        Empleado empleadoActualizado = repository.findById(codigo).map(empleado -> {
            empleado.setDireccion(empleadoNuevo.getDireccion());
            empleado.setEspecialidad(empleadoNuevo.getEspecialidad());
            empleado.setNombre(empleadoNuevo.getNombre());
            empleado.setPassword(empleadoNuevo.getPassword());
            empleado.setTelefono(empleadoNuevo.getTelefono());
            return repository.save(empleado);
        }).orElseGet(() -> {
            return repository.save(empleadoNuevo);
        });
        EntityModel<Empleado> empleadoModel = assembler.toModel(empleadoActualizado);
        return ResponseEntity.created(empleadoModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(empleadoModel);
    }

    /**
     *
     * @param zonaNueva
     * @param codigo
     * @return
     */
    @PostMapping("/empleados/{codigo}/zonas")
    public ResponseEntity<?> addZona(@RequestBody Zona zonaNueva, @PathVariable Integer codigo) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        Zona zona = zonaRepository.findById(zonaNueva.getLetra()).orElseThrow(() -> new ZonaNoEncontradoException(zonaNueva.getLetra()));
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
    @DeleteMapping("/empleados/{codigo}/zonas/{letra}")
    public ResponseEntity<?> removeZona(@PathVariable Integer codigo, @PathVariable Character letra) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        Zona zona = zonaRepository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        EmpleadoZona empleadoZonaBuscado = new EmpleadoZona(empleado, zona);
        EmpleadoZona empleadoZonaEncontrado = null;
        int i = 0;
        while (empleadoZonaEncontrado == null && i < empleado.getZonas().size()) {
            if (empleado.getZonas().get(i).equals(empleadoZonaBuscado)) {
                empleadoZonaEncontrado = empleado.getZonas().get(i);
            } else {
                i++;
            }
        }
        if (empleadoZonaEncontrado != null) {
            empleado.getZonas().remove(empleadoZonaEncontrado);
            zona.getEmpleados().remove(empleadoZonaEncontrado);
            empleadoZonaEncontrado.setEmpleado(null);
            empleadoZonaEncontrado.setZona(null);
            empleadoZonaRepository.delete(empleadoZonaEncontrado);
        }
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param codigo
     * @return
     */
    @GetMapping("/empleados/{codigo}/zonas/asignables")
    public CollectionModel<EntityModel<Zona>> getZonasAsignables(@PathVariable Integer codigo) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        List<Zona> zonas = zonaRepository.findAll();
        List<Zona> zonasAsignables = zonas.stream().filter(zona -> {
            EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
            return !zona.getEmpleados().contains(empleadoZona);
        }
        ).collect(Collectors.toList()
        );
        List<EntityModel<Zona>> zonasAsignablesModel = zonasAsignables.stream().map(zonaAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(zonasAsignablesModel, linkTo(methodOn(EmpleadoController.class).getZonasAsignables(codigo)).withSelfRel());
    }

    /**
     *
     * @param codigo
     * @return
     */
    @GetMapping("/empleados/{codigo}/zonas/asignadas")
    public CollectionModel<EntityModel<Zona>> getZonasAsigadas(@PathVariable Integer codigo) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        List<Zona> zonas = zonaRepository.findAll();
        List<Zona> zonasAsignadas = zonas.stream().filter(zona -> {
            EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
            return zona.getEmpleados().contains(empleadoZona);
        }
        ).collect(Collectors.toList()
        );
        List<EntityModel<Zona>> zonasAsignadasModel = zonasAsignadas.stream().map(zonaAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(zonasAsignadasModel, linkTo(methodOn(EmpleadoController.class).getZonasAsignables(codigo)).withSelfRel());
    }

    /**
     *
     * @param codigo
     * @return
     */
    @GetMapping("/empleados/{codigo}/zonas/cantidadVehiculosAsignados")
    public Map<Character, Integer> getCantidadVehiculosAsignadosPorZona(@PathVariable Integer codigo) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        List<EmpleadoZona> empleadosZonas = empleado.getZonas();
        Map<Character, Integer> vehiculosPorZona = new HashMap<Character, Integer>();
        for (EmpleadoZona empleadoZona : empleadosZonas) {
            vehiculosPorZona.put(empleadoZona.getZona().getLetra(), empleadoZona.getCantidadVehiculosEncargados());
        }
        return vehiculosPorZona;
    }

    /**
     *
     * @param codigo
     * @param letra
     * @param cantidadVehiculosAsignados
     * @return
     */
    @PostMapping("/empleados/{codigo}/zonas/{letra}/cantidadVehiculosAsignados")
    public ResponseEntity<?> setCantidadVehiculosAsignados(@PathVariable Integer codigo, @PathVariable Character letra, @RequestBody Integer cantidadVehiculosAsignados) {
        Empleado empleado = repository.findById(codigo).orElseThrow(() -> new EmpleadoNoEncontradoException(codigo));
        Zona zona = zonaRepository.findById(letra).orElseThrow(() -> new ZonaNoEncontradoException(letra));
        EmpleadoZona empleadoZonaBuscado = new EmpleadoZona(empleado, zona);
        List<EmpleadoZona> empleadoZonas = empleado.getZonas();
        boolean encontrado = false;
        int i = 0;
        while (!encontrado && i < empleadoZonas.size()) {
            if (empleadoZonas.get(i).equals(empleadoZonaBuscado)) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (encontrado) {
            empleadoZonas.get(i).setCantidadVehiculosEncargados(cantidadVehiculosAsignados);
            empleadoZonaRepository.save(empleadoZonas.get(i));
        }
        return ResponseEntity.noContent().build();
    }
}
