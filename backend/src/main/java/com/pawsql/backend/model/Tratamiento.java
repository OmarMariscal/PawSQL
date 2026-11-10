package com.pawsql.backend.model;

import java.math.BigDecimal;

public class Tratamiento {

    private Integer idTratamiento;
    private String nombre;
    private String descripcion;
    private BigDecimal costo;

    public Tratamiento() {
    }

    public Tratamiento(Integer idTratamiento, String nombre, String descripcion, BigDecimal costo) {
        this.idTratamiento = idTratamiento;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costo = costo;
    }

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getCosto() {
        return costo;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;
    }
}