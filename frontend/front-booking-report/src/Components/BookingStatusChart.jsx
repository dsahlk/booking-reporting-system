import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";

const COLORS = ["#4CAF50", "#F44336"];

function BookingStatusChart({ summary }) {
    if (!summary) return <h2>Loading page...</h2>;

    const data = [
        { name: "Confirmed", value: summary.confirmed },
        { name: "Cancelled", value: summary.cancelled }
    ];

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Booking Status
                </Typography>

                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100} 
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default BookingStatusChart;
