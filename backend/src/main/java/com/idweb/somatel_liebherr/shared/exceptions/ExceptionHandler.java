package com.idweb.somatel_liebherr.shared.exceptions;

import com.idweb.somatel_liebherr.shared.ExceptionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(value = {DatabaseException.class})
    public ResponseEntity<Object> handleResponseEntity(DatabaseException exception){
        ExceptionModel exceptionModel = new ExceptionModel(exception.getMessage(), exception);
        return new ResponseEntity<>(exceptionModel, HttpStatus.BAD_REQUEST);
    }

}
