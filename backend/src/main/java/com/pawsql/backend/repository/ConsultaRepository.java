package com.pawsql.backend.repository;

import com.pawsql.backend.model.Consulta;
import com.pawsql.backend.model.ConsultaTratamiento;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ConsultaRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public ConsultaRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Consulta> consultaRowMapper = (rs, rowNum) -> {
        Date fechaSql = rs.getDate("fecha_consulta");
        return new Consulta(
                rs.getInt("id_consulta"),
                rs.getInt("id_mascota"),
                rs.getInt("id_veterinario"),
                fechaSql != null ? fechaSql.toLocalDate() : null,
                rs.getString("motivo"),
                rs.getBigDecimal("peso_kg")
        );
    };

    private final RowMapper<ConsultaTratamiento> detalleRowMapper = (rs, rowNum) -> new ConsultaTratamiento(
            rs.getInt("id_consulta"),
            rs.getInt("id_tratamiento"),
            rs.getString("dosis_o_indicacion"),
            rs.getString("nombre_tratamiento"),
            rs.getBigDecimal("costo")
    );

    // --- CRUD PRINCIPAL DE CONSULTAS ---

    public List<Consulta> obtenerTodas() {
        String sql = "SELECT id_consulta, id_mascota, id_veterinario, fecha_consulta, motivo, peso_kg FROM consulta ORDER BY id_consulta ASC;";
        return jdbcTemplate.query(sql, consultaRowMapper);
    }

    public Optional<Consulta> obtenerPorId(Integer id) {
        String sql = "SELECT id_consulta, id_mascota, id_veterinario, fecha_consulta, motivo, peso_kg FROM consulta WHERE id_consulta = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        List<Consulta> resultados = jdbcTemplate.query(sql, params, consultaRowMapper);
        return resultados.stream().findFirst();
    }

    public List<Consulta> obtenerPorMascota(Integer idMascota) {
        String sql = "SELECT id_consulta, id_mascota, id_veterinario, fecha_consulta, motivo, peso_kg FROM consulta WHERE id_mascota = :idMascota ORDER BY fecha_consulta DESC;";
        MapSqlParameterSource params = new MapSqlParameterSource("idMascota", idMascota);
        return jdbcTemplate.query(sql, params, consultaRowMapper);
    }

    public int crear(Consulta consulta) {
        String sql = """
            INSERT INTO consulta (id_mascota, id_veterinario, fecha_consulta, motivo, peso_kg)
            VALUES (:idMascota, :idVeterinario, :fechaConsulta, :motivo, :pesoKg);
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idMascota", consulta.getIdMascota())
                .addValue("idVeterinario", consulta.getIdVeterinario())
                .addValue("fechaConsulta", consulta.getFechaConsulta() != null ? Date.valueOf(consulta.getFechaConsulta()) : null)
                .addValue("motivo", consulta.getMotivo())
                .addValue("pesoKg", consulta.getPesoKg());

        return jdbcTemplate.update(sql, params);
    }

    public int actualizar(Integer id, Consulta consulta) {
        String sql = """
            UPDATE consulta
            SET id_mascota = :idMascota, id_veterinario = :idVeterinario, fecha_consulta = :fechaConsulta, motivo = :motivo, peso_kg = :pesoKg
            WHERE id_consulta = :id;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("idMascota", consulta.getIdMascota())
                .addValue("idVeterinario", consulta.getIdVeterinario())
                .addValue("fechaConsulta", consulta.getFechaConsulta() != null ? Date.valueOf(consulta.getFechaConsulta()) : null)
                .addValue("motivo", consulta.getMotivo())
                .addValue("pesoKg", consulta.getPesoKg());

        return jdbcTemplate.update(sql, params);
    }

    public int eliminar(Integer id) {
        String sql = "DELETE FROM consulta WHERE id_consulta = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        return jdbcTemplate.update(sql, params);
    }

    // --- RELACIÓN MUCHOS A MUCHOS (consulta_tratamiento) ---

    public List<ConsultaTratamiento> obtenerTratamientosPorConsulta(Integer idConsulta) {
        String sql = """
            SELECT ct.id_consulta, ct.id_tratamiento, ct.dosis_o_indicacion,
                   t.nombre AS nombre_tratamiento, t.costo
            FROM consulta_tratamiento ct
            INNER JOIN tratamiento t ON ct.id_tratamiento = t.id_tratamiento
            WHERE ct.id_consulta = :idConsulta;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource("idConsulta", idConsulta);
        return jdbcTemplate.query(sql, params, detalleRowMapper);
    }

    public int agregarTratamiento(Integer idConsulta, ConsultaTratamiento detalle) {
        String sql = """
            INSERT INTO consulta_tratamiento (id_consulta, id_tratamiento, dosis_o_indicacion)
            VALUES (:idConsulta, :idTratamiento, :dosisOIndicacion);
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idConsulta", idConsulta)
                .addValue("idTratamiento", detalle.getIdTratamiento())
                .addValue("dosisOIndicacion", detalle.getDosisOIndicacion());

        return jdbcTemplate.update(sql, params);
    }

    public int eliminarTratamiento(Integer idConsulta, Integer idTratamiento) {
        String sql = "DELETE FROM consulta_tratamiento WHERE id_consulta = :idConsulta AND id_tratamiento = :idTratamiento;";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("idConsulta", idConsulta)
                .addValue("idTratamiento", idTratamiento);

        return jdbcTemplate.update(sql, params);
    }
}