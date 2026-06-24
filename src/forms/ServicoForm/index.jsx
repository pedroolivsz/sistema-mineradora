import { useEffect, useState } from "react";

import equipamentoService from "../../services/EquipamentoService";

function ServicoForm({
    initialData,
    onSubmit
}) {
    const [equipamentos,
        setEquipamentos] =
        useState([]);

    const [formData, setFormData] =
        useState(
            initialData || {
                nome: "",
                descricao: "",
                data_inicio: "",
                data_fim: "",
                valor: "",
                equipamentos: []
            }
        );

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    async function carregarEquipamentos() {
        try {
            const response =
                await equipamentoService.listar();

            setEquipamentos(
                response.data
            );
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {
        const { name, value } =
            event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleEquipamentos(
        event
    ) {
        const selecionados =
            Array.from(
                event.target.selectedOptions
            ).map(
                (option) =>
                    Number(option.value)
            );

        setFormData({
            ...formData,
            equipamentos:
                selecionados
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
            />

            <textarea
                name="descricao"
                placeholder="Descrição"
                value={formData.descricao}
                onChange={handleChange}
            />

            <input
                type="date"
                name="data_inicio"
                value={
                    formData.data_inicio
                }
                onChange={handleChange}
            />

            <input
                type="date"
                name="data_fim"
                value={
                    formData.data_fim
                }
                onChange={handleChange}
            />

            <input
                type="number"
                step="0.01"
                name="valor"
                placeholder="Valor"
                value={formData.valor}
                onChange={handleChange}
            />

            <select
                multiple
                value={
                    formData.equipamentos
                }
                onChange={
                    handleEquipamentos
                }
            >
                {equipamentos.map(
                    (equipamento) => (
                        <option
                            key={
                                equipamento.id
                            }
                            value={
                                equipamento.id
                            }
                        >
                            {
                                equipamento.nome
                            }
                        </option>
                    )
                )}
            </select>

            <button type="submit">
                Salvar
            </button>
        </form>
    );
}

export default ServicoForm;