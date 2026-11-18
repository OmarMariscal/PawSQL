package com.pawsql.backend.controller;

import com.pawsql.backend.model.Tratamiento;
import com.pawsql.backend.repository.TratamientoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tratamientos")
@CrossOrigin(origins = "*")
public class TratamientoController {

    private final TratamientoRepository tratamientoRepository;

    public TratamientoController(TratamientoRepository tratamientoRepository) {
        this.tratamientoRepository = tratamientoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Tratamiento>> obtenerTodos() {
        return ResponseEntity.ok(tratamientoRepository.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tratamiento> obtenerPorId(@PathVariable Integer id) {
        return tratamientoRepository.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Tratamiento tratamiento) {
        int filasAfectadas = tratamientoRepository.crear(tratamiento);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Bad Request", "message", "No se pudo crear el tratamiento", "code", "INSERT_FAILED"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Tratamiento tratamiento) {
        int filasAfectadas = tratamientoRepository.actualizar(id, tratamiento);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        int filasAfectadas = tratamientoRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }
}
