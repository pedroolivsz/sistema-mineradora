import Tabela from "../../components/tabela";

function Cidades() {
    const cidades = [
        {
        id: 1,
        nome: "Fortaleza",
        estado: "CE",
        populacao: 2428678
        },
        {
        id: 2,
        nome: "Sobral",
        estado: "CE",
        populacao: 210711
        }
    ];

    function editarCidade(id) { console.log("Editar:", id); } 
    
    function excluirCidade(id) { console.log("Excluir:", id); }
    
    const colunas = [
                {
                    header: "Nome",
                    accessor: "nome"
                },
                {
                    header: "Estado",
                    accessor: "estado"
                },
                {
                    header: "População",
                    accessor: "populacao"
                }
            ];

    return (
        <div>
            <Tabela
                colunas={colunas}
                dados={cidades}
                onEditar={editarCidade}
                onExcluir={excluirCidade}
            />
        </div>
    );
}

export default Cidades;