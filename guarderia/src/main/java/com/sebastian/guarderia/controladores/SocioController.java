package com.sebastian.guarderia.controladores;

import com.sebastian.guarderia.excepciones.GarageNoEncontradoException;
import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import com.sebastian.guarderia.excepciones.SocioNoEncontradoException;
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
public class SocioController {

    private SocioRepository repository;
    private SocioModelAssembler assembler;
    private VehiculoRepository vehiculoRepository;
    private VehiculoModelAssembler vehiculoAssembler;
    private GarageRepository garageRepository;
    private GarageModelAssembler garageAssembler;

    /**
     *
     * @param repository
     * @param assembler
     * @param vehiculoRepository
     * @param vehiculoAssembler
     * @param garageRepository
     * @param garageAssembler
     */
    public SocioController(SocioRepository repository, SocioModelAssembler assembler, VehiculoRepository vehiculoRepository, VehiculoModelAssembler vehiculoAssembler, GarageRepository garageRepository, GarageModelAssembler garageAssembler) {
        this.repository = repository;
        this.assembler = assembler;
        this.vehiculoRepository = vehiculoRepository;
        this.vehiculoAssembler = vehiculoAssembler;
        this.garageRepository = garageRepository;
        this.garageAssembler = garageAssembler;
    }

    /**
     *
     * @param dni
     * @return
     */
    @GetMapping("/socios/{dni}")
    public EntityModel<Socio> one(@PathVariable Integer dni) {
        Socio socio = repository.findById(dni).orElseThrow(() -> new SocioNoEncontradoException(dni));
        return assembler.toModel(socio);
    }

    /**
     *
     * @return
     */
    @GetMapping("/socios")
    public CollectionModel<EntityModel<Socio>> all() {
        List<EntityModel<Socio>> socios;
        socios = repository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(socios, linkTo(methodOn(SocioController.class).all()).withSelfRel());
    }

    /**
     *
     * @param socio
     * @return
     */
    @PostMapping("/socios")
    public ResponseEntity<?> newSocio(@RequestBody Socio socio) {
        Optional<Socio> socioBuscado = repository.findById(socio.getDni());
        if(socioBuscado.isPresent()){
            throw new IdAsignadoActualmenteException(Integer.toString(socio.getDni()));
        }
        EntityModel<Socio> socioModel = assembler.toModel(repository.save(socio));
        return ResponseEntity.created(socioModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(socioModel);
    }

    /**
     *
     * @param dni
     * @return
     */
    @DeleteMapping("/socios/{dni}")
    public ResponseEntity<?> deleteSocio(@PathVariable Integer dni) {
        repository.deleteById(dni);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param dni
     * @param socioNuevo
     * @return
     */
    @PutMapping("/socios/{dni}")
    public ResponseEntity<?> replace(@PathVariable Integer dni, @RequestBody Socio socioNuevo) {
        Socio socioActualizado = repository.findById(dni).map(socio -> {
            socio.setDireccion(socioNuevo.getDireccion());
            socio.setGarages(socioNuevo.getGarages());
            socio.setIngreso(socioNuevo.getIngreso());
            socio.setNombre(socioNuevo.getNombre());
            socio.setPassword(socioNuevo.getPassword());
            socio.setTelefono(socioNuevo.getTelefono());
            socio.setVehiculos(socioNuevo.getVehiculos());
            return repository.save(socio);
        }).orElseGet(() -> {
            return repository.save(socioNuevo);
        });
        EntityModel<Socio> socioModel = assembler.toModel(socioActualizado);
        return ResponseEntity.created(socioModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(socioModel);
    }

    /**
     *
     * @param garageNuevo
     * @param dni
     * @return
     */
    @PostMapping("/socios/{dni}/garages")
    public ResponseEntity<?> addGarage(@RequestBody Garage garageNuevo, @PathVariable Integer dni) {
        Socio socio = repository.findById(dni).orElseThrow(() -> new SocioNoEncontradoException(dni));
        Garage garage = garageRepository.findById(garageNuevo.getNumeroGarage()).orElseThrow(() -> new GarageNoEncontradoException(garageNuevo.getNumeroGarage()));
        socio.addGarage(garage);
        repository.save(socio);
        garageRepository.save(garage);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param dni
     * @param numeroGarage
     * @return
     */
    @DeleteMapping("/socios/{dni}/garages/{numeroGarage}")
    public ResponseEntity<?> removeGarage(@PathVariable Integer dni, @PathVariable Integer numeroGarage) {
        Socio socio = repository.findById(dni).orElseThrow(() -> new SocioNoEncontradoException(dni));
        Garage garage = garageRepository.findById(numeroGarage).orElseThrow(() -> new GarageNoEncontradoException(numeroGarage));
        socio.removeGarage(garage);
        repository.save(socio);
        garageRepository.save(garage);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param vehiculoNuevo
     * @param dni
     * @return
     */
    @PostMapping("/socios/{dni}/vehiculos")
    public ResponseEntity<?> addVehiculo(@RequestBody Vehiculo vehiculoNuevo, @PathVariable Integer dni) {
        Socio socio = repository.findById(dni).orElseThrow(() -> new SocioNoEncontradoException(dni));
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoNuevo.getMatricula()).orElseThrow(() -> new VehiculoNoEncontradoException(vehiculoNuevo.getMatricula()));
        socio.addVehiculo(vehiculo);
        repository.save(socio);
        vehiculoRepository.save(vehiculo);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param dni
     * @param matricula
     * @return
     */
    @DeleteMapping("/socios/{dni}/vehiculos/{matricula}")
    public ResponseEntity<?> removeVehiculo(@PathVariable Integer dni, @PathVariable String matricula) {
        Socio socio = repository.findById(dni).orElseThrow(() -> new SocioNoEncontradoException(dni));
        Vehiculo vehiculo = vehiculoRepository.findById(matricula).orElseThrow(() -> new VehiculoNoEncontradoException(matricula));
        socio.removeVehiculo(vehiculo);
        repository.save(socio);
        vehiculoRepository.save(vehiculo);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param dni
     * @return
     */
    @GetMapping("/socios/{dni}/garages/asignables")
    public CollectionModel<EntityModel<Garage>> getGaragesAsignables(@PathVariable Integer dni) {
        List<Garage> garages = garageRepository.findAll();
        List<Garage> garagesAsignables = new ArrayList<>();
        for (Garage garage : garages) {
            if (garage.getSocio() == null) {
                garagesAsignables.add(garage);
            }
        }
        List<EntityModel<Garage>> garagesAsignablesModel = garagesAsignables.stream().map(garageAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(garagesAsignablesModel, linkTo(methodOn(SocioController.class).getGaragesAsignables(dni)).withSelfRel());
    }

    /**
     *
     * @param dni
     * @return
     */
    @GetMapping("/socios/{dni}/vehiculos/asignables")
    public CollectionModel<EntityModel<Vehiculo>> getVehiculosAsignables(@PathVariable Integer dni) {
        List<Vehiculo> vehiculos = vehiculoRepository.findAll();
        List<Vehiculo> vehiculosAsignables = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            if (vehiculo.getSocio() == null) {
                vehiculosAsignables.add(vehiculo);
            }
        }
        List<EntityModel<Vehiculo>> vehiculosAsignablesModel = vehiculosAsignables.stream().map(vehiculoAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(vehiculosAsignablesModel, linkTo(methodOn(SocioController.class).getVehiculosAsignables(dni)).withSelfRel());
    }
}
