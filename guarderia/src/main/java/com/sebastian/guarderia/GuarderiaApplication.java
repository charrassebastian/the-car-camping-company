package com.sebastian.guarderia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 *
 * @author sebastian
 */
@SpringBootApplication
public class GuarderiaApplication extends SpringBootServletInitializer {

    /**
     *
     * @param application
     * @return
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(GuarderiaApplication.class);
    }

    /**
     *
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(GuarderiaApplication.class, args);
    }

}
