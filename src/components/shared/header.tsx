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
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import React from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import * as jwt from "jsonwebtoken";
import { GetByNameOrEmail } from "@/redux/usersSchema/profile/action/actionReducer";

const Header = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [haveToken, setHaveToken] = useState<CookieValueTypes>("");
  const [name, setName] = useState("");
  const token = getCookie("token");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let { users, refresh } = useSelector(
    (state: any) => state.userProfileReducers
  );

  useEffect(() => {
    setHaveToken(token);
    if (typeof haveToken === "string") {
      const decodedToken = jwt.decode(haveToken);
      if (typeof decodedToken === "object" && decodedToken?.aud) {
        const nameValue = decodedToken.aud as string;
        setName(nameValue);
      }
    }

    if (name) {
      dispatch(GetByNameOrEmail(name));
    }
  }, [token, name, refresh]);

  const handleLogout = () => {
    deleteCookie("token");
    setHaveToken("");
    setAnchorEl(null);
    router.push("/signin");
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
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {users.user_name}
                  </Avatar>
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
                <LockIcon /> Change Passowrd
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleLogout}>
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
