import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import dashboardService from "../../services/DashboardService";
import "./style.css"

// 1. Subcomponente para os Cards (Pode ser movido para um arquivo próprio depois)
function DashboardCard({ title, value, isLoading }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            {isLoading ? (
                <div className="skeleton-loading">...</div> // Estilize um placeholder em CSS
            ) : (
                <span className="card-value">{value}</span>
            )}
        </div>
    );
}

function Home() {
    const [resumo, setResumo] = useState({
        totalCidades: 0,
        totalFuncionarios: 0,
        totalEquipamentos: 0,
        totalServicos: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // 2. Usando useCallback para evitar recriação da função em cada render
    const carregarResumo = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await dashboardService.carregarResumo();
            setResumo(response.data);
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao carregar os dados do dashboard.";
            
            Swal.fire({
                title: "Erro!",
                text: mensajeErro,
                icon: "error",
                confirmButtonText: "Tentar novamente"
            });
        } finally {
            setIsLoading(false); // Garante que o loading desativa independente de sucesso ou erro
        }
    }, []);

    useEffect(() => {
        carregarResumo();
    }, [carregarResumo]);

    // 3. Mapeamento dos dados para evitar repetição de JSX
    const cardItems = [
        { key: "cidades", title: "Cidades", value: resumo.totalCidades },
        { key: "funcionarios", title: "Funcionários", value: resumo.totalFuncionarios },
        { key: "equipamentos", title: "Equipamentos", value: resumo.totalEquipamentos },
        { key: "servicos", title: "Serviços", value: resumo.totalServicos },
    ];

    return (
        <main className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button 
                    onClick={carregarResumo} 
                    className="btn-refresh"
                    disabled={isLoading}
                >
                    {isLoading ? "Atualizando..." : "Atualizar Dados"}
                </button>
            </header>

            <div className="cards-grid">
                {cardItems.map((item) => (
                    <DashboardCard
                        key={item.key}
                        title={item.title}
                        value={item.value}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </main>
    );
}

export default Home;