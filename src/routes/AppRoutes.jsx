import { Routes, Route } from "react-router-dom";

import Home from "../pages/home"
import Cidades from "../pages/cidades"
import Equipamentos from "../pages/equipamentos"
import Funcionarios from "../pages/funcionarios"
import Servicos from "../pages/servicos"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Cidades />} />
            <Route path="/" element={<Equipamentos />} />
            <Route path="/" element={<Funcionarios />} />
            <Route path="/" element={<Servicos />} />
        </Routes>
    )
}

export default AppRoutes;