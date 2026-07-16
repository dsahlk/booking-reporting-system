import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const drawerWidth = 220;

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0, // Informs flexbox not to crush the navigation sidebar pane
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    marginTop: "64px" // Sits directly below your header height
                }
            }}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <DashboardIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/upload">
                        <UploadFileIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Upload CSV" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default Sidebar;
