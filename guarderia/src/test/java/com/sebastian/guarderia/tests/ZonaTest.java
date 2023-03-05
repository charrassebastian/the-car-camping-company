package com.sebastian.guarderia.tests;

import com.sebastian.guarderia.modelo.entidades.Garage;
import com.sebastian.guarderia.modelo.entidades.Zona;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 *
 * @author sebastiantian
 */
public class ZonaTest {

    @Test
    public void addGarageTest() {
        Zona zona = new Zona();
        Garage garage = new Garage();
        assertEquals(0, zona.getGarages().size());
        assertEquals(null, garage.getZona());
        zona.addGarage(garage);
        assertEquals(1, zona.getGarages().size());
        assertEquals(zona, garage.getZona());
        zona.removeGarage(garage);
        assertEquals(0, zona.getGarages().size());
        assertEquals(null, garage.getZona());
    }
}
