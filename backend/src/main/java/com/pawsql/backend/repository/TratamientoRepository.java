package com.pawsql.backend.repository;

import com.pawsql.backend.model.Tratamiento;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TratamientoRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public TratamientoRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Tratamiento> tratamientoRowMapper = (rs, rowNum) -> new Tratamiento(
            rs.getInt("id_tratamiento"),
            rs.getString("nombre"),
            rs.getString("descripcion"),
            rs.getBigDecimal("costo")
    );

    public List<Tratamiento> obtenerTodos() {
        String sql = "SELECT id_tratamiento, nombre, descripcion, costo FROM tratamiento ORDER BY id_tratamiento ASC;";
        return jdbcTemplate.query(sql, tratamientoRowMapper);
    }

    public Optional<Tratamiento> obtenerPorId(Integer id) {
        String sql = "SELECT id_tratamiento, nombre, descripcion, costo FROM tratamiento WHERE id_tratamiento = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        List<Tratamiento> resultados = jdbcTemplate.query(sql, params, tratamientoRowMapper);
        return resultados.stream().findFirst();
    }

    public int crear(Tratamiento tratamiento) {
        String sql = """
            INSERT INTO tratamiento (nombre, descripcion, costo)
            VALUES (:nombre, :descripcion, :costo);
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("nombre", tratamiento.getNombre())
                .addValue("descripcion", tratamiento.getDescripcion())
                .addValue("costo", tratamiento.getCosto());

        return jdbcTemplate.update(sql, params);
    }

    public int actualizar(Integer id, Tratamiento tratamiento) {
        String sql = """
            UPDATE tratamiento 
            SET nombre = :nombre, descripcion = :descripcion, costo = :costo
            WHERE id_tratamiento = :id;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("nombre", tratamiento.getNombre())
                .addValue("descripcion", tratamiento.getDescripcion())
                .addValue("costo", tratamiento.getCosto());

        return jdbcTemplate.update(sql, params);
    }

    public int eliminar(Integer id) {
        String sql = "DELETE FROM tratamiento WHERE id_tratamiento = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        return jdbcTemplate.update(sql, params);
    }
}