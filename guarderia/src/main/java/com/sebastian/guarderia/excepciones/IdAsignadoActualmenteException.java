package com.sebastian.guarderia.excepciones;

/**
 *
 * @author sebas
 */
public class IdAsignadoActualmenteException extends RuntimeException {

    /**
     *
     * @param id
     */
    public IdAsignadoActualmenteException(String id){
        super("El id " + id + " ya ha ha sido asignado a una entidad del sistema");
    }
}
