package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebastian
 */
public class ZonaNoEncontradoException extends RuntimeException {

    /**
     *
     * @param letra
     */
    public ZonaNoEncontradoException(Character letra) {
        super("No se ha encontrado una zona con la letra " + letra);
    }
}
