package com.sebastian.guarderia.modelo.ensambladores;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.controladores.AdministradorController;
import com.sebastian.guarderia.modelo.entidades.Administrador;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

/**
 *
 * @author sebastian
 */
@Component
public class AdministradorModelAssembler implements RepresentationModelAssembler<Administrador, EntityModel<Administrador>> {

    /**
     *
     * @param administrador
     * @return
     */
    @Override
    public EntityModel<Administrador> toModel(Administrador administrador) {
        EntityModel<Administrador> administradorModel = EntityModel.of(administrador, linkTo(methodOn(AdministradorController.class).one(administrador.getId())).withSelfRel(), linkTo(methodOn(AdministradorController.class).all()).withRel("administradores"));
        return administradorModel;
    }
}
