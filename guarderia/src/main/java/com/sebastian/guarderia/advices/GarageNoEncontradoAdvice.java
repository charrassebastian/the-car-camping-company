package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.GarageNoEncontradoException;
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
public class GarageNoEncontradoAdvice {

    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(GarageNoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String garageNoEncontradoHandler(GarageNoEncontradoException ex) {
        return ex.getMessage();
    }
}
