package com.pawsql.backend.controller;

import com.pawsql.backend.model.Veterinario;
import com.pawsql.backend.repository.VeterinarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/veterinarios")
@CrossOrigin(origins = "*")
public class VeterinarioController {

    private final VeterinarioRepository veterinarioRepository;

    public VeterinarioController(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    @GetMapping
    public ResponseEntity<List<Veterinario>> obtenerTodos() {
        return ResponseEntity.ok(veterinarioRepository.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veterinario> obtenerPorId(@PathVariable Integer id) {
        return veterinarioRepository.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Veterinario veterinario) {
        int filasAfectadas = veterinarioRepository.crear(veterinario);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Bad Request", "message", "No se pudo crear el veterinario", "code", "INSERT_FAILED"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Veterinario veterinario) {
        int filasAfectadas = veterinarioRepository.actualizar(id, veterinario);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        int filasAfectadas = veterinarioRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }
}
