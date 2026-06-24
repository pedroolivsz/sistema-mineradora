import { useEffect, useState } from "react";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";

import ServicoForm from "../../forms/ServicoForm";

import servicoService from "../../services/ServicoService";

function Servicos() {
const [servicos, setServicos] =
useState([]);

const [busca, setBusca] = useState("");

const [modalOpen, setModalOpen] =
    useState(false);

const [servicoSelecionado,
    setServicoSelecionado] =
    useState(null);

const colunas = [
    {
        header: "Nome",
        accessor: "nome"
    },
    {
        header: "Data Início",
        accessor: "data_inicio"
    },
    {
        header: "Data Fim",
        accessor: "data_fim"
    },
    {
        header: "Valor",
        accessor: "valor"
    }
];

useEffect(() => {
    carregarServicos();
}, []);

async function carregarServicos() {
    try {
        const response =
            await servicoService.listar();

        setServicos(response.data);
    } catch (error) {
        console.error(error);
    }
}

function abrirCadastro() {
    setServicoSelecionado(null);
    setModalOpen(true);
}

function editarServico(id) {
    const servico =
        servicos.find(
            (servico) =>
                servico.id === id
        );

    setServicoSelecionado(
        servico
    );

    setModalOpen(true);
}

async function salvarServico(
    dados
) {
    try {
        if (servicoSelecionado) {
            await servicoService.atualizar(
                servicoSelecionado.id,
                dados
            );
        } else {
            await servicoService.cadastrar(
                dados
            );
        }

        setModalOpen(false);

        carregarServicos();
    } catch (error) {
        console.error(error);
    }
}

async function excluirServico(id) {
    const confirmar =
        window.confirm(
            "Deseja excluir este serviço?"
        );

    if (!confirmar) return;

    try {
        await servicoService.excluir(id);

        carregarServicos();
    } catch (error) {
        console.error(error);
    }
}

const servicosFiltrados =
    servicos.filter(
        (servico) =>
            servico.nome
                .toLowerCase()
                .includes(
                    busca.toLowerCase()
                )
    );

return (
    <div>
        <h2>Serviços</h2>

        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px"
            }}
        >
            <input
                type="text"
                placeholder="Buscar serviço..."
                value={busca}
                onChange={(e) =>
                    setBusca(
                        e.target.value
                    )
                }
            />

            <button
                onClick={
                    abrirCadastro
                }
            >
                Novo Serviço
            </button>
        </div>

        <Tabela
            colunas={colunas}
            dados={
                servicosFiltrados
            }
            onEditar={
                editarServico
            }
            onExcluir={
                excluirServico
            }
        />

        <Modal
            isOpen={modalOpen}
            title={
                servicoSelecionado
                    ? "Editar Serviço"
                    : "Novo Serviço"
            }
            onClose={() =>
                setModalOpen(false)
            }
        >
            <ServicoForm
                initialData={
                    servicoSelecionado ||
                    {
                        nome: "",
                        descricao: "",
                        data_inicio: "",
                        data_fim: "",
                        valor: "",
                        equipamentos: []
                    }
                }
                onSubmit={
                    salvarServico
                }
            />
        </Modal>
    </div>
);

}

export default Servicos;
