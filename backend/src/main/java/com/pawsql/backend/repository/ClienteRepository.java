package com.pawsql.backend.repository;

import com.pawsql.backend.model.Cliente;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ClienteRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public ClienteRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Cliente> clienteRowMapper = (rs, rowNum) -> {
        Date fechaSql = rs.getDate("fecha_registro");
        return new Cliente(
                rs.getInt("id_cliente"),
                rs.getString("nombre"),
                rs.getString("telefono"),
                rs.getString("email"),
                fechaSql != null ? fechaSql.toLocalDate() : null
        );
    };

    public List<Cliente> obtenerTodos() {
        String sql = "SELECT id_cliente, nombre, telefono, email, fecha_registro FROM cliente ORDER BY id_cliente ASC;";
        return jdbcTemplate.query(sql, clienteRowMapper);
    }

    public Optional<Cliente> obtenerPorId(Integer id) {
        String sql = "SELECT id_cliente, nombre, telefono, email, fecha_registro FROM cliente WHERE id_cliente = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        List<Cliente> resultados = jdbcTemplate.query(sql, params, clienteRowMapper);
        return resultados.stream().findFirst();
    }

    public int crear(Cliente cliente) {
        String sql = """
            INSERT INTO cliente (nombre, telefono, email)
            VALUES (:nombre, :telefono, :email);
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nombre", cliente.getNombre())
                .addValue("telefono", cliente.getTelefono())
                .addValue("email", cliente.getEmail());

        return jdbcTemplate.update(sql, params);
    }

    public int actualizar(Integer id, Cliente cliente) {
        String sql = """
            UPDATE cliente 
            SET nombre = :nombre, telefono = :telefono, email = :email
            WHERE id_cliente = :id;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("nombre", cliente.getNombre())
                .addValue("telefono", cliente.getTelefono())
                .addValue("email", cliente.getEmail());

        return jdbcTemplate.update(sql, params);
    }

    public int eliminar(Integer id) {
        String sql = "DELETE FROM cliente WHERE id_cliente = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        return jdbcTemplate.update(sql, params);
    }
}