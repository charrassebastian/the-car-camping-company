package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebastian
 */
public class AdministradorNoEncontradoException extends RuntimeException {

    /**
     *
     * @param id
     */
    public AdministradorNoEncontradoException(Integer id) {
        super("No se ha encontrado un administrador con el id " + id);
    }
}
