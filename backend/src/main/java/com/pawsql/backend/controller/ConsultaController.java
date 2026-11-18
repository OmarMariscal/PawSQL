package com.pawsql.backend.controller;

import com.pawsql.backend.model.Consulta;
import com.pawsql.backend.model.ConsultaTratamiento;
import com.pawsql.backend.repository.ConsultaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> crear(@RequestBody Consulta consulta) {
        int filasAfectadas = consultaRepository.crear(consulta);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Bad Request", "message", "No se pudo crear la consulta", "code", "INSERT_FAILED"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Consulta consulta) {
        int filasAfectadas = consultaRepository.actualizar(id, consulta);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        int filasAfectadas = consultaRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }

    // --- ENDPOINTS DE TRATAMIENTOS ASIGNADOS A UNA CONSULTA ---

    @GetMapping("/{id}/tratamientos")
    public ResponseEntity<List<ConsultaTratamiento>> obtenerTratamientos(@PathVariable Integer id) {
        return ResponseEntity.ok(consultaRepository.obtenerTratamientosPorConsulta(id));
    }

    @PostMapping("/{id}/tratamientos")
    public ResponseEntity<?> asignarTratamiento(@PathVariable Integer id, @RequestBody ConsultaTratamiento detalle) {
        int filasAfectadas = consultaRepository.agregarTratamiento(id, detalle);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Bad Request", "message", "No se pudo asignar el tratamiento", "code", "INSERT_FAILED"));
    }

    @DeleteMapping("/{id}/tratamientos/{idTratamiento}")
    public ResponseEntity<?> quitarTratamiento(@PathVariable Integer id, @PathVariable Integer idTratamiento) {
        int filasAfectadas = consultaRepository.eliminarTratamiento(id, idTratamiento);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "Tratamiento no encontrado en la consulta", "code", "RECORD_NOT_FOUND"));
    }
}
