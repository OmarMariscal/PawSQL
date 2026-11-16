package com.pawsql.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Consulta {

    private Integer idConsulta;
    private Integer idMascota;
    private Integer idVeterinario;
    private LocalDate fechaConsulta;
    private String motivo;
    private BigDecimal pesoKg;

    public Consulta() {
    }

    public Consulta(Integer idConsulta, Integer idMascota, Integer idVeterinario, LocalDate fechaConsulta, String motivo, BigDecimal pesoKg) {
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
}