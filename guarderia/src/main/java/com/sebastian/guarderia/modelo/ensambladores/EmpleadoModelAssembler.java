package com.sebastian.guarderia.modelo.ensambladores;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import com.sebastian.guarderia.controladores.EmpleadoController;
import com.sebastian.guarderia.modelo.entidades.Empleado;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

/**
 *
 * @author sebastian
 */
@Component
public class EmpleadoModelAssembler implements RepresentationModelAssembler<Empleado, EntityModel<Empleado>> {

    /**
     *
     * @param empleado
     * @return
     */
    @Override
    public EntityModel<Empleado> toModel(Empleado empleado) {
        EntityModel<Empleado> empleadoModel = EntityModel.of(empleado, linkTo(methodOn(EmpleadoController.class).one(empleado.getCodigo())).withSelfRel(), linkTo(methodOn(EmpleadoController.class).all()).withRel("empleados"));
        return empleadoModel;
    }
}
