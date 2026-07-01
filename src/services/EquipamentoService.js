import api from "./api";

const EquipamentoService = {

    async listar() {
        const response = await api.get("/equipamentos");
        return response.data;
    },

    async buscarPorId(id) {
        const response = await api.get(`/equipamentos/${id}`);
        return response.data;
    },

    async cadastrar(dados) {
        const response = await api.post("/equipamentos", dados);
        return response.data;
    },

    async editar(id, dados) {
        const response = await api.put(`/equipamentos/${id}`, dados);
        return response.data;
    },

    async excluir(id) {
        const response = await api.delete(`/equipamentos/${id}`);
        return response.data;
    }

};

export default EquipamentoService;