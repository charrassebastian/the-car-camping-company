package com.sebastian.guarderia.repositorios;

import com.sebastian.guarderia.modelo.entidades.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author sebastian
 */
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {

}
