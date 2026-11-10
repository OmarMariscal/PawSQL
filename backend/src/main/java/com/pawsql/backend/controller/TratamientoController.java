package com.pawsql.backend.controller;

import com.pawsql.backend.model.Tratamiento;
import com.pawsql.backend.repository.TratamientoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> crear(@RequestBody Tratamiento tratamiento) {
        int filasAfectadas = tratamientoRepository.crear(tratamiento);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Tratamiento creado exitosamente");
        }
        return ResponseEntity.badRequest().body("No se pudo crear el tratamiento");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizar(@PathVariable Integer id, @RequestBody Tratamiento tratamiento) {
        int filasAfectadas = tratamientoRepository.actualizar(id, tratamiento);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok("Tratamiento actualizado exitosamente");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        int filasAfectadas = tratamientoRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}