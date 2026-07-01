import { useEffect, useState } from "react";

import equipamentoService from "../../services/EquipamentoService";

function ServicoForm({ servico, onSubmit }) {
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        data_inicio: "",
        data_fim: "",
        valor: "",
        equipamentos: []
    });

    const [equipamentos, setEquipamentos] = useState([]);

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    useEffect(() => {
        if (servico) {
            setFormData({
                nome: servico.nome,
                descricao: servico.descricao,
                data_inicio: servico.data_inicio?.split("T")[0] || "",
                data_fim: servico.data_fim?.split("T")[0] || "",
                valor: servico.valor,
                equipamentos: servico.equipamentos?.map(e => e.id) || []
            });
        } else {
            setFormData({
                nome: "",
                descricao: "",
                data_inicio: "",
                data_fim: "",
                valor: "",
                equipamentos: []
            });
        }
    }, [servico]);

    async function carregarEquipamentos() {
        try {
            const response = await equipamentoService.listar();
            setEquipamentos(response.data);
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

    function handleEquipamentoChange(id) {
        setFormData((prevState) => ({
            ...prevState,
            equipamentos: prevState.equipamentos.includes(id)
                ? prevState.equipamentos.filter(item => item !== id)
                : [...prevState.equipamentos, id]
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            ...formData,
            valor: Number(formData.valor)
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
                <label htmlFor="descricao">Descrição</label>

                <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="data_inicio">Data de Início</label>

                <input
                    type="date"
                    id="data_inicio"
                    name="data_inicio"
                    value={formData.data_inicio}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="data_fim">Data de Fim</label>

                <input
                    type="date"
                    id="data_fim"
                    name="data_fim"
                    value={formData.data_fim}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="valor">Valor</label>

                <input
                    type="number"
                    id="valor"
                    name="valor"
                    min="0"
                    step="0.01"
                    value={formData.valor}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Equipamentos</label>

                {equipamentos.map((equipamento) => (
                    <div key={equipamento.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.equipamentos.includes(equipamento.id)}
                                onChange={() => handleEquipamentoChange(equipamento.id)}
                            />

                            {equipamento.nome}
                        </label>
                    </div>
                ))}
            </div>

            <button type="submit">
                {servico ? "Atualizar" : "Cadastrar"}
            </button>

        </form>
    );

}

export default ServicoForm;
