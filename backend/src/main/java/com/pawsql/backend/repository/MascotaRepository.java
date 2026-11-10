package com.pawsql.backend.repository;

import com.pawsql.backend.model.Mascota;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class MascotaRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public MascotaRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Mascota> mascotaRowMapper = (rs, rowNum) -> {
        Date fechaSql = rs.getDate("fecha_nacimiento");
        return new Mascota(
                rs.getInt("id_mascota"),
                rs.getInt("id_cliente"),
                rs.getString("nombre"),
                rs.getString("especie"),
                rs.getString("raza"),
                fechaSql != null ? fechaSql.toLocalDate() : null
        );
    };

    public List<Mascota> obtenerTodas() {
        String sql = "SELECT id_mascota, id_cliente, nombre, especie, raza, fecha_nacimiento FROM mascota ORDER BY id_mascota ASC;";
        return jdbcTemplate.query(sql, mascotaRowMapper);
    }

    public Optional<Mascota> obtenerPorId(Integer id) {
        String sql = "SELECT id_mascota, id_cliente, nombre, especie, raza, fecha_nacimiento FROM mascota WHERE id_mascota = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        List<Mascota> resultados = jdbcTemplate.query(sql, params, mascotaRowMapper);
        return resultados.stream().findFirst();
    }

    // Método útil adicional: buscar mascotas por dueño (cliente)
    public List<Mascota> obtenerPorCliente(Integer idCliente) {
        String sql = "SELECT id_mascota, id_cliente, nombre, especie, raza, fecha_nacimiento FROM mascota WHERE id_cliente = :idCliente ORDER BY id_mascota ASC;";
        MapSqlParameterSource params = new MapSqlParameterSource("idCliente", idCliente);
        return jdbcTemplate.query(sql, params, mascotaRowMapper);
    }

    public int crear(Mascota mascota) {
        String sql = """
            INSERT INTO mascota (id_cliente, nombre, especie, raza, fecha_nacimiento)
            VALUES (:idCliente, :nombre, :especie, :raza, :fechaNacimiento);
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idCliente", mascota.getIdCliente())
                .addValue("nombre", mascota.getNombre())
                .addValue("especie", mascota.getEspecie())
                .addValue("raza", mascota.getRaza())
                .addValue("fechaNacimiento", mascota.getFechaNacimiento() != null ? Date.valueOf(mascota.getFechaNacimiento()) : null);

        return jdbcTemplate.update(sql, params);
    }

    public int actualizar(Integer id, Mascota mascota) {
        String sql = """
            UPDATE mascota 
            SET id_cliente = :idCliente, nombre = :nombre, especie = :especie, raza = :raza, fecha_nacimiento = :fechaNacimiento
            WHERE id_mascota = :id;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("idCliente", mascota.getIdCliente())
                .addValue("nombre", mascota.getNombre())
                .addValue("especie", mascota.getEspecie())
                .addValue("raza", mascota.getRaza())
                .addValue("fechaNacimiento", mascota.getFechaNacimiento() != null ? Date.valueOf(mascota.getFechaNacimiento()) : null);

        return jdbcTemplate.update(sql, params);
    }

    public int eliminar(Integer id) {
        String sql = "DELETE FROM mascota WHERE id_mascota = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        return jdbcTemplate.update(sql, params);
    }
}