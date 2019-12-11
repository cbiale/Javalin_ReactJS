/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.unam.personas.repositorios;

import edu.unam.personas.modelos.Persona;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author CM
 */
public class PersonasRepositorio {

    private final Connection conexion;

    public PersonasRepositorio(Connection connection) throws SQLException {
        this.conexion = connection;
        var consulta = connection.createStatement();
        consulta.execute("CREATE TABLE IF NOT EXISTS personas (identificador INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, apellidos TEXT)");
        try {
            consulta.execute("insert into personas values (1,'CLAUDIO', 'BIALE')");
            consulta.execute("insert into personas values (2,'RAUL', 'PEREZ')");
            consulta.execute("insert into personas values (3,'JUAN', 'PEPINO')");            
        } catch (Exception e) {
        } finally {
            consulta.close();
        }
    }

    public List<Persona> listar() throws SQLException {
        var personas = new ArrayList<Persona>();
        var consulta = conexion.createStatement();
        var resultado = consulta.executeQuery("SELECT identificador, nombres, apellidos FROM personas");
        while (resultado.next()) {
            personas.add(
                    new Persona(
                            resultado.getInt("identificador"),
                            resultado.getString("nombres"),
                            resultado.getString("apellidos")
                    )
            );
        }
        resultado.close();
        consulta.close();
        return personas;
    }

    public Persona obtener(int identificador) throws SQLException, PersonaNoEncontradaExcepcion {
        var consulta = conexion.prepareStatement("SELECT identificador, nombres, apellidos FROM personas WHERE identificador = ?");
        consulta.setInt(1, identificador);
        var resultado = consulta.executeQuery();
        try {
            if (resultado.next()) {
                return new Persona(
                        resultado.getInt("identificador"),
                        resultado.getString("nombres"),
                        resultado.getString("apellidos")
                );
            } else {
                throw new PersonaNoEncontradaExcepcion();
            }
        } finally {
            consulta.close();
            resultado.close();
        }
    }

    public void crear(String nombres, String apellidos) throws SQLException {
        var consulta = conexion.prepareStatement("INSERT INTO personas (nombres, apellidos) VALUES (?, ?)");
        consulta.setString(1, nombres);
        consulta.setString(2, apellidos);
        consulta.executeUpdate();
        consulta.close();
    }

    public void modificar(Persona persona) throws SQLException, PersonaNoEncontradaExcepcion {
        var consulta = conexion.prepareStatement("UPDATE personas SET nombres = ?, apellidos = ? WHERE identificador = ?");
        consulta.setString(1, persona.getNombres());
        consulta.setString(2, persona.getApellidos());
        consulta.setInt(3, persona.getIdentificador());
        try {
            if (consulta.executeUpdate() == 0) {
                throw new PersonaNoEncontradaExcepcion();
            }
        } finally {
            consulta.close();
        }
    }

    public void borrar(Persona persona) throws SQLException, PersonaNoEncontradaExcepcion {
        var consulta = conexion.prepareStatement("DELETE FROM personas WHERE identificador = ?");
        consulta.setInt(1, persona.getIdentificador());
        try {
            if (consulta.executeUpdate() == 0) {
                throw new PersonaNoEncontradaExcepcion();
            }
        } finally {
            consulta.close();
        }
    }
}
