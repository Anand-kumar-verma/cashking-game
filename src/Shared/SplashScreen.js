import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splash_screen from "../assets/banner.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }, []);

  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Box>
        <img src={splash_screen} className="!h-[100vh] !w-[100%]" />
      </Box>
    </Container>
  );
};

export default SplashScreen;
