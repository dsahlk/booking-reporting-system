import api from "../api/axios";

export const summaryReport = (to) => {
    return api.post("/email/report",{
        to: to
    });
};
