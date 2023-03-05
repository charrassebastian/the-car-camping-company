package com.sebastian.guarderia.modelo.ensambladores;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.controladores.GarageController;
import com.sebastian.guarderia.modelo.entidades.Garage;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

/**
 *
 * @author sebastian
 */
@Component
public class GarageModelAssembler implements RepresentationModelAssembler<Garage, EntityModel<Garage>> {

    /**
     *
     * @param garage
     * @return
     */
    @Override
    public EntityModel<Garage> toModel(Garage garage) {
        EntityModel<Garage> garageModel = EntityModel.of(garage, linkTo(methodOn(GarageController.class).one(garage.getNumeroGarage())).withSelfRel(), linkTo(methodOn(GarageController.class).all()).withRel("garages"));
        return garageModel;
    }
}
