package com.pawsql.backend.repository;

import com.pawsql.backend.model.Consulta;
import com.pawsql.backend.model.ConsultaTratamiento;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ConsultaRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public ConsultaRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper para consulta enriquecida con JOINs (usado en GET)
    private final RowMapper<Consulta> consultaEnriquecidaRowMapper = (rs, rowNum) -> {
        Date fechaSql = rs.getDate("fecha_consulta");
        Consulta c = new Consulta(
                rs.getInt("id_consulta"),
                rs.getInt("id_mascota"),
                rs.getInt("id_veterinario"),
                fechaSql != null ? fechaSql.toLocalDate() : null,
                rs.getString("motivo"),
                rs.getBigDecimal("peso_kg")
        );
        c.setMascotaNombre(rs.getString("mascota_nombre"));
        c.setClienteNombre(rs.getString("cliente_nombre"));
        c.setVeterinarioNombre(rs.getString("veterinario_nombre"));
        return c;
    };

    private final RowMapper<ConsultaTratamiento> detalleRowMapper = (rs, rowNum) -> new ConsultaTratamiento(
            rs.getInt("id_consulta"),
            rs.getInt("id_tratamiento"),
            rs.getString("dosis_o_indicacion"),
            rs.getString("nombre_tratamiento"),
            rs.getBigDecimal("costo")
    );

    // SQL base con JOINs para enriquecer la consulta
    private static final String SQL_SELECT_ENRIQUECIDO = """
        SELECT c.id_consulta, c.id_mascota, c.id_veterinario, c.fecha_consulta, c.motivo, c.peso_kg,
               m.nombre AS mascota_nombre,
               cl.nombre AS cliente_nombre,
               v.nombre AS veterinario_nombre
        FROM consulta c
        INNER JOIN mascota m ON c.id_mascota = m.id_mascota
        INNER JOIN cliente cl ON m.id_cliente = cl.id_cliente
        INNER JOIN veterinario v ON c.id_veterinario = v.id_veterinario
    """;

    // --- CRUD PRINCIPAL DE CONSULTAS ---

    public List<Consulta> obtenerTodas() {
        String sql = SQL_SELECT_ENRIQUECIDO + " ORDER BY c.id_consulta ASC;";
        List<Consulta> consultas = jdbcTemplate.query(sql, consultaEnriquecidaRowMapper);
        // Enriquecer cada consulta con su lista de tratamientos
        for (Consulta consulta : consultas) {
            consulta.setTratamientos(obtenerTratamientosPorConsulta(consulta.getIdConsulta()));
        }
        return consultas;
    }

    public Optional<Consulta> obtenerPorId(Integer id) {
        String sql = SQL_SELECT_ENRIQUECIDO + " WHERE c.id_consulta = :id;";
        MapSqlParameterSource params = new MapSqlParameterSource("id", id);
        List<Consulta> resultados = jdbcTemplate.query(sql, params, consultaEnriquecidaRowMapper);
        return resultados.stream().findFirst().map(c -> {
            c.setTratamientos(obtenerTratamientosPorConsulta(c.getIdConsulta()));
            return c;
        });
    }

    public List<Consulta> obtenerPorMascota(Integer idMascota) {
        String sql = SQL_SELECT_ENRIQUECIDO + " WHERE c.id_mascota = :idMascota ORDER BY c.fecha_consulta DESC;";
        MapSqlParameterSource params = new MapSqlParameterSource("idMascota", idMascota);
        List<Consulta> consultas = jdbcTemplate.query(sql, params, consultaEnriquecidaRowMapper);
        for (Consulta consulta : consultas) {
            consulta.setTratamientos(obtenerTratamientosPorConsulta(consulta.getIdConsulta()));
        }
        return consultas;
    }

    @Transactional
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

        int filas = jdbcTemplate.update(sql, params);

        // Insertar tratamientos en tabla pivote si vienen en el body
        if (filas > 0 && consulta.getTratamientos() != null && !consulta.getTratamientos().isEmpty()) {
            // Obtener el id generado de la consulta recién insertada
            Integer nuevoId = jdbcTemplate.queryForObject(
                    "SELECT MAX(id_consulta) FROM consulta WHERE id_mascota = :idMascota AND fecha_consulta = :fechaConsulta AND motivo = :motivo;",
                    new MapSqlParameterSource()
                            .addValue("idMascota", consulta.getIdMascota())
                            .addValue("fechaConsulta", consulta.getFechaConsulta() != null ? Date.valueOf(consulta.getFechaConsulta()) : null)
                            .addValue("motivo", consulta.getMotivo()),
                    Integer.class
            );
            if (nuevoId != null) {
                for (ConsultaTratamiento detalle : consulta.getTratamientos()) {
                    agregarTratamiento(nuevoId, detalle);
                }
            }
        }
        return filas;
    }

    @Transactional
    public int actualizar(Integer id, Consulta consulta) {
        String sql = """
            UPDATE consulta
            SET id_mascota = :idMascota, id_veterinario = :idVeterinario, fecha_consulta = :fechaConsulta,
                motivo = :motivo, peso_kg = :pesoKg
            WHERE id_consulta = :id;
        """;
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", id)
                .addValue("idMascota", consulta.getIdMascota())
                .addValue("idVeterinario", consulta.getIdVeterinario())
                .addValue("fechaConsulta", consulta.getFechaConsulta() != null ? Date.valueOf(consulta.getFechaConsulta()) : null)
                .addValue("motivo", consulta.getMotivo())
                .addValue("pesoKg", consulta.getPesoKg());

        int filas = jdbcTemplate.update(sql, params);

        // Reemplazar tratamientos en tabla pivote si vienen en el body
        if (filas > 0 && consulta.getTratamientos() != null) {
            eliminarTodosTratamientos(id);
            for (ConsultaTratamiento detalle : consulta.getTratamientos()) {
                agregarTratamiento(id, detalle);
            }
        }
        return filas;
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

    private void eliminarTodosTratamientos(Integer idConsulta) {
        String sql = "DELETE FROM consulta_tratamiento WHERE id_consulta = :idConsulta;";
        MapSqlParameterSource params = new MapSqlParameterSource("idConsulta", idConsulta);
        jdbcTemplate.update(sql, params);
    }
}
