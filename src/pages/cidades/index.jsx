import { useEffect, useState } from "react";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";
import CidadeForm from "../../forms/CidadeForm";

import CidadeService from "../../services/CidadeService";

function Cidades() {
    const [cidades, setCidades] = useState([]);
    const [busca, setBusca] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [cidadeSelecionada, setCidadeSelecionada] =
        useState(null);

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

    useEffect(() => {
        carregarCidades();
    }, []);

    async function carregarCidades() {
        try {
            const response =
                await cidadeService.listar();

            setCidades(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function abrirCadastro() {
        setCidadeSelecionada(null);
        setModalOpen(true);
    }

    function editarCidade(id) {
        const cidade = cidades.find(
            (cidade) => cidade.id === id
        );

        setCidadeSelecionada(cidade);
        setModalOpen(true);
    }

    async function salvarCidade(dados) {
        try {
            if (cidadeSelecionada) {
                await cidadeService.atualizar(
                    cidadeSelecionada.id,
                    dados
                );
            } else {
                await cidadeService.cadastrar(
                    dados
                );
            }

            setModalOpen(false);

            carregarCidades();
        } catch (error) {
            console.error(error);
        }
    }

    async function excluirCidade(id) {
        const confirmar = window.confirm(
            "Deseja excluir esta cidade?"
        );

        if (!confirmar) return;

        try {
            await cidadeService.excluir(id);

            carregarCidades();
        } catch (error) {
            console.error(error);
        }
    }

    const cidadesFiltradas = cidades.filter(
        (cidade) =>
            cidade.nome
                .toLowerCase()
                .includes(
                    busca.toLowerCase()
                )
    );

    return (
        <div>
            <h2>Cidades</h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >
                <input
                    type="text"
                    placeholder="Buscar cidade..."
                    value={busca}
                    onChange={(e) =>
                        setBusca(e.target.value)
                    }
                />

                <button
                    onClick={abrirCadastro}
                >
                    Nova Cidade
                </button>
            </div>

            <Tabela
                colunas={colunas}
                dados={cidadesFiltradas}
                onEditar={editarCidade}
                onExcluir={excluirCidade}
            />

            <Modal
                isOpen={modalOpen}
                title={
                    cidadeSelecionada
                        ? "Editar Cidade"
                        : "Nova Cidade"
                }
                onClose={() =>
                    setModalOpen(false)
                }
            >
                <CidadeForm
                    initialData={
                        cidadeSelecionada || {
                            nome: "",
                            estado: "",
                            populacao: ""
                        }
                    }
                    onSubmit={
                        salvarCidade
                    }
                />
            </Modal>
        </div>
    );

}

export default Cidades;
