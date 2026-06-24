import "./style.css"

function Home() {
    const indicadores = {
        cidades: 15,
        funcionarios: 80,
        equipamentos: 45,
        servicos: 22
    };

    return (
        <div className="dashboard">
            <h2>Visão geral</h2>

            <div className="cards">
                <div className="card">
                    <h3>Cidades</h3>
                    <span>{indicadores.cidades}</span>
                </div>

                <div className="card">
                    <h3>Funcionarios</h3>
                    <span>{indicadores.funcionarios}</span>
                </div>

                <div className="card">
                    <h3>Equipamentos</h3>
                    <span>{indicadores.equipamentos}</span>
                </div>

                <div className="card">
                    <h3>Serviços</h3>
                    <span>{indicadores.servicos}</span>
                </div>
            </div>
            
        </div>
    );
}

export default Home;