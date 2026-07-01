import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import dashboardService from "../../services/DashboardService";

function Home() {

    const [resumo, setResumo] = useState({
        totalCidades: 0,
        totalFuncionarios: 0,
        totalEquipamentos: 0,
        totalServicos: 0
    });

    useEffect(() => {
        carregarResumo();
    }, []);

    async function carregarResumo() {
        try {
            const response = await dashboardService.carregarResumo();

            setResumo(response.data);

        } catch (error) {
            Swal.fire(
                "Erro",
                error.response?.data?.message ||
                "Erro ao carregar dashboard.",
                "error"
            );
        }
    }

    return (
        <div>

            <h1>Dashboard</h1>

            <div className="cards">

                <div className="card">
                    <h3>Cidades</h3>
                    <h1>{resumo.totalCidades}</h1>
                </div>

                <div className="card">
                    <h3>Funcionários</h3>
                    <h1>{resumo.totalFuncionarios}</h1>
                </div>

                <div className="card">
                    <h3>Equipamentos</h3>
                    <h1>{resumo.totalEquipamentos}</h1>
                </div>

                <div className="card">
                    <h3>Serviços</h3>
                    <h1>{resumo.totalServicos}</h1>
                </div>

            </div>

        </div>
    );
}

export default Home;