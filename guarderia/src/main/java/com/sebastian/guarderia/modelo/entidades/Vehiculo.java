package com.sebastian.guarderia.modelo.entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import java.util.Objects;

/**
 *
 * @author sebastian
 */
@Entity(name = "vehiculo")
public class Vehiculo {

    @Id
    @Column(name = "matricula_vehiculo")
    private String matricula;

    @Column(name = "nombre_vehiculo")
    private String nombre;

    @Column(name = "tipo_vehiculo")
    private String tipo;

    @Column(name = "alto_vehiculo")
    private float alto;

    @Column(name = "ancho_vehiculo")
    private float ancho;

    @Column(name = "profundidad_vehiculo")
    private float profundidad;

    @ManyToOne
    @JoinColumn(name = "dni_socio")
    @JsonBackReference(value = "socio-vehiculo")
    private Socio socio;

    @OneToOne
    @JoinColumn(name = "numero_garage")
    private Garage garage;

    @Column(name = "fecha_asignacion_garage")
    private LocalDate fechaAsignacionGarage;

    /**
     *
     * @return
     */
    public String getMatricula() {
        return matricula;
    }

    /**
     *
     * @param matricula
     */
    public void setMatricula(String matricula) {
        this.matricula = matricula;
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
    public String getTipo() {
        return tipo;
    }

    /**
     *
     * @param tipo
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     *
     * @return
     */
    public float getAlto() {
        return alto;
    }

    /**
     *
     * @param alto
     */
    public void setAlto(float alto) {
        this.alto = alto;
    }

    /**
     *
     * @return
     */
    public float getAncho() {
        return ancho;
    }

    /**
     *
     * @param ancho
     */
    public void setAncho(float ancho) {
        this.ancho = ancho;
    }

    /**
     *
     * @return
     */
    public float getProfundidad() {
        return profundidad;
    }

    /**
     *
     * @param profundidad
     */
    public void setProfundidad(float profundidad) {
        this.profundidad = profundidad;
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
    public Garage getGarage() {
        return garage;
    }

    /**
     *
     * @param garage
     */
    public void setGarage(Garage garage) {
        this.garage = garage;
    }

    /**
     *
     * @return
     */
    public LocalDate getFechaAsignacionGarage() {
        return fechaAsignacionGarage;
    }

    /**
     *
     * @param fechaAsignacionGarage
     */
    public void setFechaAsignacionGarage(LocalDate fechaAsignacionGarage) {
        this.fechaAsignacionGarage = fechaAsignacionGarage;
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
            Vehiculo that = (Vehiculo) o;
            return Objects.equals(matricula, that.getMatricula());
        }
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(matricula);
    }

}
