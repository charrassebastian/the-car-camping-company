package com.sebastian.guarderia.controladores;

import com.sebastian.guarderia.excepciones.GarageNoEncontradoException;
import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import com.sebastian.guarderia.modelo.ensambladores.GarageModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.SocioModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.VehiculoModelAssembler;
import com.sebastian.guarderia.modelo.ensambladores.ZonaModelAssembler;
import com.sebastian.guarderia.modelo.entidades.Garage;
import com.sebastian.guarderia.modelo.entidades.Socio;
import com.sebastian.guarderia.modelo.entidades.Vehiculo;
import com.sebastian.guarderia.modelo.entidades.Zona;
import com.sebastian.guarderia.repositorios.GarageRepository;
import com.sebastian.guarderia.repositorios.SocioRepository;
import com.sebastian.guarderia.repositorios.VehiculoRepository;
import com.sebastian.guarderia.repositorios.ZonaRepository;
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
public class GarageController {

    private GarageRepository repository;
    private GarageModelAssembler assembler;
    private SocioRepository socioRepository;
    private SocioModelAssembler socioAssembler;
    private VehiculoRepository vehiculoRepository;
    private VehiculoModelAssembler vehiculoAssembler;
    private ZonaRepository zonaRepository;
    private ZonaModelAssembler zonaAssembler;

    /**
     *
     * @param repository
     * @param assembler
     * @param socioRepository
     * @param socioAssembler
     * @param vehiculoRepository
     * @param vehiculoAssembler
     * @param zonaRepository
     * @param zonaAssembler
     */
    public GarageController(GarageRepository repository, GarageModelAssembler assembler, SocioRepository socioRepository, SocioModelAssembler socioAssembler, VehiculoRepository vehiculoRepository, VehiculoModelAssembler vehiculoAssembler, ZonaRepository zonaRepository, ZonaModelAssembler zonaAssembler) {
        this.repository = repository;
        this.assembler = assembler;
        this.socioRepository = socioRepository;
        this.socioAssembler = socioAssembler;
        this.vehiculoRepository = vehiculoRepository;
        this.vehiculoAssembler = vehiculoAssembler;
        this.zonaRepository = zonaRepository;
        this.zonaAssembler = zonaAssembler;
    }

    /**
     *
     * @param numeroGarage
     * @return
     */
    @GetMapping("/garages/{numeroGarage}")
    public EntityModel<Garage> one(@PathVariable Integer numeroGarage) {
        Garage garage = repository.findById(numeroGarage).orElseThrow(() -> new GarageNoEncontradoException(numeroGarage));
        return assembler.toModel(garage);
    }

    /**
     *
     * @return
     */
    @GetMapping("/garages")
    public CollectionModel<EntityModel<Garage>> all() {
        List<EntityModel<Garage>> garages;
        garages = repository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(garages, linkTo(methodOn(GarageController.class).all()).withSelfRel());
    }

    /**
     *
     * @param garage
     * @return
     */
    @PostMapping("/garages")
    public ResponseEntity<?> newGarage(@RequestBody Garage garage) {
        Optional<Garage> garageBuscado = repository.findById(garage.getNumeroGarage());
        if(garageBuscado.isPresent()){
            throw new IdAsignadoActualmenteException(Integer.toString(garage.getNumeroGarage()));
        }
        EntityModel<Garage> garageNuevo = assembler.toModel(repository.save(garage));
        return ResponseEntity.created(garageNuevo.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(garageNuevo);
    }

    /**
     *
     * @param numeroGarage
     * @return
     */
    @DeleteMapping("/garages/{numeroGarage}")
    public ResponseEntity<?> deleteGarage(@PathVariable Integer numeroGarage) {
        repository.deleteById(numeroGarage);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param garageNuevo
     * @param numeroGarage
     * @return
     */
    @PutMapping("/garages/{numeroGarage}")
    public ResponseEntity<?> replace(@RequestBody Garage garageNuevo, @PathVariable Integer numeroGarage) {
        Garage garageActualizado = repository.findById(numeroGarage).map(garage -> {
            garage.setFechaCompraGarage(garageNuevo.getFechaCompraGarage());
            garage.setLecturaContadorLuz(garageNuevo.getLecturaContadorLuz());
            garage.setSocio(garageNuevo.getSocio());
            garage.setClienteServiciosMantenimiento(garageNuevo.isClienteServiciosMantenimiento());
            garage.setZona(garageNuevo.getZona());
            return repository.save(garage);
        }).orElseGet(() -> {
            return repository.save(garageNuevo);
        });
        EntityModel<Garage> garageModel = assembler.toModel(garageActualizado);
        return ResponseEntity.created(garageModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(garageModel);
    }

    /**
     *
     * @param numeroGarage
     * @return
     */
    @GetMapping("/garages/{numeroGarage}/socio")
    public EntityModel<Socio> getSocioAsignado(@PathVariable Integer numeroGarage) {
        Garage garage = repository.findById(numeroGarage).orElseThrow(() -> new GarageNoEncontradoException(numeroGarage));
        boolean encontrado = false;
        List<Socio> socios = socioRepository.findAll();
        int i = 0;
        while (i < socios.size() && !encontrado) {
            if (socios.get(i).getGarages() != null && socios.get(i).getGarages().contains(garage)) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado ? socioAssembler.toModel(socios.get(i)) : null;
    }

    /**
     *
     * @param numeroGarage
     * @return
     */
    @GetMapping("/garages/{numeroGarage}/vehiculo")
    public EntityModel<Vehiculo> getVehiculoAsignado(@PathVariable Integer numeroGarage) {
        Garage garage = repository.findById(numeroGarage).orElseThrow(() -> new GarageNoEncontradoException(numeroGarage));
        boolean encontrado = false;
        List<Vehiculo> vehiculos = vehiculoRepository.findAll();
        int i = 0;
        while (i < vehiculos.size() && !encontrado) {
            if (vehiculos.get(i).getGarage() != null && vehiculos.get(i).getGarage().equals(garage)) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado ? vehiculoAssembler.toModel(vehiculos.get(i)) : null;
    }

    /**
     *
     * @param numeroGarage
     * @return
     */
    @GetMapping("/garages/{numeroGarage}/zona")
    public EntityModel<Zona> getZonaAsignada(@PathVariable Integer numeroGarage) {
        Garage garage = repository.findById(numeroGarage).orElseThrow(() -> new GarageNoEncontradoException(numeroGarage));
        boolean encontrado = false;
        List<Zona> zonas = zonaRepository.findAll();
        int i = 0;
        while (i < zonas.size() && !encontrado) {
            if (zonas.get(i).getGarages() != null && zonas.get(i).getGarages().contains(garage)) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado ? zonaAssembler.toModel(zonas.get(i)) : null;
    }

}
