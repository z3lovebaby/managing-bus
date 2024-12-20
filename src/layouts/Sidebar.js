import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PeopleIcon from "@mui/icons-material/People";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Sidebar = ({ drawerOpen, toggleDrawer, role }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          position: "relative",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
        sx={{ paddingTop: "64px" }}
      >
        <List>
          {/* Dashboard */}
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={t("Map")} />
          </ListItem>

          {/* Role-specific Items */}
          {role === "manager" && (
            <>
              {/* Users Menu */}
              <ListItem button component={Link} to="/manager/user-list">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={t("Danh sách user")} />
              </ListItem>

              {/* Drivers Menu */}
              <ListItem button component={Link} to="/manager/driver-list">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={t("Danh sách tài xế")} />
              </ListItem>

              {/* Xe */}
              <ListItem button component={Link} to="/manager/bus">
                <ListItemIcon>
                  <DirectionsBusIcon />
                </ListItemIcon>
                <ListItemText primary={t("Quản lý xe")} />
              </ListItem>

              {/* Tuyen */}
              <ListItem button component={Link} to="/manager/route">
                <ListItemIcon>
                  <AltRouteIcon />
                </ListItemIcon>
                <ListItemText primary={t("Quản lý tuyến đường")} />
              </ListItem>
            </>
          )}

          {role === "user" && (
            <>
              {/* View Users */}
              <ListItem button component={Link} to="/users/list">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={t("View Users")} />
              </ListItem>
            </>
          )}

          {/* Logout */}
          <ListItem button component={Link} to="/logout">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t("Logout")} />
          </ListItem>
        </List>

        {/* Language Switcher */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            onClick={() => changeLanguage("vi")}
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                alt="Vietnamese"
                style={{ width: "24px" }}
              />
            }
            variant="contained"
            color="success"
            sx={{ mx: 1 }}
          >
            {t("Tiếng Việt")}
          </Button>
          <Button
            onClick={() => changeLanguage("en")}
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                alt="English"
                style={{ width: "24px" }}
              />
            }
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
          >
            {t("English")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
