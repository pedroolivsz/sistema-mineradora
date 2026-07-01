import { useEffect, useState } from "react";

function CidadeForm({ cidade, onSubmit }) {
    const [formData, setFormData] = useState({
        nome: "",
        estado: "",
        populacao: ""
    });

    useEffect(() => {
        if (cidade) {
            setFormData({
                nome: cidade.nome,
                estado: cidade.estado,
                populacao: cidade.populacao
            });
        } else {
        setFormData({
            nome: "",
            estado: "",
            populacao: ""
        });
    }
    }, [cidade]);

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
            populacao: Number(formData.populacao)
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
                <label htmlFor="estado">Estado</label>

                <input
                    type="text"
                    id="estado"
                    name="estado"
                    maxLength={2}
                    value={formData.estado}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="populacao">População</label>

                <input
                    type="number"
                    id="populacao"
                    name="populacao"
                    min="0"
                    value={formData.populacao}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">
                {cidade ? "Atualizar" : "Cadastrar"}
            </button>

        </form>
    );
}

export default CidadeForm;
