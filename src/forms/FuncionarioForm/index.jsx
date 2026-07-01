import { useEffect, useState } from "react";

import cidadeService from "../../services/cidadeService";

function FuncionarioForm({ funcionario, onSubmit }) {
    const [formData, setFormData] = useState({
        nome: "",
        cargo: "",
        telefone: "",
        email: "",
        salario: "",
        cidade_id: ""
    });

    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        carregarCidades();
    }, []);

    useEffect(() => {
        if (funcionario) {
            setFormData({
                nome: funcionario.nome,
                cargo: funcionario.cargo,
                telefone: funcionario.telefone,
                email: funcionario.email,
                salario: funcionario.salario,
                cidade_id: funcionario.cidade_id
            });
        } else {
            setFormData({
                nome: "",
                cargo: "",
                telefone: "",
                email: "",
                salario: "",
                cidade_id: ""
            });
        }
    }, [funcionario]);

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
            salario: Number(formData.salario),
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
                <label htmlFor="cargo">Cargo</label>

                <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="telefone">Telefone</label>

                <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="email">E-mail</label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="salario">Salário</label>

                <input
                    type="number"
                    id="salario"
                    name="salario"
                    min="0"
                    step="0.01"
                    value={formData.salario}
                    onChange={handleChange}
                    required
                />
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
                {funcionario ? "Atualizar" : "Cadastrar"}
            </button>

        </form>
    );
}

export default FuncionarioForm;
