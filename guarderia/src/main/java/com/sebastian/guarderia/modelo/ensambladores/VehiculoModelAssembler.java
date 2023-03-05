package com.sebastian.guarderia.modelo.ensambladores;

import com.sebastian.guarderia.controladores.VehiculoController;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.modelo.entidades.Vehiculo;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

/**
 *
 * @author sebastian
 */
@Component
public class VehiculoModelAssembler implements RepresentationModelAssembler<Vehiculo, EntityModel<Vehiculo>>{

    /**
     *
     * @param vehiculo
     * @return
     */
    @Override
    public EntityModel<Vehiculo> toModel(Vehiculo vehiculo){
        EntityModel<Vehiculo> vehiculoModel = EntityModel.of(vehiculo, linkTo(methodOn(VehiculoController.class).one(vehiculo.getMatricula())).withSelfRel(), linkTo(methodOn(VehiculoController.class).all()).withRel("vehiculos"));
        return vehiculoModel;
    }
}
