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

function TopAgentsChart({ data }) {
    if (!data) return <h2>Loading Dashboard...</h2>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Top Booking Agents
                </Typography>

                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="agent" />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#4CAF50" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default TopAgentsChart;
