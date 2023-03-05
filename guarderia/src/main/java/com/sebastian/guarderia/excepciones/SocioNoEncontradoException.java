package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebastian
 */
public class SocioNoEncontradoException extends RuntimeException {

    /**
     *
     * @param dni
     */
    public SocioNoEncontradoException(Integer dni) {
        super("No se ha encontrado un socio con el dni " + dni);
    }
}
