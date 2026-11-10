package com.pawsql.backend.controller;

import com.pawsql.backend.model.Cliente;
import com.pawsql.backend.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> crear(@RequestBody Cliente cliente) {
        int filasAfectadas = clienteRepository.crear(cliente);
        if (filasAfectadas > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Cliente creado exitosamente");
        }
        return ResponseEntity.badRequest().body("No se pudo crear el cliente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        int filasAfectadas = clienteRepository.actualizar(id, cliente);
        if (filasAfectadas > 0) {
            return ResponseEntity.ok("Cliente actualizado exitosamente");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        int filasAfectadas = clienteRepository.eliminar(id);
        if (filasAfectadas > 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}