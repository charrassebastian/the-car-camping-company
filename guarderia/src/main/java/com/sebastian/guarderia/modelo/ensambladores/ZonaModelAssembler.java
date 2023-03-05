package com.sebastian.guarderia.modelo.ensambladores;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.controladores.ZonaController;
import com.sebastian.guarderia.modelo.entidades.Zona;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

/**
 *
 * @author sebastian
 */
@Component
public class ZonaModelAssembler implements RepresentationModelAssembler<Zona, EntityModel<Zona>> {

    /**
     *
     * @param zona
     * @return
     */
    @Override
    public EntityModel<Zona> toModel(Zona zona) {
        EntityModel<Zona> zonaModel = EntityModel.of(zona, linkTo(methodOn(ZonaController.class).one(zona.getLetra())).withSelfRel(), linkTo(methodOn(ZonaController.class).all()).withRel("zonas"));
        return zonaModel;
    }
}
