import { Card, CardContent, Typography, Box } from "@mui/material";

function KPICards({ dashboard }) {
  if (!dashboard) return <h2>Loading Dashboard...</h2>;

  const cards = [
    {
      title: "Total Bookings",
      value: dashboard.totalBookings,
      color: "#1976d2"
    },
    {
      title: "Total Revenue",
      value: `$${dashboard.totalRevenue?.toLocaleString()}`,
      color: "#2e7d32"
    },
    {
      title: "Cancelled",
      value: dashboard.cancelled,
      color: "#d32f2f"
    },
    {
      title: "Confirmed",
      value: dashboard.confirmed,
      color: "#ed6c02"
    }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap",
        gap: 3,
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          elevation={4}
          sx={{
            height: 140,
            flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 24px)", md: "1 1 calc(25% - 24px)" },
            borderRadius: 3,
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 8,
            },
          }}
        >
          <CardContent sx={{ width: "100%" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 700 }}
            >
              {card.title}
            </Typography>

            <Box
              sx={{
                width: 50,
                height: 4,
                bgcolor: card.color,
                borderRadius: 5,
                mb: 1.5,
              }}
            />

            <Typography variant="h4" fontWeight="bold">
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default KPICards;
