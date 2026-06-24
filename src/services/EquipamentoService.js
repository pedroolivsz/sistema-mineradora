import api from "./api";

const EquipamentoService = {
    listar: () => api.get("/equipamentos"),

    buscarPorId: (id) =>
        api.get(`/equipamentos/${id}`),

    cadastrar: (equipamento) =>
        api.post("/equipamentos", equipamento),

    atualizar: (id, equipamento) =>
        api.put(`/equipamentos/${id}`, equipamento),

    excluir: (id) =>
        api.delete(`/equipamentos/${id}`)
};

export default EquipamentoService;