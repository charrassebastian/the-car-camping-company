package com.sebastian.guarderia.tests;

import com.sebastian.guarderia.modelo.entidades.Empleado;
import com.sebastian.guarderia.modelo.entidades.EmpleadoZona;
import com.sebastian.guarderia.modelo.entidades.Zona;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 *
 * @author sebastiantian
 */
public class EmpleadoTest {
    
    @Test
    public void addZonaTest() {
        Empleado empleado1 = new Empleado();
        Empleado empleado2 = new Empleado();
        Zona zona1 = new Zona();
        Zona zona2 = new Zona();
        empleado1.setCodigo(1);
        empleado2.setCodigo(2);
        zona1.setLetra('a');
        zona2.setLetra('b');
        assertEquals(0, empleado1.getZonas().size());
        assertEquals(0, empleado2.getZonas().size());
        assertEquals(0, zona1.getEmpleados().size());
        assertEquals(0, zona2.getEmpleados().size());
        addZona(empleado1, zona1);
        assertEquals(1, empleado1.getZonas().size());
        assertEquals(0, empleado2.getZonas().size());
        assertEquals(1, zona1.getEmpleados().size());
        assertEquals(0, zona2.getEmpleados().size());
        addZona(empleado2, zona1);
        assertEquals(1, empleado1.getZonas().size());
        assertEquals(1, empleado2.getZonas().size());
        assertEquals(2, zona1.getEmpleados().size());
        assertEquals(0, zona2.getEmpleados().size());
        addZona(empleado1, zona2);
        assertEquals(2, empleado1.getZonas().size());
        assertEquals(1, empleado2.getZonas().size());
        assertEquals(2, zona1.getEmpleados().size());
        assertEquals(1, zona2.getEmpleados().size());
        removeZona(empleado1, zona2);
        assertEquals(1, empleado1.getZonas().size());
        assertEquals(1, empleado2.getZonas().size());
        assertEquals(2, zona1.getEmpleados().size());
        assertEquals(0, zona2.getEmpleados().size());
        removeZona(empleado1, zona1);
        assertEquals(0, empleado1.getZonas().size());
        assertEquals(1, empleado2.getZonas().size());
        assertEquals(1, zona1.getEmpleados().size());
        assertEquals(0, zona2.getEmpleados().size());
        removeZona(empleado2, zona1);
        assertEquals(0, empleado1.getZonas().size());
        assertEquals(0, empleado2.getZonas().size());
        assertEquals(0, zona1.getEmpleados().size());
        assertEquals(0, zona2.getEmpleados().size());
    }
    
    private void addZona(Empleado empleado, Zona zona) {
        EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
        empleado.getZonas().add(empleadoZona);
        zona.getEmpleados().add(empleadoZona);
    }
    
    private void removeZona(Empleado empleado, Zona zona) {
        EmpleadoZona empleadoZona = new EmpleadoZona(empleado, zona);
        empleado.getZonas().remove(empleadoZona);
        zona.getEmpleados().remove(empleadoZona);
        empleadoZona.setEmpleado(null);
        empleadoZona.setZona(null);
    }
    
}
