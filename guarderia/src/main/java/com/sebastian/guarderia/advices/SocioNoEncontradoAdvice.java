package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.SocioNoEncontradoException;
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
public class SocioNoEncontradoAdvice {

    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(SocioNoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String socioNoEncontradoHandler(SocioNoEncontradoException ex) {
        return ex.getMessage();
    }
}
