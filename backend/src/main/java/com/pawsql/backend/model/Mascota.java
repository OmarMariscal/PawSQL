package com.pawsql.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public class Mascota {

    @JsonProperty("id_mascota")
    private Integer idMascota;

    @JsonProperty("id_cliente")
    private Integer idCliente;

    private String nombre;
    private String especie;
    private String raza;

    @JsonProperty("fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @JsonProperty("cliente_nombre")
    private String clienteNombre;

    public Mascota() {
    }

    public Mascota(Integer idMascota, Integer idCliente, String nombre, String especie, String raza,
                   LocalDate fechaNacimiento, String clienteNombre) {
        this.idMascota = idMascota;
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.fechaNacimiento = fechaNacimiento;
        this.clienteNombre = clienteNombre;
    }

    public Integer getIdMascota() {
        return idMascota;
    }

    public void setIdMascota(Integer idMascota) {
        this.idMascota = idMascota;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }
}
