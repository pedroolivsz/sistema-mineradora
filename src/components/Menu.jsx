import "./Menu.css"

function Menu(props) {
    return (
        <div className="menu">
            <header>
                <nav className="navbar">
                    <button onClick={() => props.mudarPagina("inicio")}>Home</button>
                    <button onClick={() => props.mudarPagina("cadastro")}>Cadastro</button>
                    <button onClick={() => props.mudarPagina("relatorio")}>Relatório</button>
                </nav>
            </header>
        </div>
    );
}

export default Menu;