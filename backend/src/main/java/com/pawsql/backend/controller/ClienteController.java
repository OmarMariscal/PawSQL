package com.pawsql.backend.controller;

import com.pawsql.backend.model.Cliente;
import com.pawsql.backend.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodos() {
        return ResponseEntity.ok(clienteRepository.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtenerPorId(@PathVariable Integer id) {
        return clienteRepository.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Cliente cliente) {
        int filasAfectadas = clienteRepository.crear(cliente);
        if (filasAfectadas > 0) {
            return clienteRepository.obtenerUltimo()
                    .map(c -> ResponseEntity.status(HttpStatus.CREATED).body((Object) c))
                    .orElse(ResponseEntity.status(HttpStatus.CREATED).build());
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Bad Request", "message", "No se pudo crear el cliente", "code", "INSERT_FAILED"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        int filasAfectadas = clienteRepository.actualizar(id, cliente);
        if (filasAfectadas > 0) {
            return clienteRepository.obtenerPorId(id)
                    .map(c -> ResponseEntity.ok((Object) c))
                    .orElse(ResponseEntity.ok().build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        int filasAfectadas = clienteRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Not Found", "message", "El registro con ID " + id + " no existe en la base de datos.", "code", "RECORD_NOT_FOUND"));
    }
}
