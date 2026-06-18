import { useEffect, useState } from "react";
import Equipamento from "./components/Equipamento"
import Menu from "./components/Menu"
import "./App.css"

function App() {
    const [pagina, setPagina] = useState("inicio");
    const [nome, setNome] = useState("");
    const [setor, setSetor] = useState("");
    const [equipamentos, setEquipamentos] = useState([]);

    const [busca, setBusca] = useState("");
    const [equipamentosExibidos, setEquipamentosExibidos] = useState([]);

    function cadastrar() {
        const novoEquipamento = {
            nome,
            setor
        }

        const equipamentosSalvos = JSON.parse(localStorage.getItem("equipamentos")) || [];

        equipamentosSalvos.push(novoEquipamento);

        localStorage.setItem(
            "equipamentos",
            JSON.stringify(equipamentosSalvos)
        );

        setEquipamentos(equipamentosSalvos);

        setNome("")
        setSetor("")

        alert("Equipamento cadastrado com sucesso.")
    }

    function buscarEquipamento() {
        const equipamento = equipamentos.filter((equipamento) => 
            equipamento.nome.toLowerCase().includes(busca.toLocaleLowerCase())
        );

        setEquipamentosExibidos(equipamento);
    }

    function mostrarTodos() {
        setEquipamentosExibidos(equipamentos);
        setBusca("");
    }

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("equipamentos")) || [];

        setEquipamentos(dados);
        setEquipamentosExibidos(dados);
    }, []);

    return (
        <div className="container">
            <Menu mudarPagina={setPagina} />

            {
                pagina === "inicio" && (
                    <div className="home">
                        <h1>Sistema de Controle de Equipamentos</h1>
                        <p>Bem-Vindo ao sistema da Mineradora</p>
                        <p>Utilize o menu para navegar</p>
                    </div>
                )
            }

            {
                pagina === "cadastro" && (
                    <div className="container-equipamentos">
                        <h1>Controle de equipamentos</h1>

                        <label htmlFor="nome-equip">Nome do equipamento </label>
                        <input
                            type="text"
                            id="nome-equip"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label htmlFor="setor-equip">Setor do equipamento </label>
                        <input
                            type="text"
                            id="setor-equip"
                            value={setor}
                            onChange={(e) => setSetor(e.target.value)}
                        />

                        <button
                            onClick={cadastrar}>Cadastrar
                        </button>
                    </div>
                )
            }

            {
                pagina === "relatorio" && (
                    <div className="relatorio">
                        <h1>Relatorio de Equipamentos</h1>
                        <p>
                            Total de equipamentos cadastrados: {equipamentos.length}
                        </p>

                        <div className="busca">
                            <label htmlFor="buscar">Buscar equipamento</label>
                            <input 
                                type="text"
                                value={busca}
                                id="buscar"
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>

                        <button onClick={buscarEquipamento}>
                            Buscar
                        </button>

                        <button onClick={mostrarTodos}>
                            Mostrar todos
                        </button>

                        {
                            equipamentosExibidos.map((equipamento, i) => (
                                <Equipamento
                                    key={i}
                                    nome={equipamento.nome}
                                    setor={equipamento.setor}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default App;