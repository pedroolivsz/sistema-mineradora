import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";
import CidadeForm from "../../forms/CidadeForm";

import cidadeService from "../../services/CidadeService";

const colunas = [
    {
        header: "Nome",
        accessor: "nome",
    },
    {
        header: "Estado",
        accessor: "estado",
    },
    {
        header: "População",
        accessor: "populacao",
    },
];

function Cidades() {
    const [cidades, setCidades] = useState([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    async function carregarCidades() {
        try {
            const response = await cidadeService.listar();

            setCidades(response.data);
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao carregar cidades.",
                "error"
            );
        }
    }

    useEffect(() => {
        carregarCidades();
    }, []);

    function novaCidade() {
        setCidadeSelecionada(null);
        setModalAberto(true);
    }

    function editarCidade(cidade) {
        setCidadeSelecionada(cidade);
        setModalAberto(true);
    }

    async function excluirCidade(cidade) {
        const result = await Swal.fire({
            title: "Excluir cidade?",
            text: `Deseja excluir ${cidade.nome}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        try {
            await cidadeService.excluir(cidade.id);

            Swal.fire(
                "Sucesso",
                "Cidade excluída com sucesso.",
                "success"
            );

            carregarCidades();
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao excluir cidade.",
                "error"
            );
        }
    }

    function fecharModal() {
        setModalAberto(false);
    }

    async function salvarCidade(dados) {
        try {
            if (cidadeSelecionada) {
                await cidadeService.editar(cidadeSelecionada.id, dados);
            } else {
                await cidadeService.cadastrar(dados);
            }

            Swal.fire(
                "Sucesso",
                "Cidade salva com sucesso.",
                "success"
            );

            fecharModal();
            carregarCidades();
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao salvar cidade.",
                "error"
            );
        }
    }

    return (
        <>
            <div className="page-header">
                <button onClick={novaCidade}>
                    Nova Cidade
                </button>
            </div>

            <Tabela
                colunas={colunas}
                dados={cidades}
                onEditar={editarCidade}
                onExcluir={excluirCidade}
            />

            <Modal
                aberto={modalAberto}
                titulo={
                    cidadeSelecionada
                        ? "Editar Cidade"
                        : "Nova Cidade"
                }
                onFechar={fecharModal}
            >
                <CidadeForm
                    cidade={cidadeSelecionada}
                    onSubmit={salvarCidade}
                />
            </Modal>
        </>
    );
}

export default Cidades;