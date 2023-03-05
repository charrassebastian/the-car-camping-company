package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebastian
 */
public class VehiculoNoEncontradoException extends RuntimeException {

    /**
     *
     * @param matricula
     */
    public VehiculoNoEncontradoException(String matricula) {
        super("No se ha encontrado un vehiculo con la matricula " + matricula);
    }
}
