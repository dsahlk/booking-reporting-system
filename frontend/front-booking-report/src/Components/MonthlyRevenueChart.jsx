import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

function MonthlyRevenueChart({ data }) {

    if (!data) return <h2>Loading Dashboard...</h2>;

    return (

        <Card sx={{ mt: 4 }}>

            <CardContent>

                <Typography variant="h6">

                    Monthly Revenue

                </Typography>

                <ResponsiveContainer width="100%" height={350}>

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#1976d2"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}

export default MonthlyRevenueChart;