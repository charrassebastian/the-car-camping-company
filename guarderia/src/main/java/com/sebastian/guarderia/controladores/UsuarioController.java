package com.sebastian.guarderia.controladores;

import com.sebastian.guarderia.modelo.entidades.Administrador;
import com.sebastian.guarderia.modelo.entidades.Empleado;
import com.sebastian.guarderia.modelo.entidades.Socio;
import com.sebastian.guarderia.repositorios.AdministradorRepository;
import com.sebastian.guarderia.repositorios.EmpleadoRepository;
import com.sebastian.guarderia.repositorios.SocioRepository;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author sebastian
 */
@RestController
public class UsuarioController {

    private AdministradorRepository administradorRepository;
    private EmpleadoRepository empleadoRepository;
    private SocioRepository socioRepository;

    /**
     *
     * @param administradorRepository
     * @param empleadoRepository
     * @param socioRepository
     */
    public UsuarioController(AdministradorRepository administradorRepository, EmpleadoRepository empleadoRepository, SocioRepository socioRepository) {
        this.administradorRepository = administradorRepository;
        this.empleadoRepository = empleadoRepository;
        this.socioRepository = socioRepository;
    }

    /**
     *
     * @param usuarioRecibido
     * @return
     */
    @PostMapping("/usuario")
    public Usuario getUsuario(@RequestBody Usuario usuarioRecibido) {
        String nombre = usuarioRecibido.getUser();
        String password = usuarioRecibido.getPassword();
        List<Administrador> administradores = administradorRepository.findAll();
        List<Empleado> empleados = empleadoRepository.findAll();
        List<Socio> socios = socioRepository.findAll();
        Usuario usuario = new Usuario();
        int i;
        boolean encontrado;
        i = 0;
        encontrado = false;
        /*
        recorrer las tres listas hasta encontrar una coincidencia, de no hallarla, devolver un usuario con todo null y en authenticated el valor false
         */
        while (!encontrado && i < administradores.size()) {
            if (administradores.get(i).getNombre().equals(nombre) && administradores.get(i).getPassword().equals(password)) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (encontrado) {
            usuario.setAuthenticated(true);
            usuario.setPassword(password);
            usuario.setRole("administrador");
            usuario.setUser(nombre);
            usuario.setId(administradores.get(i).getId());
        } else {
            i = 0;
            while (!encontrado && i < empleados.size()) {
                if (empleados.get(i).getNombre().equals(nombre) && empleados.get(i).getPassword().equals(password)) {
                    encontrado = true;
                } else {
                    i++;
                }
            }
            if (encontrado) {
                usuario.setAuthenticated(true);
                usuario.setPassword(password);
                usuario.setRole("empleado");
                usuario.setUser(nombre);
                usuario.setId(empleados.get(i).getCodigo());
            } else {
                i = 0;
                while (!encontrado && i < socios.size()) {
                    if (socios.get(i).getNombre().equals(nombre) && socios.get(i).getPassword().equals(password)) {
                        encontrado = true;
                    } else {
                        i++;
                    }
                }
                if (encontrado) {
                    usuario.setAuthenticated(true);
                    usuario.setPassword(password);
                    usuario.setRole("socio");
                    usuario.setUser(nombre);
                    usuario.setId(socios.get(i).getDni());
                } else {
                    usuario.setAuthenticated(false);
                    usuario.setPassword(null);
                    usuario.setRole(null);
                    usuario.setUser(null);
                    usuario.setId(0);
                }
            }
        }
        return usuario;
    }
}
