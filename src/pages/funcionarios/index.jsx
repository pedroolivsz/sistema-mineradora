import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Tabela from "../../components/tabela";
import Modal from "../../components/modal";
import FuncionarioForm from "../../forms/FuncionarioForm";

import funcionarioService from "../../services/FuncionarioService";

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
        header: "Telefone",
        accessor: "telefone"
    },
    {
        header: "E-mail",
        accessor: "email"
    },
    {
        header: "Salário",
        accessor: "salario"
    },
    {
        header: "Cidade",
        accessor: "cidade"
    }
];

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    async function carregarFuncionarios() {
        try {
            const response = await funcionarioService.listar();
            setFuncionarios(response.data);
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao carregar funcionários.",
                "error"
            );
        }
    }

    function novoFuncionario() {
        setFuncionarioSelecionado(null);
        setModalAberto(true);
    }

    function editarFuncionario(funcionario) {
        setFuncionarioSelecionado(funcionario);
        setModalAberto(true);
    }

    async function excluirFuncionario(funcionario) {
        const result = await Swal.fire({
            title: "Excluir funcionário?",
            text: `Deseja excluir ${funcionario.nome}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;

        try {
            await funcionarioService.excluir(funcionario.id);

            Swal.fire(
                "Sucesso",
                "Funcionário excluído com sucesso.",
                "success"
            );

            carregarFuncionarios();
        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao excluir funcionário.",
                "error"
            );
        }
    }

    function fecharModal() {
        setModalAberto(false);
    }

    async function salvarFuncionario(dados) {
        try {
            if (funcionarioSelecionado) {
                await funcionarioService.editar(
                    funcionarioSelecionado.id,
                    dados
                );
            } else {
                await funcionarioService.cadastrar(dados);
            }

            Swal.fire(
                "Sucesso",
                "Funcionário salvo com sucesso.",
                "success"
            );

            fecharModal();
            carregarFuncionarios();

        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message || "Erro ao salvar funcionário.",
                "error"
            );
        }
    }

    return (
        <>
            <div className="page-header">
                <button onClick={novoFuncionario}>
                    Novo Funcionário
                </button>
            </div>

            <Tabela
                colunas={colunas}
                dados={funcionarios}
                onEditar={editarFuncionario}
                onExcluir={excluirFuncionario}
            />

            <Modal
                aberto={modalAberto}
                titulo={
                    funcionarioSelecionado
                        ? "Editar Funcionário"
                        : "Novo Funcionário"
                }
                onFechar={fecharModal}
            >
                <FuncionarioForm
                    funcionario={funcionarioSelecionado}
                    onSubmit={salvarFuncionario}
                />
            </Modal>
        </>
    );

}

export default Funcionarios;
