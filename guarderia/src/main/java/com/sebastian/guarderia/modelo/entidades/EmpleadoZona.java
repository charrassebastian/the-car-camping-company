package com.sebastian.guarderia.modelo.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Objects;

/**
 *
 * @author sebastian
 */
@Entity(name = "empleado_zona")
public class EmpleadoZona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "empleado_zona_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "codigo_empleado")
    private Empleado empleado;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "letra_zona")
    private Zona zona;

    @Column(name = "cantidad_vehiculos_encargados")
    private int cantidadVehiculosEncargados;

    /**
     *
     */
    public EmpleadoZona() {
        this.cantidadVehiculosEncargados = 0;
    }

    /**
     *
     * @param empleado
     * @param zona
     */
    public EmpleadoZona(Empleado empleado, Zona zona) {
        this.empleado = empleado;
        this.zona = zona;
    }

    /**
     *
     * @return
     */
    public int getId() {
        return id;
    }

    /**
     *
     * @param id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     *
     * @return
     */
    public Empleado getEmpleado() {
        return empleado;
    }

    /**
     *
     * @param empleado
     */
    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    /**
     *
     * @return
     */
    public Zona getZona() {
        return zona;
    }

    /**
     *
     * @param zona
     */
    public void setZona(Zona zona) {
        this.zona = zona;
    }

    /**
     *
     * @return
     */
    public int getCantidadVehiculosEncargados() {
        return cantidadVehiculosEncargados;
    }

    /**
     *
     * @param cantidadVehiculosEncargados
     */
    public void setCantidadVehiculosEncargados(int cantidadVehiculosEncargados) {
        this.cantidadVehiculosEncargados = cantidadVehiculosEncargados;
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        int hash = 5;
        hash = 41 * hash + Objects.hashCode(this.empleado);
        hash = 41 * hash + Objects.hashCode(this.zona);
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
        final EmpleadoZona other = (EmpleadoZona) obj;
        if (!Objects.equals(this.empleado, other.empleado)) {
            return false;
        }
        return Objects.equals(this.zona, other.zona);
    }

}
