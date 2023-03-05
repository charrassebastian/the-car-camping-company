package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.VehiculoNoEncontradoException;
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
public class VehiculoNoEncontradoAdvice {

    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(VehiculoNoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String vehiculoNoEncontradoHandler(VehiculoNoEncontradoException ex) {
        return ex.getMessage();
    }
}
