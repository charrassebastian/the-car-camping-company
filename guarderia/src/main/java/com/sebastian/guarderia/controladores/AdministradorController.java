package com.sebastian.guarderia.controladores;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.excepciones.AdministradorNoEncontradoException;
import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import com.sebastian.guarderia.modelo.ensambladores.AdministradorModelAssembler;
import com.sebastian.guarderia.modelo.entidades.Administrador;
import com.sebastian.guarderia.repositorios.AdministradorRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
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
public class AdministradorController {

    private final AdministradorRepository repository;
    private final AdministradorModelAssembler assembler;

    /**
     *
     * @param repository
     * @param assembler
     */
    public AdministradorController(AdministradorRepository repository, AdministradorModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    /**
     *
     * @param id
     * @return
     */
    @GetMapping("/administradores/{id}")
    public EntityModel<Administrador> one(@PathVariable Integer id) {
        Administrador administrador;
        administrador = repository.findById(id).orElseThrow(() -> new AdministradorNoEncontradoException(id));
        return assembler.toModel(administrador);
    }

    /**
     *
     * @return
     */
    @GetMapping("/administradores")
    public CollectionModel<EntityModel<Administrador>> all() {
        List<EntityModel<Administrador>> administradores;
        administradores = repository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(administradores, linkTo(methodOn(AdministradorController.class).all()).withSelfRel());
    }

    /**
     *
     * @param administrador
     * @return
     */
    @PostMapping("/administradores")
    public ResponseEntity<?> newAdministrador(@RequestBody Administrador administrador) {
        Optional<Administrador> administradorBuscado = repository.findById(administrador.getId());
        if (administradorBuscado.isPresent()) {
            throw new IdAsignadoActualmenteException(Integer.toString(administrador.getId()));
        }
        EntityModel<Administrador> administradorModel = assembler.toModel(repository.save(administrador));
        return ResponseEntity.created(administradorModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(administradorModel);
    }

    /**
     *
     * @param id
     * @return
     */
    @DeleteMapping("/administradores/{id}")
    public ResponseEntity<?> deleteAdministrador(@PathVariable Integer id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     *
     * @param administradorNuevo
     * @param id
     * @return
     */
    @PutMapping("/administradores/{id}")
    public ResponseEntity<?> replaceAdministrador(@RequestBody Administrador administradorNuevo, @PathVariable Integer id) {
        Administrador administradorActualizado = repository.findById(id).map(administrador -> {
            administrador.setNombre(administradorNuevo.getNombre());
            administrador.setPassword(administradorNuevo.getPassword());
            return repository.save(administrador);
        }).orElseGet(() -> {
            return repository.save(administradorNuevo);
        });
        EntityModel<Administrador> administradorModel = assembler.toModel(administradorActualizado);
        return ResponseEntity.created(administradorModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(administradorModel);
    }

}
