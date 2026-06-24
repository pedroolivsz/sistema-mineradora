import { useEffect, useState } from "react";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";

import EquipamentoForm from "../../forms/EquipamentoForm";

import EquipamentoService from "../../services/EquipamentoService";

function Equipamentos() {
const [equipamentos, setEquipamentos] =
useState([]);


const [busca, setBusca] = useState("");

const [modalOpen, setModalOpen] =
    useState(false);

const [equipamentoSelecionado,
    setEquipamentoSelecionado] =
    useState(null);

const colunas = [
    {
        header: "Nome",
        accessor: "nome"
    },
    {
        header: "Modelo",
        accessor: "modelo"
    },
    {
        header: "Fabricante",
        accessor: "fabricante"
    },
    {
        header: "Status",
        accessor: "status"
    },
    {
        header: "Cidade",
        accessor: "cidade_nome"
    }
];

useEffect(() => {
    carregarEquipamentos();
}, []);

async function carregarEquipamentos() {
    try {
        const response =
            await equipamentoService.listar();

        setEquipamentos(response.data);
    } catch (error) {
        console.error(error);
    }
}

function abrirCadastro() {
    setEquipamentoSelecionado(null);
    setModalOpen(true);
}

function editarEquipamento(id) {
    const equipamento =
        equipamentos.find(
            (equipamento) =>
                equipamento.id === id
        );

    setEquipamentoSelecionado(
        equipamento
    );

    setModalOpen(true);
}

async function salvarEquipamento(
    dados
) {
    try {
        if (
            equipamentoSelecionado
        ) {
            await equipamentoService.atualizar(
                equipamentoSelecionado.id,
                dados
            );
        } else {
            await equipamentoService.cadastrar(
                dados
            );
        }

        setModalOpen(false);

        carregarEquipamentos();
    } catch (error) {
        console.error(error);
    }
}

async function excluirEquipamento(
    id
) {
    const confirmar =
        window.confirm(
            "Deseja excluir este equipamento?"
        );

    if (!confirmar) return;

    try {
        await equipamentoService.excluir(
            id
        );

        carregarEquipamentos();
    } catch (error) {
        console.error(error);
    }
}

const equipamentosFiltrados =
    equipamentos.filter(
        (equipamento) =>
            equipamento.nome
                .toLowerCase()
                .includes(
                    busca.toLowerCase()
                )
    );

return (
    <div>
        <h2>Equipamentos</h2>

        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px"
            }}
        >
            <input
                type="text"
                placeholder="Buscar equipamento..."
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
                Novo Equipamento
            </button>
        </div>

        <Tabela
            colunas={colunas}
            dados={
                equipamentosFiltrados
            }
            onEditar={
                editarEquipamento
            }
            onExcluir={
                excluirEquipamento
            }
        />

        <Modal
            isOpen={modalOpen}
            title={
                equipamentoSelecionado
                    ? "Editar Equipamento"
                    : "Novo Equipamento"
            }
            onClose={() =>
                setModalOpen(false)
            }
        >
            <EquipamentoForm
                initialData={
                    equipamentoSelecionado ||
                    {
                        nome: "",
                        modelo: "",
                        fabricante: "",
                        data_aquisicao: "",
                        status: "ATIVO",
                        cidade_id: ""
                    }
                }
                onSubmit={
                    salvarEquipamento
                }
            />
        </Modal>
    </div>
);

}

export default Equipamentos;
