package com.sebastian.guarderia.tests;

import com.sebastian.guarderia.modelo.entidades.Garage;
import com.sebastian.guarderia.modelo.entidades.Socio;
import com.sebastian.guarderia.modelo.entidades.Vehiculo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 *
 * @author sebastiantian
 */
public class SocioTest {

    @Test
    public void addVehiculoTest() {
        Socio socio = new Socio();
        Vehiculo vehiculo = new Vehiculo();
        assertEquals(0, socio.getVehiculos().size());
        assertEquals(null, vehiculo.getSocio());
        socio.addVehiculo(vehiculo);
        assertEquals(1, socio.getVehiculos().size());
        assertEquals(socio, vehiculo.getSocio());
        socio.removeVehiculo(vehiculo);
        assertEquals(0, socio.getVehiculos().size());
        assertEquals(null, vehiculo.getSocio());
    }

    @Test
    public void addGarageTest() {
        Socio socio = new Socio();
        Garage garage = new Garage();
        assertEquals(0, socio.getGarages().size());
        assertEquals(null, garage.getSocio());
        socio.addGarage(garage);
        assertEquals(1, socio.getGarages().size());
        assertEquals(socio, garage.getSocio());
        socio.removeGarage(garage);
        assertEquals(0, socio.getGarages().size());
        assertEquals(null, garage.getSocio());
    }
}
