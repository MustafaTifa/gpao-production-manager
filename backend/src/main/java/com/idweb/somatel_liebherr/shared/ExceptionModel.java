package com.idweb.somatel_liebherr.shared;

public class ExceptionModel {
    private final String message;
    private final Throwable throwable;


    public ExceptionModel(String message, Throwable throwable) {
        this.message = message;
        this.throwable = throwable;
    }

    public String getMessage() {
        return message;
    }

    public Throwable getThrowable() {
        return throwable;
    }
}
