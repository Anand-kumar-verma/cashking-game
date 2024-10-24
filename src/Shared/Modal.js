import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../services/urls";
import { bgdarkgray, bggold, bgtan } from "./color";

function MyModal() {
  const [open, setOpen] = useState(false);
  const client = useQueryClient();
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const user_id = login_data && JSON.parse(login_data)?.UserID;
  const Status = async () => {
    try {
      const reqBody = {
        user_id: user_id,
      };
      const response = await axios.post(`${endpoint.status_popup}`, reqBody);
      client.refetchQueries("yesterday_income");
      toast(response?.data?.msg);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fcc"
        style={{ background: "000000c7" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            width: 300,
            bgcolor: bgdarkgray,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ background: "#F2413B", padding: 1, textAlign: "center" }}>
            <Typography id="modal-title" className="w fp15 fw500">
              Extra first deposit bonus
            </Typography>
            <Typography id="modal-title" className="w fp13 fw400">
              Each account can only receive rewards once
            </Typography>
          </Box>
          <Box
            sx={{
              background: bgdarkgray,
              textAlign: "start",
              maxHeight: "52vh",
              overflowY: "scroll",
            }}
          >
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography className=" fp14 fw500" style={{ color: 'black' }}>
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      200000
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹10,000.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 200000 for the first time and you will receive 10000
                  bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/200000
                  </Typography>
                  <Button className="bnt" variant="outlined" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      100000
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹5,000.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 100000 for the first time and you will receive 5000
                  bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/100000
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      30000
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹2,000.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 30000 for the first time and you will receive 2000
                  bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/30000
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      10000
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹600.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 10000 for the first time and you will receive 600
                  bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/10000
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      3000
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹300.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 3000 for the first time and you will receive 300 bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/3000
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      1000
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹150.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 1000 for the first time and you will receive 150 bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/1000
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      300
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹60.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 300 for the first time and you will receive 60 bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/300
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className="w95 w"
              sx={{ p: 1, background: "#fff", borderRadius: "7px", my: 1 }}
            >
              <Box className="">
                <Box className="fcsb w">
                  <Typography sx={{ color: 'black' }} className=" fp14 fw500">
                    First deposit
                    <span className=" fp13 fw400" style={{ color: '#feaa57' }}>
                      100
                    </span>{" "}
                  </Typography>
                  <Typography className=" fp13" sx={{ color: '#feaa57' }}>
                    + ₹20.00
                  </Typography>
                </Box>
                <Typography
                  className=" fp13"
                  my={1}
                  sx={{ lineHeight: "15px", color: 'black' }}
                >
                  Deposit 100 for the first time and you will receive 20 bonus
                </Typography>
                <Box
                  className="fcsb"
                  onClick={() => navigate("/wallet/Recharge")}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      width: "60%",
                      background: '#b8b8b8',
                      borderRadius: "10px",
                      m: 0,
                      p: 0,
                      textTransform: "capitalize !important",
                    }}
                    className="w fp13 fw400"
                  >
                    0/100
                  </Typography>
                  <Button variant="outlined" className="bnt" sx={{ m: 0, p: "0px 8px" }}>
                    {" "}
                    Deposit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 1, position: "relative" }}>
            <Box sx={{ mt: 1 }} className="w95 fcsb">
              <FormControlLabel
                classname="aghy"
                sx={{ m: 0, width: "20px" }}
                label=""
                control={
                  <Checkbox
                    onClick={Status}
                    sx={{ color: '#feaa57' }}
                    value=""
                    color="primary"
                  />
                }
              />
              <Typography variant="body1" className=" fp13 " sx={{ color: 'black' }}>
                No more reminders today
              </Typography>
              <Button
                variant="contained"
                sx={{
                  m: 0,
                  p: "0px 8px",
                  borderRadius: "50px",
                  color: bgtan,
                  textTransform: "capitalize !important",
                }}
              >
                Activity
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 1 }} className="w95 fcc">
            <Button
              onClick={handleClose}
              sx={{
                pt: 0,
                "&>svg": {
                  border: "1px solid #FFC107",
                  borderRadius: "50px",
                  padding: "1px",
                  width: "25px",
                  height: "25px",
                },
              }}
            >
              <Close />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div >
  );
}

export default MyModal;
