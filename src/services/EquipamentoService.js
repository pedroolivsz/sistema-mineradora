import api from "./api";

const FuncionarioService = {
    listar: () => api.get("/funcionarios"),

    buscarPorId: (id) =>
        api.get(`/funcionarios/${id}`),

    cadastrar: (funcionario) =>
        api.post("/funcionarios", funcionario),

    atualizar: (id, funcionario) =>
        api.put(`/funcionarios/${id}`, funcionario),

    excluir: (id) =>
        api.delete(`/funcionarios/${id}`)

};

export default FuncionarioService;
