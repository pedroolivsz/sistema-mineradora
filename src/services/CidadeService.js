import api from "./api";

const CidadeService = {

    async listar() {
        const response = await api.get("/cidades");
        return response.data;
    },

    async buscarPorId(id) {
        const response = await api.get(`/cidades/${id}`);
        return response.data;
    },

    async cadastrar(dados) {
        const response = await api.post("/cidades", dados);
        return response.data;
    },

    async editar(id, dados) {
        const response = await api.put(`/cidades/${id}`, dados);
        return response.data;
    },

    async excluir(id) {
        const response = await api.delete(`/cidades/${id}`);
        return response.data;
    }

};

export default CidadeService;
