package com.pawsql.backend.controller;

import com.pawsql.backend.model.Consulta;
import com.pawsql.backend.model.ConsultaTratamiento;
import com.pawsql.backend.repository.ConsultaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    private final ConsultaRepository consultaRepository;

    public ConsultaController(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    // --- ENDPOINTS DE CONSULTAS ---

    @GetMapping
    public ResponseEntity<List<Consulta>> obtenerTodas() {
        return ResponseEntity.ok(consultaRepository.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consulta> obtenerPorId(@PathVariable Integer id) {
        return consultaRepository.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mascota/{idMascota}")
    public ResponseEntity<List<Consulta>> obtenerPorMascota(@PathVariable Integer idMascota) {
        return ResponseEntity.ok(consultaRepository.obtenerPorMascota(idMascota));
    }

    @PostMapping
    public ResponseEntity<String> crear(@RequestBody Consulta consulta) {
        int filasAfectadas = consultaRepository.crear(consulta);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Consulta creada exitosamente");
        }
        return ResponseEntity.badRequest().body("No se pudo crear la consulta");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizar(@PathVariable Integer id, @RequestBody Consulta consulta) {
        int filasAfectadas = consultaRepository.actualizar(id, consulta);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok("Consulta actualizada exitosamente");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        int filasAfectadas = consultaRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- ENDPOINTS DE TRATAMIENTOS ASIGNADOS A UNA CONSULTA ---

    @GetMapping("/{id}/tratamientos")
    public ResponseEntity<List<ConsultaTratamiento>> obtenerTratamientos(@PathVariable Integer id) {
        return ResponseEntity.ok(consultaRepository.obtenerTratamientosPorConsulta(id));
    }

    @PostMapping("/{id}/tratamientos")
    public ResponseEntity<String> asignarTratamiento(@PathVariable Integer id, @RequestBody ConsultaTratamiento detalle) {
        int filasAfectadas = consultaRepository.agregarTratamiento(id, detalle);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Tratamiento asignado a la consulta");
        }
        return ResponseEntity.badRequest().body("No se pudo asignar el tratamiento");
    }

    @DeleteMapping("/{id}/tratamientos/{idTratamiento}")
    public ResponseEntity<Void> quitarTratamiento(@PathVariable Integer id, @PathVariable Integer idTratamiento) {
        int filasAfectadas = consultaRepository.eliminarTratamiento(id, idTratamiento);
        if (filasAfectadas > 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}