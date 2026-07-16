import { useEffect, useState } from "react";
import { Box, Button, Alert, TextField  } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getDashboard, getRevenueCountry, getMonthlyRevenue, getDashboardAgentBookings } from "../services/bookingService";
import { summaryReport } from "../services/emailService";

import KPICards from "../components/KPICards";
import RevenueCountryChart from "../components/RevenueCountryChart";
import BookingStatusChart from "../components/BookingStatusChart";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import TopAgentsChart from "../components/TopAgentsChart";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [monthlyRevenueData, setMonthlyRevenueData] = useState(null);
    const [agentData, setAgentData] = useState(null);

    const [reportMessage, setReportMessage] = useState("");
    const [reportError, setReportError] = useState("");
    const [sending, setSending] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();
            const countryRes = await getRevenueCountry();
            const revenueRes = await getMonthlyRevenue();
            const agentRes = await getDashboardAgentBookings();

            console.log(response.data);

            setDashboard(response.data);
            setCountryData(countryRes.data);
            setMonthlyRevenueData(revenueRes.data);
            setAgentData(agentRes.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSummaryReport = async () => {

        if (!email.trim()) {
            setReportError("Please enter an email address.");
            return;
        }

        try {

            setSending(true);
            setReportError("");
            setReportMessage("");

            const response = await summaryReport(email);

            setReportMessage(response.data);

        } catch (error) {

            setReportError(
                error.response?.data || "Failed to generate report."
            );

        } finally {

            setSending(false);

        }

    };

    return (

        <div>

            <h2>Dashboard</h2>

            <KPICards dashboard={dashboard} />

            <RevenueCountryChart data={countryData} />

            <BookingStatusChart summary={dashboard} />

            <MonthlyRevenueChart data={monthlyRevenueData} />

            <TopAgentsChart data={agentData} />

            <TextField
                fullWidth
                label="Recipient Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "center"
                }}
            >

                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleSummaryReport}
                    disabled={sending}
                >

                    {sending ? "Generating..." : "Generate Summary Report"}

                </Button>

            </Box>

        </div>

    );

}

export default Dashboard;