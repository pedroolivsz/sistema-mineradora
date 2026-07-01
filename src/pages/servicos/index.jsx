import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";
import ServicoForm from "../../forms/ServicoForm";

import servicoService from "../../services/ServicoService";

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

function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarServicos();
    }, []);

    async function carregarServicos() {
        try {
            const response = await servicoService.listar();
            setServicos(response.data);
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao carregar serviços.",
                "error"
            );
        }
    }

    function novoServico() {
        setServicoSelecionado(null);
        setModalAberto(true);
    }

    function editarServico(servico) {
        setServicoSelecionado(servico);
        setModalAberto(true);
    }

    async function excluirServico(servico) {
        const result = await Swal.fire({
            title: "Excluir serviço?",
            text: `Deseja excluir "${servico.nome}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;

        try {
            await servicoService.excluir(servico.id);

            Swal.fire(
                "Sucesso",
                "Serviço excluído com sucesso.",
                "success"
            );

            carregarServicos();
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao excluir serviço.",
                "error"
            );
        }
    }

    function fecharModal() {
        setModalAberto(false);
    }

    async function salvarServico(dados) {
        try {
            if (servicoSelecionado) {
                await servicoService.editar(
                    servicoSelecionado.id,
                    dados
                );
            } else {
                await servicoService.cadastrar(dados);
            }

            Swal.fire(
                "Sucesso",
                "Serviço salvo com sucesso.",
                "success"
            );

            fecharModal();
            carregarServicos();

        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao salvar serviço.",
                "error"
            );
        }
    }

    return (
        <>
            <div className="page-header">
                <button onClick={novoServico}>
                    Novo Serviço
                </button>
            </div>

            <Tabela
                colunas={colunas}
                dados={servicos}
                onEditar={editarServico}
                onExcluir={excluirServico}
            />

            <Modal
                aberto={modalAberto}
                titulo={
                    servicoSelecionado
                        ? "Editar Serviço"
                        : "Novo Serviço"
                }
                onFechar={fecharModal}
            >
                <ServicoForm
                    servico={servicoSelecionado}
                    onSubmit={salvarServico}
                />
            </Modal>
        </>
    );

}

export default Servicos;
