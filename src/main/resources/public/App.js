class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagina : 1 // 1 personas, 2 acerca de
        };
    }
    
    // determino la pagina a mostrar
    manejador(valor) {
        this.setState({pagina : valor});
    }

    
    render() {
        let componente;
        if (this.state.pagina === 1) {
            componente = <ComponentesPersonas/>;
        }
        if (this.state.pagina === 2) {
            componente = <ComponentesAcercaDe/>;
        }

        // uso <span> y no <a> dado que no son enlaces a otras paginas
        // para que parezca un enlace en estilos.css defino el formato de span
        // paso a manejador() el id del componente que quiero mostrar
        // como cambio el estado, llama a render y muestra dicho componente
        return (
                <div>
                    <Header/>
                    <nav>
                        <span onClick={this.manejador.bind(this, 1)}>Personas</span> |
                        <span onClick={this.manejador.bind(this, 2)}>Acerca de</span> |
                    </nav>
                    {componente}
                </div>
                );
    }
}

const Header = () => (
            <header>
                <h1>Personas</h1>        
            </header>
            );

ReactDOM.render(<App/>, document.getElementById('inicio'));
