package com.sebastian.guarderia.modelo.entidades;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author sebastian
 */
@Entity(name = "socio")
public class Socio {

    @Id
    @Column(name = "dni_socio")
    private int dni;

    @Column(name = "nombre_socio")
    private String nombre;

    @Column(name = "password_socio")
    private String password;

    @Column(name = "direccion_socio")
    private String direccion;

    @Column(name = "telefono_socio")
    private String telefono;

    @Column(name = "ingreso_socio")
    private LocalDate ingreso;

    @OneToMany(mappedBy = "socio")
    @JsonManagedReference(value="socio-garage")
    private List<Garage> garages = new ArrayList<Garage>();

    
    @OneToMany(mappedBy = "socio")
    @JsonManagedReference(value="socio-vehiculo")
    private List<Vehiculo> vehiculos = new ArrayList<Vehiculo>();

    /**
     *
     * @return
     */
    public int getDni() {
        return dni;
    }

    /**
     *
     * @param dni
     */
    public void setDni(int dni) {
        this.dni = dni;
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
    public LocalDate getIngreso() {
        return ingreso;
    }

    /**
     *
     * @param ingreso
     */
    public void setIngreso(LocalDate ingreso) {
        this.ingreso = ingreso;
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
    public List<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    /**
     *
     * @param vehiculos
     */
    public void setVehiculos(List<Vehiculo> vehiculos) {
        if (this.vehiculos == null) {
            this.vehiculos = vehiculos;
        } else {
            this.vehiculos.retainAll(vehiculos);
            this.vehiculos.addAll(vehiculos);
        }
    }

    /**
     *
     * @param garage
     */
    public void addGarage(Garage garage) {
        garages.add(garage);
        garage.setSocio(this);
    }

    /**
     *
     * @param garage
     */
    public void removeGarage(Garage garage) {
        garages.remove(garage);
        garage.setSocio(null);
    }

    /**
     *
     * @param vehiculo
     */
    public void addVehiculo(Vehiculo vehiculo) {
        vehiculos.add(vehiculo);
        vehiculo.setSocio(this);
    }

    /**
     *
     * @param vehiculo
     */
    public void removeVehiculo(Vehiculo vehiculo) {
        vehiculos.remove(vehiculo);
        vehiculo.setSocio(null);
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
            Socio that = (Socio) o;
            return Objects.equals(dni, that.getDni());
        }
    }

    /**
     *
     * @return
     */
    @Override
    public int hashCode() {
        return Objects.hash(dni);
    }

}
