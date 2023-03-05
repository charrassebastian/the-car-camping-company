package com.sebastian.guarderia.modelo.entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.Objects;

/**
 *
 * @author sebastian
 */
@Entity(name = "garage")
public class Garage {

    @Id
    @Column(name = "numero_garage")
    private int numeroGarage;

    @Column(name = "lectura_contador_luz_garage")
    private float lecturaContadorLuz;

    @Column(name = "tiene_servicios_mantenimiento_contratados")
    private boolean clienteServiciosMantenimiento;

    @ManyToOne
    @JoinColumn(name = "dni_socio")
    @JsonBackReference(value = "socio-garage")
    private Socio socio;

    @Column(name = "fecha_compra_garage")
    private LocalDate fechaCompraGarage;

    @ManyToOne
    @JoinColumn(name = "letra_zona")
    @JsonBackReference(value = "garage-zona")
    private Zona zona;

    /**
     *
     * @return
     */
    public int getNumeroGarage() {
        return numeroGarage;
    }

    /**
     *
     * @param numeroGarage
     */
    public void setNumeroGarage(int numeroGarage) {
        this.numeroGarage = numeroGarage;
    }

    /**
     *
     * @return
     */
    public float getLecturaContadorLuz() {
        return lecturaContadorLuz;
    }

    /**
     *
     * @param lecturaContadorLuz
     */
    public void setLecturaContadorLuz(float lecturaContadorLuz) {
        this.lecturaContadorLuz = lecturaContadorLuz;
    }

    /**
     *
     * @return
     */
    public boolean isClienteServiciosMantenimiento() {
        return clienteServiciosMantenimiento;
    }

    /**
     *
     * @param clienteServiciosMantenimiento
     */
    public void setClienteServiciosMantenimiento(boolean clienteServiciosMantenimiento) {
        this.clienteServiciosMantenimiento = clienteServiciosMantenimiento;
    }

    /**
     *
     * @return
     */
    public Socio getSocio() {
        return socio;
    }

    /**
     *
     * @param socio
     */
    public void setSocio(Socio socio) {
        this.socio = socio;
    }

    /**
     *
     * @return
     */
    public LocalDate getFechaCompraGarage() {
        return fechaCompraGarage;
    }

    /**
     *
     * @param fechaCompraGarage
     */
    public void setFechaCompraGarage(LocalDate fechaCompraGarage) {
        this.fechaCompraGarage = fechaCompraGarage;
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
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o == null || getClass() != o.getClass()) {
            return false;
        } else {
            Garage that = (Garage) o;
            return Objects.equals(numeroGarage, that.getNumeroGarage());
        }
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(numeroGarage);
    }

}
