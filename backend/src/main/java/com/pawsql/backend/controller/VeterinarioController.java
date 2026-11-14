package com.pawsql.backend.controller;

import com.pawsql.backend.model.Veterinario;
import com.pawsql.backend.repository.VeterinarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> crear(@RequestBody Veterinario veterinario) {
        int filasAfectadas = veterinarioRepository.crear(veterinario);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Veterinario creado exitosamente");
        }
        return ResponseEntity.badRequest().body("No se pudo crear el veterinario");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizar(@PathVariable Integer id, @RequestBody Veterinario veterinario) {
        int filasAfectadas = veterinarioRepository.actualizar(id, veterinario);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok("Veterinario actualizado exitosamente");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        int filasAfectadas = veterinarioRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}