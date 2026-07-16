import api from "../api/axios";

export const uploadCSV = (formData) => {
    return api.post("/bookings/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const getDashboard = () => {
    return api.get("/dashboard/summary");
};

export const getRevenueCountry = () => {
    return api.get("/dashboard/revenue-country");
};

export const getDashboardAgentBookings = () => {
    return api.get("/dashboard/agent-bookings");
};

export const getMonthlyRevenue = () => {
    return api.get("/dashboard/monthly-revenue");
};