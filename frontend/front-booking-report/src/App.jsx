import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";

function App() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />

            <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }}>
                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        marginTop: "84px", 
                        width: "100%",      
                        minWidth: 0,        
                        overflowX: "hidden"
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/upload" element={<UploadPage />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
