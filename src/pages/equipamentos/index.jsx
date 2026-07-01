import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";
import EquipamentoForm from "../../forms/EquipamentoForm";

import equipamentoService from "../../services/EquipamentoService";

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
        header: "Data de Aquisição",
        accessor: "data_aquisicao"
    },
    {
        header: "Status",
        accessor: "status"
    },
    {
        header: "Cidade",
        accessor: "cidade"
    }
];

function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    async function carregarEquipamentos() {
        try {
            const response = await equipamentoService.listar();
            setEquipamentos(response.data);
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao carregar equipamentos.",
                "error"
            );
        }
    }

    function novoEquipamento() {
        setEquipamentoSelecionado(null);
        setModalAberto(true);
    }

    function editarEquipamento(equipamento) {
        setEquipamentoSelecionado(equipamento);
        setModalAberto(true);
    }

    async function excluirEquipamento(equipamento) {
        const result = await Swal.fire({
            title: "Excluir equipamento?",
            text: `Deseja excluir ${equipamento.nome}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;

        try {
            await equipamentoService.excluir(equipamento.id);

            Swal.fire(
                "Sucesso",
                "Equipamento excluído com sucesso.",
                "success"
            );

            carregarEquipamentos();

        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao excluir equipamento.",
                "error"
            );
        }
    }

    function fecharModal() {
        setModalAberto(false);
    }

    async function salvarEquipamento(dados) {
        try {
            if (equipamentoSelecionado) {
                await equipamentoService.editar(
                    equipamentoSelecionado.id,
                    dados
                );
            } else {
                await equipamentoService.cadastrar(dados);
            }

            Swal.fire(
                "Sucesso",
                "Equipamento salvo com sucesso.",
                "success"
            );

            fecharModal();
            carregarEquipamentos();

        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao salvar equipamento.",
                "error"
            );
        }
    }

    return (
        <>
            <div className="page-header">
                <button onClick={novoEquipamento}>
                    Novo Equipamento
                </button>
            </div>

            <Tabela
                colunas={colunas}
                dados={equipamentos}
                onEditar={editarEquipamento}
                onExcluir={excluirEquipamento}
            />

            <Modal
                aberto={modalAberto}
                titulo={
                    equipamentoSelecionado
                        ? "Editar Equipamento"
                        : "Novo Equipamento"
                }
                onFechar={fecharModal}
            >
                <EquipamentoForm
                    equipamento={equipamentoSelecionado}
                    onSubmit={salvarEquipamento}
                />
            </Modal>
        </>
    );

}

export default Equipamentos;
