import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import UsersList from "../users/UsersList";
import "../Dash.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";

export default function Products() {
  const username = useAppStore((state) => state.username);
  const password = useAppStore((state) => state.password);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     username == "animess.food@gmail.com" &&
  //     password == "animess.food@gmail.com"
  //   ) {
  //     console.log("Login Successful!");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <UsersList />
          </Box>
        </Box>
      </div>
    </>
  );
}
