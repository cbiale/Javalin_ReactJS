class ComponentesPersonas extends React.Component {

    constructor(props) {
        super(props);
        // estado del componente
        this.state = {
            personas: [], // listado de personas
            editarPersona: false, // indicador de formulario editor
            nuevaPersona: false, // indicador de formulario nuevo
            // datos a pasar cuando edito
            identificador: "",
            nombres: "",
            apellidos: ""
        };
    }

    // obtengo personas (solicito datos al servidor)
    // una vez que recupero paso a json
    // y luego cambio el estado del atributo personas
    // editarPersona y nuevaPersona cambio porque uso obtenerPersonas()
    // en otros lugares
    obtenerPersonas() {
        fetch('/api/v1/personas')
                .then(respuesta => respuesta.json())
                .then(
                        datos => {
                            this.setState({personas: datos});
                            this.setState({editarPersona: false});
                            this.setState({nuevaPersona: false});
                        }
                );
    }

    // se ejecuta al montar el componente
    componentDidMount() {
        this.obtenerPersonas();
    }

    // estados cuando muestro el formulario de nueva Persona
    crearPersonaFormulario() {
        this.setState({nuevaPersona: true});
        this.setState({nombres: ""});
        this.setState({apellidos: ""});
    }

    // estados cuando muestro el formulario de editar Persona
    // paso argumentos al formulario mediante estado   
    editarPersonaFormulario(vIdentificador, vNombres, vApellidos) {
        this.setState({editarPersona: true});
        this.setState({identificador: vIdentificador});
        this.setState({nombres: vNombres});
        this.setState({apellidos: vApellidos});
    }

    // se ejecuta cuando se selecciona Volver en los formularios
    // de nueva Persona o editar Persona
    volverListado(evento) {
        evento.preventDefault();
        this.setState({editarPersona: false});
        this.setState({nuevaPersona: false});
    }

    // se ejecuta cuango se selecciona Guardar
    // en el formulario de nueva persona
    crearPersona(evento) {
        evento.preventDefault();
        // obtengo datos del formulario        
        let formulario = new FormData(document.getElementById('nueva-persona'));
        // invoco al servidor        
        fetch('/api/v1/personas/', {
            method: 'POST',
            body: formulario
        }).then(response => {
            console.log(response);
            // una vez obtenida la respuesta del servidor
            // invoco a obtenerPersonas()
            this.obtenerPersonas();
        }).catch(error => {
            console.log(error)
        });
    }

    // se ejecuta cuango se selecciona Guardar
    // en el formulario de editar persona
    editarPersona(evento) {
        evento.preventDefault();
        // obtengo datos del formulario
        let formulario = new FormData(document.getElementById('editar-persona'));
        // invoco al servidor
        fetch(`/api/v1/personas/${this.state.identificador}`, {
            method: 'PUT',
            body: formulario
        }).then(response => {
            console.log(response);
            // una vez obtenida la respuesta del servidor
            // invoco a obtenerPersonas()            
            this.obtenerPersonas();
        }).catch(error => {
            console.log(error)
        });
    }

    // se ejecuta cuango se selecciona Eliminar en el listado de personas  
    eliminarPersona(identificador) {
        // llamamos al DEL del servidor
        fetch(`/api/v1/personas/${identificador}`, {method: "DELETE"});
        // filtramos y quitamos la persona con identificador que eliminamos
        // usando una variable temporal
        let temporalPersonas = this.state.personas.filter(persona => persona.identificador != identificador);
        // asignamos al estado (personas) esa variable temporal
        this.setState({personas: temporalPersonas});
    }

    // manejador de entradas en los formularios   
    manejadorEntrada(evento) {
        // tener en cuenta que solo uso textos
        // mirar nombres de atributos de estado y nombres de elementos
        // del formulario (coinciden)        
        const target = evento.target;
        const valor = target.value.toUpperCase();
        const nombre = target.name;
        this.setState({
            [nombre]: valor
        });
    }

    render() {
        // si editarPersona esta en verdadero
        // se usan formularios controlados por reactJs
        // mirar formato de inputs
        if (this.state.editarPersona) {
            return (
                    <div>
                        <p className="texto-resaltado">Identificador: {this.state.identificador}</p>
                        <hr />                        
                        <form id="editar-persona" onSubmit={this.editarPersona.bind(this)}>                
                            <div>
                                <label>Nombres:                                
                                    <input
                                        name="nombres"
                                        type="text"
                                        value={this.state.nombres}
                                        onChange={this.manejadorEntrada.bind(this)} />
                                </label>
                            </div>
                            <br/>
                            <div>
                                <label>Apellidos:                     
                                    <input
                                        name="apellidos"
                                        type="text"
                                        value={this.state.apellidos}
                                        onChange={this.manejadorEntrada.bind(this)} />
                                </label>                          
                            </div>
                            <hr />                            
                            <div>
                                <input className="boton-confirma" type="submit" value="Guardar"/>
                                <button className="boton-simple" onClick={this.volverListado.bind(this)}>Volver</button>
                            </div>
                        </form>
                    </div>
                    );
        }
        // si nuevaPersona esta en verdadero
        // se usan formularios controlados por reactJs
        // mirar formato de inputs
        if (this.state.nuevaPersona) {
            return (
                    <div>
                        <p className="texto-resaltado"> Nueva persona</p>
                        <hr />                        
                        <form id="nueva-persona" onSubmit={this.crearPersona.bind(this)}>                        
                            <div>
                                <label>Nombres:                                
                                    <input
                                        name="nombres"
                                        type="text"
                                        value={this.state.nombres}
                                        onChange={this.manejadorEntrada.bind(this)} />
                                </label>
                            </div>
                            <br/>
                            <div>
                                <label>Apellidos:                     
                                    <input
                                        name="apellidos"
                                        type="text"
                                        value={this.state.apellidos}
                                        onChange={this.manejadorEntrada.bind(this)} />
                                </label>                          
                            </div>
                            <hr />                    
                            <div>
                                <input className="boton-confirma" type="submit" value="Guardar"/>
                                <button className="boton-simple" onClick={this.volverListado.bind(this)}>Volver</button>
                            </div>
                        </form>
                    </div>
                    );
        }
// si editarPersona y nuevaPersona son falsan muestro listado
// mirar evento sociado a "Nuevo", "Eliminar" y "Editar"
// ver uso de estilos usando clases css (boton-rojo por ejemplo)
// recuerden que no pueden usar class, se usa className
// Lean:
// -  https://es.reactjs.org/docs/faq-styling.html
// - https://github.com/MicheleBertoli/css-in-js (Alternativas)
        if (!this.state.editarPersona && !this.state.nuevaPersona) {
            return (
                    <div>
                        <button className="boton-nuevo" onClick={this.crearPersonaFormulario.bind(this)}>Nuevo</button>                        
                        <br/>                        
                        <table>
                            <thead>
                                <tr>                    
                                    <th>Identificador</th>
                                    <th>Apellidos</th>
                                    <th>Nombres</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.personas.map(persona =>
                                        <tr key = {persona.identificador}>
                                            <td> {persona.identificador} </td>
                                            <td> {persona.apellidos} </td>
                                            <td> {persona.nombres} </td>
                                            <td><button className="boton-edita" onClick={this.editarPersonaFormulario.bind(this, persona.identificador, persona.nombres, persona.apellidos)}>Editar</button></td>
                                            <td><button className="boton-elimina" onClick={this.eliminarPersona.bind(this, persona.identificador)}>Eliminar</button></td>                                                    
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                    );
        }

    }
}