import { useEffect, useState } from "react";
import CidadeService from "../../services/CidadeService";

function FuncionarioForm({
    initialData,
    onSubmit
}) {
    const [cidades, setCidades] = useState([]);

    const [formData, setFormData] =
        useState(
            initialData || {
                nome: "",
                cargo: "",
                telefone: "",
                email: "",
                salario: "",
                cidade_id: ""
            }
        );

    useEffect(() => {
        carregarCidades();
    }, []);

    async function carregarCidades() {
        const response =
            await cidadeService.listar();

        setCidades(response.data);
    }

    function handleChange(event) {
        const { name, value } =
            event.target;

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
                name="cargo"
                placeholder="Cargo"
                value={formData.cargo}
                onChange={handleChange}
            />

            <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="number"
                name="salario"
                placeholder="Salário"
                value={formData.salario}
                onChange={handleChange}
            />

            <select
                name="cidade_id"
                value={formData.cidade_id}
                onChange={handleChange}
            >
                <option value="">
                    Selecione uma cidade
                </option>

                {cidades.map((cidade) => (
                    <option
                        key={cidade.id}
                        value={cidade.id}
                    >
                        {cidade.nome}
                    </option>
                ))}
            </select>

            <button type="submit">
                Salvar
            </button>
        </form>
    );


}

export default FuncionarioForm;
