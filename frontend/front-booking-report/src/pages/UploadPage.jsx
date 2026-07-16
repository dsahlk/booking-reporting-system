import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Alert,
    CircularProgress
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { uploadCSV } from "../services/bookingService";

function UploadPage() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {

        setFile(e.target.files[0]);

        setError("");

    };

    const handleUpload = async () => {

        if (!file) {

            setError("Please select a CSV file.");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);

            const response = await uploadCSV(formData);

            setResult(response.data);

            setError("");

            setFile(null);

            document.getElementById("csvFile").value = "";

        } catch (err) {

            setError(
                err.response?.data || "Upload failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Card sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>

            <CardContent>

                <Typography
                    variant="h5"
                    gutterBottom
                >

                    Upload Booking CSV

                </Typography>

                <Box mt={3}>

                    <input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                    />

                </Box>

                {file && (

                    <Typography mt={2}>

                        Selected File:
                        <b> {file.name}</b>

                    </Typography>

                )}

                <Box mt={3}>

                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleUpload}
                        disabled={loading}
                    >

                        Upload CSV

                    </Button>

                </Box>

                {loading && (

                    <Box mt={3}>

                        <CircularProgress />

                    </Box>

                )}

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mt: 3 }}
                    >

                        {error}

                    </Alert>

                )}
                
                {result && (

                    <Alert
                        severity={result.failedRows > 0 ? "warning" : "success"}
                        sx={{ mt: 3 }}
                    >

                        <strong>Upload Result</strong>

                        <br />

                        Total Rows : {result.totalRows}

                        <br />

                        Imported : {result.successRows}

                        <br />

                        Failed : {result.failedRows}

                    </Alert>

                )}

            </CardContent>

        </Card>

    );

}

export default UploadPage;