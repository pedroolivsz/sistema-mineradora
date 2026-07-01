import api from "./api";

const ServicoService = {

    async listar() {
        const response = await api.get("/servicos");
        return response.data;
    },

    async buscarPorId(id) {
        const response = await api.get(`/servicos/${id}`);
        return response.data;
    },

    async cadastrar(dados) {
        const response = await api.post("/servicos", dados);
        return response.data;
    },

    async editar(id, dados) {
        const response = await api.put(`/servicos/${id}`, dados);
        return response.data;
    },

    async excluir(id) {
        const response = await api.delete(`/servicos/${id}`);
        return response.data;
    }

};

export default ServicoService;