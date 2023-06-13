<<<<<<< HEAD
<<<<<<< HEAD
import Image from "next/image";
import logo from "../../../public/logo3.png";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import React from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white w-full justify-between z-30 fixed">
      <div className="grid-cols-2 flex h-14 mt-2">
        <div className="items-start ml-7">
          <Image
            src={logo}
            alt="profile picture"
            width={180} // Ubah sesuai kebutuhan Anda
            height={80} // Sesuaikan dengan lebar gambar
          />
        </div>
        <div className="items-end justify-end ml-auto mr-9 ">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        </div>
      </div>
      <Divider variant="fullWidth" className="mt-1" />
      {/* <Breadcrumbs aria-label="breadcrumb" className="md:ml-8  mb-2 mt-4">
        {pathObjects.length < 3 ? (
          <div>
            <HomeIcon fontSize="small" className="-mt-1 mr-1"/>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
          </div>
        ) : null}
        {(pathObjects || []).map((mn: any) => (
          <Link underline="hover" color="inherit" href={mn.path}>
            {mn.route}
          </Link>
        ))}
      </Breadcrumbs> */}
    </div>
  );
};

export default Header;
=======
import Image from "next/image";
import logo from "../../../public/logo3.png";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import React from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white w-full justify-between z-30 fixed">
      <div className="grid-cols-2 flex h-14 mt-2">
        <div className="items-start ml-7">
          <Image
            src={logo}
            alt="profile picture"
            width={180} // Ubah sesuai kebutuhan Anda
            height={80} // Sesuaikan dengan lebar gambar
          />
        </div>
        <div className="items-end justify-end ml-auto mr-9 ">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        </div>
      </div>
      <Divider variant="fullWidth" className="mt-1" />
      {/* <Breadcrumbs aria-label="breadcrumb" className="md:ml-8  mb-2 mt-4">
        {pathObjects.length < 3 ? (
          <div>
            <HomeIcon fontSize="small" className="-mt-1 mr-1"/>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
          </div>
        ) : null}
        {(pathObjects || []).map((mn: any) => (
          <Link underline="hover" color="inherit" href={mn.path}>
            {mn.route}
          </Link>
        ))}
      </Breadcrumbs> */}
    </div>
  );
};

export default Header;
>>>>>>> Aji-Bootcamp
=======
import Image from "next/image";
import logo from "../../../public/logo3.png";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import React from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white w-full justify-between z-30 fixed">
      <div className="grid-cols-2 flex h-14 mt-2">
        <div className="items-start ml-7">
          <Image
            src={logo}
            alt="profile picture"
            width={180} // Ubah sesuai kebutuhan Anda
            height={80} // Sesuaikan dengan lebar gambar
          />
        </div>
        <div className="items-end justify-end ml-auto mr-9 ">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        </div>
      </div>
      <Divider variant="fullWidth" className="mt-1" />
      {/* <Breadcrumbs aria-label="breadcrumb" className="md:ml-8  mb-2 mt-4">
        {pathObjects.length < 3 ? (
          <div>
            <HomeIcon fontSize="small" className="-mt-1 mr-1"/>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
          </div>
        ) : null}
        {(pathObjects || []).map((mn: any) => (
          <Link underline="hover" color="inherit" href={mn.path}>
            {mn.route}
          </Link>
        ))}
      </Breadcrumbs> */}
    </div>
  );
};

export default Header;
>>>>>>> Ikhsan-Bootcamp
