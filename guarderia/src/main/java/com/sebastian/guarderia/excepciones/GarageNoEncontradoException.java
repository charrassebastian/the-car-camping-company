package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebastian
 */
public class GarageNoEncontradoException extends RuntimeException {

    /**
     *
     * @param numero
     */
    public GarageNoEncontradoException(Integer numero) {
        super("No se ha encontrado un garage con el numero " + numero);
    }
}
