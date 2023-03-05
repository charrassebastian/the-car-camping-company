package com.sebastian.guarderia.repositorios;

import com.sebastian.guarderia.modelo.entidades.Socio;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author sebastian
 */
public interface SocioRepository extends JpaRepository<Socio, Integer> {

}
