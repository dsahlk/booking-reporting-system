import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";

function App() {

    return (

        <>

            <Navbar />

            <Box sx={{ display: "flex" }}>

                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        marginLeft: "220px",
                        marginTop: "20px"
                    }}
                >

                    <Routes>

                        <Route path="/" element={<Dashboard />} />

                        <Route
                            path="/upload"
                            element={<UploadPage />}
                        />

                    </Routes>

                </Box>

            </Box>

        </>

    );

}

export default App;