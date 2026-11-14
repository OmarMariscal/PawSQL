package com.pawsql.backend.model;

public class Veterinario {

    private Integer idVeterinario;
    private String nombre;
    private String especialidad;
    private String cedulaProfesional;

    public Veterinario() {
    }

    public Veterinario(Integer idVeterinario, String nombre, String especialidad, String cedulaProfesional) {
        this.idVeterinario = idVeterinario;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.cedulaProfesional = cedulaProfesional;
    }

    public Integer getIdVeterinario() {
        return idVeterinario;
    }

    public void setIdVeterinario(Integer idVeterinario) {
        this.idVeterinario = idVeterinario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getCedulaProfesional() {
        return cedulaProfesional;
    }

    public void setCedulaProfesional(String cedulaProfesional) {
        this.cedulaProfesional = cedulaProfesional;
    }
}