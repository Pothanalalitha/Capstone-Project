package com.example.wipro.lalitha.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.codec.HttpMessageReader;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import org.springframework.web.server.ServerWebExchange;

import com.example.wipro.lalitha.model.ErrorResponse;

import org.springframework.http.server.reactive.ServerHttpResponse;
import java.nio.charset.StandardCharsets;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public Mono<Void> handleResponseStatusException(ServerWebExchange exchange, ResponseStatusException ex) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(ex.getStatusCode());
        String body = new ErrorResponse(ex.getStatusCode().value(), ex.getReason()).toJson();
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        return response.writeWith(Mono.just(response.bufferFactory().wrap(bytes)));
    }
}

