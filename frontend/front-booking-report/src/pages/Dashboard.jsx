import { useEffect, useState } from "react";
import { Box, Button, Alert, TextField, Grid } from "@mui/material";
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
    <Box sx={{ width: "100%", minWidth: 0, display: "block" }}>
        <h2>Dashboard</h2>

        <KPICards dashboard={dashboard} />

        <Box 
            sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", md: "row" }, 
                gap: 3, 
                mt: 3,
                width: "100%"
            }}
        >
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <RevenueCountryChart data={countryData} />
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <BookingStatusChart summary={dashboard} />
            </Box>
        </Box>

        <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            gap: 3, mt: 3, 
            width: "100%" 
            }}
            >
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <MonthlyRevenueChart data={monthlyRevenueData} />
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <TopAgentsChart data={agentData} />
            </Box>
        </Box>

        <Box 
            sx={{ 
                mt: 5, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: 2,
                maxWidth: "700px",
                mx: "auto" 
            }}
        >
            <TextField 
                fullWidth 
                label="Recipient Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
  
            <Button 
                variant="contained" 
                color="success" 
                size="large" 
                startIcon={<PictureAsPdfIcon />} 
                onClick={handleSummaryReport} 
                disabled={sending}
                sx={{ 
                    height: "56px",
                    minWidth: "340px",
                    whiteSpace: "nowrap",
                    flexShrink: 0
                }}
            >
                {sending ? "Generating..." : "Generate Summary Report"}
            </Button>
        </Box>
    </Box>
);

}

export default Dashboard;
