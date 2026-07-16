import {
    Card,
    CardContent,
    Typography,
    Grid
} from "@mui/material";

function KPICards({ dashboard }) {

    if (!dashboard) return <h2>Loading Dashboard...</h2>;

    const cards = [
        {
            title: "Total Bookings",
            value: dashboard.totalBookings
        },
        {
            title: "Total Revenue",
            value: `$${dashboard.totalRevenue?.toLocaleString()}`
        },
        {
            title: "Cancelled",
            value: dashboard.cancelled
        },
        {
            title: "Confirmed",
            value: dashboard.confirmed
        }
    ];

    return (

        <Grid container spacing={3}>

            {cards.map((card, index) => (

                <Grid item xs={12} sm={6} md={3} key={index}>

                    <Card elevation={4}>

                        <CardContent>

                            <Typography
                                color="text.secondary"
                                gutterBottom
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                            >
                                {card.value}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}

export default KPICards;