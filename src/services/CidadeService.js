import api from "./api";

const CidadeService = {
    listar: () => api.get("/cidades"),

    buscarPorId: (id) =>
        api.get(`/cidades/${id}`),

    cadastrar: (cidade) =>
        api.post("/cidades", cidade),

    atualizar: (id, cidade) =>
        api.put(`/cidades/${id}`, cidade),

    excluir: (id) =>
        api.delete(`/cidades/${id}`)

};

export default CidadeService;
