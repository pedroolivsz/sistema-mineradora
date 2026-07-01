import api from "./api";

const DashboardService = {

    async carregarResumo() {
        const response = await api.get("/dashboard");
        return response.data;
    }

};

export default DashboardService;
