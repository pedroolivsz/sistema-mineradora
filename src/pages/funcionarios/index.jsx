import { useEffect, useState } from "react";

import Tabela from "../../components/tabela";
import Modal from "../../components/tabela";

import FuncionarioForm from "../../forms/EquipamentoForm";

import FuncionarioService from "../../services/FuncionarioService";

function Funcionarios() {
    const [funcionarios, setFuncionarios] =
        useState([]);

    const [busca, setBusca] = useState("");

    const [modalOpen, setModalOpen] =
        useState(false);

    const [funcionarioSelecionado,
        setFuncionarioSelecionado] =
        useState(null);

    const colunas = [
        {
            header: "Nome",
            accessor: "nome"
        },
        {
            header: "Cargo",
            accessor: "cargo"
        },
        {
            header: "Cidade",
            accessor: "cidade_nome"
        }
    ];

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    async function carregarFuncionarios() {
        try {
            const response =
                await funcionarioService.listar();

            setFuncionarios(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function abrirCadastro() {
        setFuncionarioSelecionado(null);
        setModalOpen(true);
    }

    function editarFuncionario(id) {
        const funcionario =
            funcionarios.find(
                (funcionario) =>
                    funcionario.id === id
            );

        setFuncionarioSelecionado(
            funcionario
        );

        setModalOpen(true);
    }

    async function salvarFuncionario(
        dados
    ) {
        try {
            if (
                funcionarioSelecionado
            ) {
                await funcionarioService.atualizar(
                    funcionarioSelecionado.id,
                    dados
                );
            } else {
                await funcionarioService.cadastrar(
                    dados
                );
            }

            setModalOpen(false);

            carregarFuncionarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function excluirFuncionario(
        id
    ) {
        const confirmar =
            window.confirm(
                "Deseja excluir este funcionário?"
            );

        if (!confirmar) return;

        try {
            await funcionarioService.excluir(
                id
            );

            carregarFuncionarios();
        } catch (error) {
            console.error(error);
        }
    }

    const funcionariosFiltrados =
        funcionarios.filter(
            (funcionario) =>
                funcionario.nome
                    .toLowerCase()
                    .includes(
                        busca.toLowerCase()
                    )
        );

    return (
        <div>
            <h2>Funcionários</h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >
                <input
                    type="text"
                    placeholder="Buscar funcionário..."
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
                    Novo Funcionário
                </button>
            </div>

            <Tabela
                colunas={colunas}
                dados={
                    funcionariosFiltrados
                }
                onEditar={
                    editarFuncionario
                }
                onExcluir={
                    excluirFuncionario
                }
            />

            <Modal
                isOpen={modalOpen}
                title={
                    funcionarioSelecionado
                        ? "Editar Funcionário"
                        : "Novo Funcionário"
                }
                onClose={() =>
                    setModalOpen(false)
                }
            >
                <FuncionarioForm
                    initialData={
                        funcionarioSelecionado ||
                        {
                            nome: "",
                            cargo: "",
                            telefone: "",
                            email: "",
                            salario: "",
                            cidade_id: ""
                        }
                    }
                    onSubmit={
                        salvarFuncionario
                    }
                />
            </Modal>
        </div>
    );

}

export default Funcionarios;
