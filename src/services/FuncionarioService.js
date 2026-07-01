import api from "./api";

const FuncionarioService = {

    async listar() {
        const response = await api.get("/funcionarios");
        return response.data;
    },

    async buscarPorId(id) {
        const response = await api.get(`/funcionarios/${id}`);
        return response.data;
    },

    async cadastrar(dados) {
        const response = await api.post("/funcionarios", dados);
        return response.data;
    },

    async editar(id, dados) {
        const response = await api.put(`/funcionarios/${id}`, dados);
        return response.data;
    },

    async excluir(id) {
        const response = await api.delete(`/funcionarios/${id}`);
        return response.data;
    }

};

export default FuncionarioService;