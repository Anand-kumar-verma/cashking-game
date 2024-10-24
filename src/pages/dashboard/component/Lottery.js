import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import avaitorcategory3 from "../../../assets/images/avv.png";
import lotteryimg from "../../../assets/images/lottery.png";
import lotterycategory1 from "../../../assets/images/lotterycategory1.png";
import profile from "../../../assets/avatar-ea3b8ee9.png";
import win from "../../../assets/images/win.png";
import win3 from "../../../assets/images/win3.png";
import { endpoint } from "../../../services/urls";

function Lottery() {
  const [status, setStatus] = useState(false);

  const getStatus = async () => {
    try {
      const res = await axios.get(endpoint.withdrawl_status);
      setStatus(res?.data?.earning);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <Box sx={{ px: "15px" }}>
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
        <Box component="img" src={lotteryimg} width={25}></Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{ ml: 1, fontSize: "15px", fontWeight: 600 }}
        >
          Lottery
        </Typography>
      </Stack>
      <NavLink to={String(status?.wingo_status) !== "0" && "/win"}>
        <Box sx={style.winbox}>
          <Box
            component="img"
            src={win}
            sx={{ width: "100%", height: "70%" }}
          ></Box>
          <Box sx={style.positiongame}>
            <Typography variant="body1" color="initial" sx={style.gameheading}>
              Win Go{" "}
            </Typography>
            <Box sx={{ mt: "15px" }}>
              <Typography variant="body1" color="initial">
                Guess Number
              </Typography>
              <Typography variant="body1" color="initial ">
                Green/Red/Purple to win
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
            <Box
              component="img"
              src={lotterycategory1}
              sx={{ width: "100px" }}
            ></Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: '8px', }}>
            <Stack direction='row' alignItems='center'>
              <Box
                component="img"
                src={profile}
                sx={{ width: "35px", mr: 2 }}
              ></Box>
              <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600' }}>
                MemberNWLVWBRN
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600' }}>
              Winning amount882.00
            </Typography>
          </Box>
        </Box>
      </NavLink>
      <NavLink to={String(status?.aviator_status) !== "0" && "/playgame"}>
        <Box sx={style.winbox}>
          <Box
            component="img"
            src={win3}
            sx={{ width: "100%", height: "70%" }}
          ></Box>
          <Box sx={style.positiongame}>
            <Typography variant="body1" color="initial" sx={style.gameheading}>
              Aviator{" "}
            </Typography>
            <Box sx={{ mt: "15px" }}>
              <Typography variant="body1" color="initial">
                {/* Guess Number */}
                Play & Earn
              </Typography>
              <Typography variant="body1" color="initial ">
                {/* Big/Small/Odd/Even */}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
            <Box
              component="img"
              className=" !rounded-full"
              src={avaitorcategory3}
              sx={{ width: "100px" }}
            ></Box>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: '8px', }}>
            <Stack direction='row' alignItems='center'>
              <Box
                component="img"
                src={profile}
                sx={{ width: "35px", mr: 2 }}
              ></Box>
              <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600' }}>
                MemberNWLVWBRN
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600' }}>
              Winning amount882.00
            </Typography>
          </Box>
        </Box>
      </NavLink>

    </Box>
  );
}

export default Lottery;

const style = {
  winbox: {
    background: "#f1f1f1",
    borderRadius: "20px",
    height: "160px",
    marginBottom: "30px",
    position: "relative",
    boxShadow: "0 0.05333rem 0.10667rem #c5c5da42",
  },
  positiongame: {
    position: "absolute",
    top: "10px",
    left: "20px",
    "&>div>p": { fontSize: "12px", fontWeight: 400, color: "white" },
  },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "white" },
};
