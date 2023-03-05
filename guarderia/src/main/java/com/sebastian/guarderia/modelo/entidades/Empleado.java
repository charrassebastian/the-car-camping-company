package com.sebastian.guarderia.modelo.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author sebastian
 */
@Entity(name = "empleado")
public class Empleado {

    @Id
    @Column(name = "codigo_empleado")
    private Integer codigo;

    @Column(name = "nombre_empleado")
    private String nombre;

    @Column(name = "password_empleado")
    private String password;

    @Column(name = "direccion_empleado")
    private String direccion;

    @Column(name = "telefono_empleado")
    private String telefono;

    @Column(name = "especialidad_empleado")
    private String especialidad;

    @JsonIgnore()
    @OneToMany(mappedBy = "empleado")
    private List<EmpleadoZona> zonas = new ArrayList<>();

    /**
     *
     * @return
     */
    public int getCodigo() {
        return codigo;
    }

    /**
     *
     * @param codigo
     */
    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    /**
     *
     * @return
     */
    public String getNombre() {
        return nombre;
    }

    /**
     *
     * @param nombre
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     *
     * @return
     */
    public String getPassword() {
        return password;
    }

    /**
     *
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     *
     * @return
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     *
     * @param direccion
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     *
     * @return
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     *
     * @param telefono
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    /**
     *
     * @return
     */
    public String getEspecialidad() {
        return especialidad;
    }

    /**
     *
     * @param especialidad
     */
    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    /**
     *
     * @return
     */
    public List<EmpleadoZona> getZonas() {
        return zonas;
    }

    /**
     *
     * @param zonas
     */
    public void setZonas(List<EmpleadoZona> zonas) {
        if (this.zonas == null) {
            this.zonas = zonas;
        } else {
            this.zonas.retainAll(zonas);
            this.zonas.addAll(zonas);
        }
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 89 * hash + Objects.hashCode(this.codigo);
        return hash;
    }

    /**
     *
     * @param obj
     * @return
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Empleado other = (Empleado) obj;
        return Objects.equals(this.codigo, other.codigo);
    }
    
}
