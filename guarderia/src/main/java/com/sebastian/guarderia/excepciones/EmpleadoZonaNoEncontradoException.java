package com.sebastian.guarderia.excepciones;

import com.sebastian.guarderia.modelo.entidades.Empleado;
import com.sebastian.guarderia.modelo.entidades.Zona;

/**
 *
 * @author sebastian
 */
public class EmpleadoZonaNoEncontradoException extends RuntimeException {

    /**
     *
     * @param empleado
     * @param zona
     */
    public EmpleadoZonaNoEncontradoException(Empleado empleado, Zona zona){
        super("No se ha encontrado un EmpleadoZona con el codigoEmpleado " + empleado.getCodigo() + " y la letraZona " + zona.getLetra());
    }
}
