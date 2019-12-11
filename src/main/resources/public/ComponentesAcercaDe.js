class ComponentesAcercaDe extends React.Component {

    constructor(props) {
        super(props);
        // estado del componente
        this.state = {
            autor: "Programación Orientada a Objetos II - Facultad de Ciencias Exactas Químicas y Naturales - Universidad Nacional de Misiones"
        };
    }

    render() {
        return (
                <div>
                    <p> Ejemplo de sitio usando ReactJS y Javalin </p>
                    <p className="texto-resaltado">{this.state.autor}</p>                
                </div>
                );
    }

}



