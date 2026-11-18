package com.pawsql.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class Consulta {

    @JsonProperty("id_consulta")
    private Integer idConsulta;

    @JsonProperty("id_mascota")
    private Integer idMascota;

    @JsonProperty("id_veterinario")
    private Integer idVeterinario;

    @JsonProperty("fecha_consulta")
    private LocalDate fechaConsulta;

    private String motivo;

    @JsonProperty("peso_kg")
    private BigDecimal pesoKg;

    // Campos enriquecidos mediante JOIN (solo lectura en GET)
    @JsonProperty("mascota_nombre")
    private String mascotaNombre;

    @JsonProperty("cliente_nombre")
    private String clienteNombre;

    @JsonProperty("veterinario_nombre")
    private String veterinarioNombre;

    private List<ConsultaTratamiento> tratamientos;

    public Consulta() {
    }

    public Consulta(Integer idConsulta, Integer idMascota, Integer idVeterinario, LocalDate fechaConsulta,
                    String motivo, BigDecimal pesoKg) {
        this.idConsulta = idConsulta;
        this.idMascota = idMascota;
        this.idVeterinario = idVeterinario;
        this.fechaConsulta = fechaConsulta;
        this.motivo = motivo;
        this.pesoKg = pesoKg;
    }

    public Integer getIdConsulta() {
        return idConsulta;
    }

    public void setIdConsulta(Integer idConsulta) {
        this.idConsulta = idConsulta;
    }

    public Integer getIdMascota() {
        return idMascota;
    }

    public void setIdMascota(Integer idMascota) {
        this.idMascota = idMascota;
    }

    public Integer getIdVeterinario() {
        return idVeterinario;
    }

    public void setIdVeterinario(Integer idVeterinario) {
        this.idVeterinario = idVeterinario;
    }

    public LocalDate getFechaConsulta() {
        return fechaConsulta;
    }

    public void setFechaConsulta(LocalDate fechaConsulta) {
        this.fechaConsulta = fechaConsulta;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public BigDecimal getPesoKg() {
        return pesoKg;
    }

    public void setPesoKg(BigDecimal pesoKg) {
        this.pesoKg = pesoKg;
    }

    public String getMascotaNombre() {
        return mascotaNombre;
    }

    public void setMascotaNombre(String mascotaNombre) {
        this.mascotaNombre = mascotaNombre;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public String getVeterinarioNombre() {
        return veterinarioNombre;
    }

    public void setVeterinarioNombre(String veterinarioNombre) {
        this.veterinarioNombre = veterinarioNombre;
    }

    public List<ConsultaTratamiento> getTratamientos() {
        return tratamientos;
    }

    public void setTratamientos(List<ConsultaTratamiento> tratamientos) {
        this.tratamientos = tratamientos;
    }
}
