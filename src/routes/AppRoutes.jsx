import { Routes, Route } from "react-router-dom";

import Home from "../pages/home"
import Cidades from "../pages/cidades"
import Equipamentos from "../pages/equipamentos"
import Funcionarios from "../pages/funcionarios"
import Servicos from "../pages/servicos"

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                } 
            />

            <Route 
                path="/cidades" 
                element={
                    <MainLayout>
                        <Cidades />
                    </MainLayout>
                } 
            />
            <Route 
                path="/equipamentos" 
                element={
                    <MainLayout>
                        <Equipamentos />
                    </MainLayout>
                } 
            />
            <Route
                path="/funcionarios"
                element={
                    <MainLayout>
                        <Funcionarios />
                    </MainLayout>
                } 
            />
            <Route 
                path="/servicos" 
                element={
                    <MainLayout>
                        <Servicos />
                    </MainLayout>
                } 
            />
        </Routes>
    );
}

export default AppRoutes;