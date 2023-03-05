package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.ZonaNoEncontradoException;
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
public class ZonaNoEncontradoAdvice {

    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(ZonaNoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String zonaNoEncontradoHandler(ZonaNoEncontradoException ex) {
        return ex.getMessage();
    }
}
