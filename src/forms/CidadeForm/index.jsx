import { useState } from "react";

function CidadeForm({
    initialData = {
        nome: "",
        estado: "",
        populacao: ""
    },
    onSubmit
}) {
    const [formData, setFormData] =
        useState(initialData);


    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
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

            <input
                type="text"
                name="estado"
                placeholder="Estado"
                value={formData.estado}
                onChange={handleChange}
            />

            <input
                type="number"
                name="populacao"
                placeholder="População"
                value={formData.populacao}
                onChange={handleChange}
            />

            <button type="submit">
                Salvar
            </button>
        </form>
    );

}

export default CidadeForm;
