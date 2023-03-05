package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebastian
 */
public class EmpleadoNoEncontradoException extends RuntimeException {

    /**
     *
     * @param codigo
     */
    public EmpleadoNoEncontradoException(Integer codigo) {
        super("No se ha encontrado un empleado con el codigo " + codigo);
    }

}
