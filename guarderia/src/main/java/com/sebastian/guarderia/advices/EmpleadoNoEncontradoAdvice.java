package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.EmpleadoNoEncontradoException;
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
public class EmpleadoNoEncontradoAdvice {

    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(EmpleadoNoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String empleadoNoEncontradoHandler(EmpleadoNoEncontradoException ex) {
        return ex.getMessage();
    }
}
