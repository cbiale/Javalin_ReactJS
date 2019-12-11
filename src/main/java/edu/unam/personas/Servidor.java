/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.unam.personas;

import io.javalin.Javalin;
import java.sql.DriverManager;
import java.sql.SQLException;
import edu.unam.personas.controladores.PersonasControlador;
import edu.unam.personas.repositorios.PersonasRepositorio;
import edu.unam.personas.repositorios.PersonaNoEncontradaExcepcion;
import static io.javalin.apibuilder.ApiBuilder.*;
import io.javalin.core.event.EventListener;



public class Servidor {

    public static void main(String[] args) throws SQLException {

        var conexion = DriverManager.getConnection("jdbc:sqlite:personas.db");
        var personasRepositorio = new PersonasRepositorio(conexion);
        var personasControlador = new PersonasControlador(personasRepositorio);

        
        Javalin.create(config -> {
            //config.defaultContentType = "application/json";
            config.addStaticFiles("/public");
            //config.enableCorsForAllOrigins();
            //config.addSinglePageRoot("/", "/public/index.html");
        })        
        .events((EventListener event) -> {
            event.serverStopped(() -> { conexion.close(); });
        })
        .routes(() -> {            
            path("api/v1/personas", () -> {
                get(personasControlador::listar);
                post(personasControlador::crear);
                path(":identificador", () -> {
                    get(personasControlador::obtener);
                    delete(personasControlador::borrar);
                    put(personasControlador::modificar);
                });
            });                        
        })
        .exception(PersonaNoEncontradaExcepcion.class, (e, ctx) -> { ctx.status(404); })
        .start(7000);        
    }
}

