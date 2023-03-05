package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.EmpleadoZonaNoEncontradoException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author sebastian
 */
@ControllerAdvice
public class EmpleadoZonaNoEncontradoAdvice {
    
    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(EmpleadoZonaNoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String empleadoZonaNoEncontradoHandler(EmpleadoZonaNoEncontradoException ex) {
        return ex.getMessage();
    }
}
