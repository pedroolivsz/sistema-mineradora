import { useEffect, useState } from "react";

import cidadeService from "../../services/CidadeService";

function EquipamentoForm({ equipamento, onSubmit }) {
    const [formData, setFormData] = useState({
        nome: "",
        modelo: "",
        fabricante: "",
        data_aquisicao: "",
        status: "ATIVO",
        cidade_id: ""
    });

    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        carregarCidades();
    }, []);

    useEffect(() => {
        if (equipamento) {
            setFormData({
                nome: equipamento.nome,
                modelo: equipamento.modelo,
                fabricante: equipamento.fabricante,
                data_aquisicao: equipamento.data_aquisicao?.split("T")[0] || "",
                status: equipamento.status,
                cidade_id: equipamento.cidade_id
            });
        } else {
            setFormData({
                nome: "",
                modelo: "",
                fabricante: "",
                data_aquisicao: "",
                status: "ATIVO",
                cidade_id: ""
            });
        }
    }, [equipamento]);

    async function carregarCidades() {
        try {
            const response = await cidadeService.listar();
            setCidades(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            ...formData,
            cidade_id: Number(formData.cidade_id)
        });
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="nome">Nome</label>

                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="modelo">Modelo</label>

                <input
                    type="text"
                    id="modelo"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="fabricante">Fabricante</label>

                <input
                    type="text"
                    id="fabricante"
                    name="fabricante"
                    value={formData.fabricante}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="data_aquisicao">
                    Data de Aquisição
                </label>

                <input
                    type="date"
                    id="data_aquisicao"
                    name="data_aquisicao"
                    value={formData.data_aquisicao}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="status">Status</label>

                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="ATIVO">Ativo</option>
                    <option value="MANUTENCAO">Manutenção</option>
                    <option value="INATIVO">Inativo</option>
                </select>
            </div>

            <div>
                <label htmlFor="cidade_id">Cidade</label>

                <select
                    id="cidade_id"
                    name="cidade_id"
                    value={formData.cidade_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Selecione uma cidade
                    </option>

                    {cidades.map((cidade) => (
                        <option
                            key={cidade.id}
                            value={cidade.id}
                        >
                            {cidade.nome} - {cidade.estado}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">
                {equipamento ? "Atualizar" : "Cadastrar"}
            </button>

        </form>
    );

}

export default EquipamentoForm;
