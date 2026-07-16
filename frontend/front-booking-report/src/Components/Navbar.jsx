import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6">
                    Booking Analytics Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
