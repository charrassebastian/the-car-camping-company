package com.sebastian.guarderia.repositorios;

import com.sebastian.guarderia.modelo.entidades.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author sebastian
 */
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {
    
}
