/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.unam.personas.modelos;

/**
 *
 * @author CM
 */
public class Persona {
    private int identificador;
    private String nombres;
    private String apellidos;

    public Persona() {
        
    }
    public Persona (String nombres, String apellidos) {
        this.nombres = nombres;
        this.apellidos = apellidos;
    }

    public Persona(int identificador, String nombres, String apellidos) {
        this.identificador = identificador;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }

    public int getIdentificador() {
        return identificador;
    }

    public void setIdentificador(int identificador) {
        this.identificador = identificador;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    
    @Override
    public String toString() {
        return this.nombres + " " + this.apellidos;
    }
}