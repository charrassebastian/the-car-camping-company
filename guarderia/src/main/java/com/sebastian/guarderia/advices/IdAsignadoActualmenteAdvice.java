package com.sebastian.guarderia.advices;

import com.sebastian.guarderia.excepciones.IdAsignadoActualmenteException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author sebas
 */
@ControllerAdvice
public class IdAsignadoActualmenteAdvice {

    /**
     *
     * @param ex
     * @return
     */
    @ResponseBody
    @ExceptionHandler(IdAsignadoActualmenteException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String idAsignadoActualmenteHandler(IdAsignadoActualmenteException ex) {
        return ex.getMessage();
    }
}
