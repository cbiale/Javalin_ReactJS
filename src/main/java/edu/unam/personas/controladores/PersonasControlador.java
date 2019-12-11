/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.unam.personas.controladores;

import edu.unam.personas.modelos.Persona;
import edu.unam.personas.repositorios.PersonasRepositorio;
import edu.unam.personas.repositorios.PersonaNoEncontradaExcepcion;
import io.javalin.http.Context;
import java.sql.SQLException;
/**
 *
 * @author CM
 */
public class PersonasControlador {
    private final PersonasRepositorio personasRepositorio;

    public PersonasControlador(PersonasRepositorio personasRepositorio) {
        this.personasRepositorio = personasRepositorio;
    }

    public void listar(Context ctx) throws SQLException {
        System.out.println(personasRepositorio.listar());
        ctx.json(personasRepositorio.listar());
        ctx.status(200);
    }

    public void crear(Context ctx) throws SQLException {
        // Usando un formulario
        personasRepositorio.crear(ctx.formParam("nombres", String.class).get(), ctx.formParam("apellidos", String.class).get());        
        // Usando JSON
        //var p = ctx.bodyAsClass(Persona.class);            
        //personasRepositorio.crear(p.getNombres(), p.getApellidos());
        ctx.status(201);       
    }

    public void borrar(Context ctx) throws SQLException, PersonaNoEncontradaExcepcion {
        personasRepositorio.borrar(personasRepositorio.obtener(ctx.pathParam("identificador", Integer.class).get()));
        ctx.status(204);
    }

    public void modificar(Context ctx) throws SQLException, PersonaNoEncontradaExcepcion {
        var persona = personasRepositorio.obtener(ctx.pathParam("identificador", Integer.class).get());
        // usando un formulario
        persona.setNombres(ctx.formParam("nombres", String.class).get());
        persona.setApellidos(ctx.formParam("apellidos", String.class).get());
        personasRepositorio.modificar(persona);
        ctx.status(204);       
    }

    public void obtener(Context ctx) throws SQLException, PersonaNoEncontradaExcepcion {       
        ctx.json(personasRepositorio.obtener(ctx.pathParam("identificador", Integer.class).get()));
    }
}

