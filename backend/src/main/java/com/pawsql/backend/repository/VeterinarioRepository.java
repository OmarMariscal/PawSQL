package com.pawsql.backend.repository;

import com.pawsql.backend.model.Veterinario;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class VeterinarioRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public VeterinarioRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Veterinario> veterinarioRowMapper = (rs, rowNum) -> new Veterinario(
            rs.getInt("id_veterinario"),
            rs.getString("nombre"),
            rs.getString("especialidad"),
            rs.getString("cedula_profesional")
    );

    public List<Veterinario> obtenerTodos() {
        String sql = "SELECT id_veterinario, nombre, especialidad, cedula_profesional FROM veterinario ORDER BY id_veterinario ASC;";
        return jdbcTemplate.query(sql, veterinarioRowMapper);
    }

    public Optional<Veterinario> obtenerPorId(Integer id) {
        String sql = "SELECT id_veterinario, nombre, especialidad, cedula_profesional FROM veterinario WHERE id_veterinario = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        List<Veterinario> resultados = jdbcTemplate.query(sql, params, veterinarioRowMapper);
        return resultados.stream().findFirst();
    }

    public int crear(Veterinario veterinario) {
        String sql = """
            INSERT INTO veterinario (nombre, especialidad, cedula_profesional)
            VALUES (:nombre, :especialidad, :cedulaProfesional);
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nombre", veterinario.getNombre())
                .addValue("especialidad", veterinario.getEspecialidad())
                .addValue("cedulaProfesional", veterinario.getCedulaProfesional());

        return jdbcTemplate.update(sql, params);
    }

    public int actualizar(Integer id, Veterinario veterinario) {
        String sql = """
            UPDATE veterinario
            SET nombre = :nombre, especialidad = :especialidad, cedula_profesional = :cedulaProfesional
            WHERE id_veterinario = :id;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("nombre", veterinario.getNombre())
                .addValue("especialidad", veterinario.getEspecialidad())
                .addValue("cedulaProfesional", veterinario.getCedulaProfesional());

        return jdbcTemplate.update(sql, params);
    }

    public int eliminar(Integer id) {
        String sql = "DELETE FROM veterinario WHERE id_veterinario = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        return jdbcTemplate.update(sql, params);
    }
}