import api from "./api";

const ServicoService = {
    listar: () => api.get("/servicos"),

    buscarPorId: (id) =>
        api.get(`/servicos/${id}`),

    cadastrar: (servico) =>
        api.post("/servicos", servico),

    atualizar: (id, servico) =>
        api.put(`/servicos/${id}`, servico),

    excluir: (id) =>
        api.delete(`/servicos/${id}`)
};

export default ServicoService;