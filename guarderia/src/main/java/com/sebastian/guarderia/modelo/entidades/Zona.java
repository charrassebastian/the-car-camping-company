package com.sebastian.guarderia.modelo.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Entity(name = "zona")
public class Zona {

    @Id
    @Column(name = "letra_zona")
    private Character letra;

    @Column(name = "tipo_vehiculo_zona")
    private String tipoVehiculo;

    @Column(name = "profundidad_garage_zona")
    private float profundidadGarage;

    @Column(name = "ancho_garage_zona")
    private float anchoGarage;

    @OneToMany(mappedBy = "zona")
    @JsonManagedReference(value="garage-zona")
    private List<Garage> garages = new ArrayList<Garage>();

    @JsonIgnore()
    @OneToMany(mappedBy = "zona")
    private List<EmpleadoZona> empleados = new ArrayList<>();

    /**
     *
     * @return
     */
    public char getLetra() {
        return letra;
    }

    /**
     *
     * @param letra
     */
    public void setLetra(char letra) {
        this.letra = letra;
    }

    /**
     *
     * @return
     */
    public String getTipoVehiculo() {
        return tipoVehiculo;
    }

    /**
     *
     * @param tipoVehiculo
     */
    public void setTipoVehiculo(String tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    /**
     *
     * @return
     */
    public float getProfundidadGarage() {
        return profundidadGarage;
    }

    /**
     *
     * @param profundidadGarage
     */
    public void setProfundidadGarage(float profundidadGarage) {
        this.profundidadGarage = profundidadGarage;
    }

    /**
     *
     * @return
     */
    public float getAnchoGarage() {
        return anchoGarage;
    }

    /**
     *
     * @param anchoGarage
     */
    public void setAnchoGarage(float anchoGarage) {
        this.anchoGarage = anchoGarage;
    }

    /**
     *
     * @return
     */
    public List<Garage> getGarages() {
        return garages;
    }

    /**
     *
     * @param garages
     */
    public void setGarages(List<Garage> garages) {
        if (this.garages == null) {
            this.garages = garages;
        } else {
            this.garages.retainAll(garages);
            this.garages.addAll(garages);
        }
    }

    /**
     *
     * @return
     */
    public List<EmpleadoZona> getEmpleados() {
        return empleados;
    }

    /**
     *
     * @param empleados
     */
    public void setEmpleados(List<EmpleadoZona> empleados) {
        if (this.empleados == null) {
            this.empleados = empleados;
        } else {
            this.empleados.retainAll(empleados);
            this.empleados.addAll(empleados);
        }
    }

    /**
     *
     * @param garage
     */
    public void addGarage(Garage garage) {
        garages.add(garage);
        garage.setZona(this);
    }

    /**
     *
     * @param garage
     */
    public void removeGarage(Garage garage) {
        garages.remove(garage);
        garage.setZona(null);
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
            final Zona that = (Zona) o;
            return Objects.equals(letra, that.getLetra());
        }
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(letra);
    }

}
