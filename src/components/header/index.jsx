import { useLocation } from "react-router-dom";
import "./style.css"

function Header() {
    const location = useLocation();

    const pageTitles = {
        "/": "Home",
        "/cidades": "Cidades",
        "/funcionarios": "Funcionários",
        "/equipamentos": "Equipamentos",
        "/servicos": "Serviços"
    };

    const pageTitle = pageTitles[location.pathname] || "Sistema de Gestão para Mineração";

    return (
        <header className="header">
            <h1>{pageTitle}</h1>
            <span>Sistema de Gestão para Mineração</span>
        </header>
    )
}

export default Header;