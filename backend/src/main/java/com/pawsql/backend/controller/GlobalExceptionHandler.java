package com.pawsql.backend.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        Throwable rootCause = ex.getRootCause();

        String sqlState = "";
        String detailMessage = ex.getMessage();

        if (rootCause instanceof SQLException sqlEx) {
            sqlState = sqlEx.getSQLState() != null ? sqlEx.getSQLState() : "";
            if (sqlEx.getMessage() != null) {
                detailMessage = sqlEx.getMessage();
            }
        }

        // 23505 = Unique Violation en PostgreSQL
        if ("23505".equals(sqlState) || detailMessage.toLowerCase().contains("unique")) {
            body.put("error", "Conflict");
            if (detailMessage.toLowerCase().contains("cedula_profesional")) {
                body.put("message", "La cédula profesional ya se encuentra registrada.");
            } else if (detailMessage.toLowerCase().contains("email")) {
                body.put("message", "El correo electrónico ya se encuentra registrado.");
            } else if (detailMessage.toLowerCase().contains("telefono")) {
                body.put("message", "El número de teléfono ya se encuentra registrado.");
            } else {
                body.put("message", "Ya existe un registro con los mismos datos únicos.");
            }
            body.put("code", "UNIQUE_VIOLATION");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
        }

        // 23514 = Check Constraint Violation en PostgreSQL
        if ("23514".equals(sqlState) || detailMessage.toLowerCase().contains("check")) {
            body.put("error", "Bad Request");
            if (detailMessage.toLowerCase().contains("peso_kg")) {
                body.put("message", "El peso de la mascota debe ser mayor a 0 kg (Violación de restricción CHECK).");
            } else if (detailMessage.toLowerCase().contains("costo")) {
                body.put("message", "El costo debe ser mayor o igual a 0 (Violación de restricción CHECK).");
            } else {
                body.put("message", "Los datos no cumplen con las restricciones de validación (CHECK).");
            }
            body.put("code", "CHECK_VIOLATION");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }

        // 23503 = Foreign Key Violation en PostgreSQL
        if ("23503".equals(sqlState) || detailMessage.toLowerCase().contains("foreign key") || detailMessage.toLowerCase().contains("fk_")) {
            body.put("error", "Conflict");
            if (detailMessage.toLowerCase().contains("fk_consulta_veterinario")) {
                body.put("message", "No se puede eliminar por restricción de consultas médicas.");
            } else {
                body.put("message", "Operación rechazada por restricciones de integridad referencial.");
            }
            body.put("code", "FOREIGN_KEY_VIOLATION");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
        }

        // 23502 = Not Null Violation en PostgreSQL
        if ("23502".equals(sqlState) || detailMessage.toLowerCase().contains("not-null") || detailMessage.toLowerCase().contains("null value")) {
            body.put("error", "Bad Request");
            body.put("message", "Uno o varios campos obligatorios no fueron proporcionados.");
            body.put("code", "NOT_NULL_VIOLATION");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }

        // Fallback genérico de integridad
        body.put("error", "Bad Request");
        body.put("message", "Error de restricción o integridad en base de datos.");
        body.put("code", "DATA_INTEGRITY_VIOLATION");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }
}
