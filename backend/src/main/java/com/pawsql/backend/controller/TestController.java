package com.pawsql.backend.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final JdbcTemplate jdbcTemplate;

    // Inyección de JdbcTemplate para consultas SQL puras sin ORM
    public TestController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/db")
    public Map<String, Object> probarBaseDeDatos() {
        // Consulta SQL nativa directa
        String sql = "SELECT version();";
        String dbVersion = jdbcTemplate.queryForObject(sql, String.class);

        return Map.of(
            "estado", "Conexión exitosa a PostgreSQL",
            "version_db", dbVersion
        );
    }
}