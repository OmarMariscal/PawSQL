package com.pawsql.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;

public class ConsultaTratamiento {

    @JsonProperty("id_consulta")
    private Integer idConsulta;

    @JsonProperty("id_tratamiento")
    private Integer idTratamiento;

    @JsonProperty("dosis_o_indicacion")
    private String dosisOIndicacion;

    @JsonProperty("nombre_tratamiento")
    private String nombreTratamiento;

    private BigDecimal costo;

    public ConsultaTratamiento() {
    }

    public ConsultaTratamiento(Integer idConsulta, Integer idTratamiento, String dosisOIndicacion,
                               String nombreTratamiento, BigDecimal costo) {
        this.idConsulta = idConsulta;
        this.idTratamiento = idTratamiento;
        this.dosisOIndicacion = dosisOIndicacion;
        this.nombreTratamiento = nombreTratamiento;
        this.costo = costo;
    }

    public Integer getIdConsulta() {
        return idConsulta;
    }

    public void setIdConsulta(Integer idConsulta) {
        this.idConsulta = idConsulta;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public String getDosisOIndicacion() {
        return dosisOIndicacion;
    }

    public void setDosisOIndicacion(String dosisOIndicacion) {
        this.dosisOIndicacion = dosisOIndicacion;
    }

    public String getNombreTratamiento() {
        return nombreTratamiento;
    }

    public void setNombreTratamiento(String nombreTratamiento) {
        this.nombreTratamiento = nombreTratamiento;
    }

    public BigDecimal getCosto() {
        return costo;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;
    }
}
