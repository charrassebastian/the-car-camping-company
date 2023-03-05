package com.sebastian.guarderia.modelo.ensambladores;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.controladores.SocioController;
import com.sebastian.guarderia.modelo.entidades.Socio;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

/**
 *
 * @author sebastian
 */
@Component
public class SocioModelAssembler implements RepresentationModelAssembler<Socio, EntityModel<Socio>> {

    /**
     *
     * @param socio
     * @return
     */
    @Override
    public EntityModel<Socio> toModel(Socio socio) {
        EntityModel<Socio> socioModel = EntityModel.of(socio, linkTo(methodOn(SocioController.class).one(socio.getDni())).withSelfRel(), linkTo(methodOn(SocioController.class).all()).withRel("socios"));
        return socioModel;
    }
}
