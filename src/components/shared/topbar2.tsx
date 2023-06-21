import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
  alpha,
  styled,
} from "@mui/material";
import React, { useState, MouseEvent, Fragment } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../../../public/logo3.png";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import Image from "next/image";
import MultiMenu from "@/pages/app/coba";

const Topbar2 = () => {
  const [token, setToken]: any = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="fixed z-10 ">
      <div className="fixed w-full h-16 ">
        <div className="bg-red-400 w-full p-4 flex">
          <div className="w-fit text-black flex">
            <Image
              src={logo}
              alt=""
              className="w-10 h-10 py-2 rounded-full bg-white"
            />
            <div className="mt-1 text-xl font-semibold">
              <h1>Code Academy</h1>
            </div>
          </div>
              <MultiMenu/>
          {/* <div className="mt-1 ml-4 w-96">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <Fragment> 
                  <Button
                    variant="text"
                    {...bindTrigger(popupState)}
                    // className="bg-blue-600"
                  >
                    Program
                    <KeyboardArrowDownIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                 </Fragment>
              )}
            </PopupState>
            |
          </div> */}
          {/* <div className="mt-1 ml-4">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <Fragment>
                  <Button
                    variant="text"
                    {...bindTrigger(popupState)}
                    // className="bg-blue-600"
                  >
                    Online Course
                    <KeyboardArrowDownIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </Fragment>
              )}
            </PopupState>
            |
          </div>
          <div className="mt-1 ml-4">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <Fragment>
                  <Button
                    variant="text"
                    {...bindTrigger(popupState)}
                    // className="bg-blue-600"
                  >
                    Job Hiring
                    <KeyboardArrowDownIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </Fragment>
              )}
            </PopupState>
            |
          </div>
          <div className="mt-1 ml-4">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <Fragment>
                  <Button
                    variant="text"
                    {...bindTrigger(popupState)}
                    // className="bg-blue-600"
                  >
                    About
                    <KeyboardArrowDownIcon />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </Fragment>
              )}
            </PopupState>
            |
          </div> */}
          <div className="ml-auto ">
            {token ? (
              <Fragment>
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
                      <Avatar sx={{ width: 42, height: 42 }} className="-mt-1 ">
                        <Image
                          src={logo}
                          alt="profile picture"
                          className="w-full h-full p-1 bg-gray-200"
                        />
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
              </Fragment>
            ) : (
              <div className="mt-2">
                <Link href={"./"} className="mr-1">
                  Sign Up
                </Link>
                |
                <Link href={"./"} className="ml-1">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="fixed bg-red-900 w-full h-10">
    //   topbar
    // </div>
  );
};

export default Topbar2;
