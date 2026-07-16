import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

function RevenueCountryChart({ data }) {
    if (!data || data.length === 0) {
        return <div>Loading data...</div>;
    }
    return (

        <Card sx={{ mt: 4 }}>

            <CardContent>

                <Typography variant="h6" gutterBottom>

                    Revenue by Country

                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="country" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="revenue"
                            fill="#1976d2"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}

export default RevenueCountryChart;