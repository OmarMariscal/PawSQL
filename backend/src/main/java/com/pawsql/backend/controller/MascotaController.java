package com.pawsql.backend.controller;

import com.pawsql.backend.model.Mascota;
import com.pawsql.backend.repository.MascotaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> crear(@RequestBody Mascota mascota) {
        int filasAfectadas = mascotaRepository.crear(mascota);
        if (filasAfectadas > 0) {
            return mascotaRepository.obtenerUltima()
                    .map(m -> ResponseEntity.status(HttpStatus.CREATED).body((Object) m))
                    .orElse(ResponseEntity.status(HttpStatus.CREATED).build());
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Bad Request", "message", "No se pudo crear la mascota", "code", "INSERT_FAILED"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Mascota mascota) {
        int filasAfectadas = mascotaRepository.actualizar(id, mascota);
        if (filasAfectadas > 0) {
            return mascotaRepository.obtenerPorId(id)
                    .map(m -> ResponseEntity.ok((Object) m))
                    .orElse(ResponseEntity.ok().build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        int filasAfectadas = mascotaRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }
}
