package com.pawsql.backend.controller;

import com.pawsql.backend.model.Mascota;
import com.pawsql.backend.repository.MascotaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "*")
public class MascotaController {

    private final MascotaRepository mascotaRepository;

    public MascotaController(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    @GetMapping
    public ResponseEntity<List<Mascota>> obtenerTodas() {
        return ResponseEntity.ok(mascotaRepository.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mascota> obtenerPorId(@PathVariable Integer id) {
        return mascotaRepository.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Mascota>> obtenerPorCliente(@PathVariable Integer idCliente) {
        return ResponseEntity.ok(mascotaRepository.obtenerPorCliente(idCliente));
    }

    @PostMapping
    public ResponseEntity<String> crear(@RequestBody Mascota mascota) {
        int filasAfectadas = mascotaRepository.crear(mascota);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Mascota creada exitosamente");
        }
        return ResponseEntity.badRequest().body("No se pudo crear la mascota");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizar(@PathVariable Integer id, @RequestBody Mascota mascota) {
        int filasAfectadas = mascotaRepository.actualizar(id, mascota);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok("Mascota actualizada exitosamente");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        int filasAfectadas = mascotaRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}