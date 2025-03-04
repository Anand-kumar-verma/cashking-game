import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  DialogContentText,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slide from "@mui/material/Slide";
import axios from "axios";
import CryptoJS from "crypto-js";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgtext } from "../../../Shared/color";
import { endpoint } from "../../../services/urls";
import Policy from "./policy/Policy";
import { flexbetween } from "../../../Shared/Commom";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});


const ApplyBetDialogBox = ({
  apply_bit_dialog_box,
  setapply_bit_dialog_box,
  type,
  gid,
  random,
  net_wallet_amount,
}) => {
  const [value, setValue] = useState(random || 1);
  const [Rules, setRules] = useState(false);
  const [loding, setLoding] = useState(false);

  const client = useQueryClient();
  const login_data =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  // const login_data_ = localStorage.getItem("aviator_data");

  const user_id = login_data && JSON.parse(login_data)?.UserID;

  // React.useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);
  const [activeButton, setActiveButton] = useState(1);
  const handleClickValue = (value) => {
    if (value === 0) {
      return setValue(1);
    }
    setValue(value);
    setActiveButton(value);
  };

  const handleClickOpenRules = () => {
    setRules(true);
  };
  const handleCloseRules = () => {
    setRules(false);
  };

  async function betFunctionStart() {
    setLoding(true);
    console.log("FUnction called apply bit");
    const reqBody = {
      userid: user_id,
      amount: value | 0,
      number:
        (type === "green" && 10) ||
        (type === "red" && 30) ||
        (type === "voilet" && 20) ||
        (type === "big" && 40) ||
        (type === "small" && 50) ||
        type,
      gameid: Number(gid),
    };
    if (
      reqBody.amount >
      Number(
        Number(net_wallet_amount?.wallet) + Number(net_wallet_amount?.winning)
      )
    ) {
      setLoding(false);
      return toast("Your Wallet Amount is low.");
    }
    try {
      const response = await axios.post(`${endpoint.applybet}`, reqBody);
      if (response?.data?.error === "200") {
        toast.success(response?.data?.msg);
        setapply_bit_dialog_box(false);
        localStorage.setItem("betApplied", `${gid}_true`);
      } else {
        toast(response?.data?.msg);
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }

    client.refetchQueries(`myAllhistory_${gid}`);
    client.refetchQueries("walletamount");
    setLoding(false);
  }

  const [activeMultiplier, setActiveMultiplier] = useState(1);

  const handleMultiplierClick = (multiplier) => {
    setActiveMultiplier(multiplier);
    handleClickValue(multiplier);
  };


  return (
    <Drawer
      anchor="bottom"
      open={apply_bit_dialog_box}
      TransitionComponent={Slide}
      keepMountedonClose={() => setapply_bit_dialog_box(false)}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#ffffff",
          maxWidth: "400px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
          borderRadius: "15px 15px 0 0",
        },
      }}
    >
      <Box sx={{ width: '100%', height: '105px', position: "relative", overflow: 'hidden', }}>
        <Box sx={{
          position: 'absolute',
          width: '100%', height: '200px',
          clipPath: 'polygon(100% 0, 100% 33%, 50% 49%, 0 33%, 0 0)',
          background:
            type === 0
              ? "linear-gradient(145deg, rgba(251, 91, 91, 1) 50%, rgba(200, 110, 255, 1) 50%)"
              : type === 5
                ? "linear-gradient(145deg, rgba(24, 182, 96, 1) 50%, rgba(200, 110, 255, 1) 50%)"
                : "",
          top: 0,
        }}
          className={`${((type === "green" ||
            type === 1 ||
            type === 3 ||
            type === 7 ||
            type === 9) &&
            "!bg-[#18B660]") ||
            ((type === "red" ||
              type === 2 ||
              type === 6 ||
              type === 4 ||
              type === 8) &&
              "!bg-[#FB5B5B]") ||
            ((type === "voilet") &&
              "!bg-[#C86EFF]") ||
            (type === "small" && "!bg-[#6EA8F4]") ||
            (type === "big" && "!bg-[#FBB13B]")
            } 
             `}
        >
          <Typography variant="body1" sx={{ textAlign: 'center', pt: 2, pb: '5px', fontSize: '16px', fontWeight: '600', color: 'white' }}>Win Go 3Min</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', py: '2px', fontSize: '12px', fontWeight: '500', color: 'black', width: '80%', ml: '10%', borderRadius: '5px', background: 'white', }}>Select &nbsp; &nbsp;&nbsp;&nbsp;
            {(type === "green" && " Green") ||
              (type === "voilet" && " Voilet") ||
              (type === "red" && " Red") ||
              type}
          </Typography>
        </Box>
      </Box>
      <Box >

        <Box className="dialogsmallbat">
          <Box sx={{ ...flexbetween }}>
            <Typography variant="body1" sx={{ color: zubgtext, width: '30%', fontSize: '15px', fontWeight: '500' }}>
              Balance
            </Typography>
            <Box sx={{ width: '70%' }}
              className={` addbtnbox  `}
            >
              {[1, 10, 100, 1000].map((i) => {
                const isActive = activeButton === i;
                return (
                  <Button
                    key={i} // Add key for list items
                    onClick={() => handleClickValue(i)}
                    sx={{
                      border: isActive ? '1px solid black' : 'none',
                      backgroundColor: isActive
                        ? (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                          ? "#18B660"
                          : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                            ? "#FB5B5B"
                            : (type === "voilet" || type === 0 || type === 5)
                              ? "#C86EFF"
                              : (type === "small")
                                ? "#6EA8F4"
                                : (type === "big")
                                && "#FEAA57"
                        : "transparent",
                      color: isActive ? 'white' : 'black !important',

                      '&:hover': {
                        backgroundColor: isActive
                          ? (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                            ? "#18B660"
                            : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                              ? "#FB5B5B"
                              : (type === "voilet" || type === 0 || type === 5)
                                ? "#C86EFF"
                                : (type === "small")
                                  ? "#6EA8F4"
                                  : (type === "big")
                                  && "#FEAA57"
                          : "transparent"
                      },
                    }}
                  >
                    {i}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box sx={{ ...flexbetween, width: '95%', ml: '2.5%', }}>
          <Typography variant="body1" color="initial" sx={{ color: zubgtext, width: '30%', fontSize: '15px', fontWeight: '500' }}>
            Quantity
          </Typography>
          <Stack direction="row" className="bat-price-input-box">
            <IconButton onClick={() => handleClickValue(value - 1)} sx={{
              border: 'none',
              backgroundColor:
                (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                  ? "#18B660"
                  : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                    ? "#FB5B5B"
                    : (type === "voilet" || type === 0 || type === 5)
                      ? "#C86EFF"
                      : (type === "small")
                        ? "#6EA8F4"
                        : (type === "big")
                        && "#FEAA57",
              color: 'white',
              '&:hover': {
                backgroundColor:
                  (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                    ? "#18B660"
                    : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                      ? "#FB5B5B"
                      : (type === "voilet" || type === 0 || type === 5)
                        ? "#C86EFF"
                        : (type === "small")
                          ? "#6EA8F4"
                          : (type === "big")
                          && "#FEAA57",
              },
            }}>
              <RemoveIcon />
            </IconButton>
            <TextField
              sx={{ background: "white", border: 'none !important', width: '100px', '&>div>input': { border: 'none !important', } }}
              placeholder="Enter value"
              value={value}
              variant="outlined"
              type="number"
              onChange={(e) => handleClickValue(parseInt(e.target.value))}
            />
            <IconButton onClick={() => handleClickValue(value + 1 || 1)} sx={{
              mr: '0px !important', border: 'none',
              backgroundColor:
                (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                  ? "#18B660"
                  : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                    ? "#FB5B5B"
                    : (type === "voilet" || type === 0 || type === 5)
                      ? "#C86EFF"
                      : (type === "small")
                        ? "#6EA8F4"
                        : (type === "big")
                        && "#FEAA57",
              color: 'white',
              '&:hover': {
                backgroundColor:
                  (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                    ? "#18B660"
                    : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                      ? "#FB5B5B"
                      : (type === "voilet" || type === 0 || type === 5)
                        ? "#C86EFF"
                        : (type === "small")
                          ? "#6EA8F4"
                          : (type === "big")
                          && "#FEAA57",
              },
            }}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 2, marginRight: 2, }}>
          {[1, 5, 10, 20, 50, 100].map((i) => {
            const isActive = activeMultiplier === i;
            const backgroundColor =
              isActive
                ? (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                  ? "#18B660"
                  : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                    ? "#FB5B5B"
                    : (type === "voilet" || type === 0 || type === 5)
                      ? "#C86EFF"
                      : (type === "small")
                        ? "#6EA8F4"
                        : (type === "big")
                          ? "#FBB13B"
                          : "transparent"
                : "transparent";

            return (
              <div
                key={i}
                onClick={() => handleMultiplierClick(i)}
                style={{
                  backgroundColor,
                  padding: '5px 7px',
                  marginRight: 1,
                  borderRadius: '0.375rem',
                  textAlign: 'center',
                  color: isActive ? '#fff' : '#000',
                  cursor: 'pointer',
                  border: isActive ? 'none' : 'none',
                }}
              >
                X{i}
              </div>
            );
          })}
        </Box>
        {/* <Box className=" !grid !grid-cols-6 lg:gap-1 gap-[1px] !pt-4 lg:px-2 px-1">
          {[1, 5, 10, 20, 50, 100]?.map((i) => {
            return (
              <div
                onClick={() => {
                  handleClickValue(value * i);
                  // setcalculated_value(value)
                }}
                className={`${((type === "green" ||
                  type === 1 ||
                  type === 3 ||
                  type === 7 ||
                  type === 9) &&
                  "!bg-[#30b539]") ||
                  ((type === "red" ||
                    type === 2 ||
                    type === 6 ||
                    type === 4 ||
                    type === 8) &&
                    "!bg-[#FE0000]") ||
                  ((type === "voilet" || type === 0 || type === 5) &&
                    "!bg-[#710193]") ||
                  (type === "small" && "!bg-[#EE1285]") ||
                  (type === "big" && "!bg-[#FBB13B]")
                  }
             !px-3 !py-2 rounded-md  !text-center !text-[#fff]
            `}
              >
                {i}x
              </div>
            );
          })}
        </Box> */}
        <Stack direction="row" className="agree-btn">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="I Agree"
            sx={{
              color: 'black', textTransform: 'capitalize', fontSize: '12px', fontWeight: '400',

            }}
          />
          <Button onClick={() => handleClickOpenRules()} sx={{ color: zubgtext, textTransform: 'capitalize', fontSize: '12px', fontWeight: '400' }}>
            《Pre-sale rules》
          </Button>
          <Dialog
            open={Rules}
            onClose={handleCloseRules}
            className="dialog-rules"
          >
            <DialogContentText id="alert-dialog-description">
              <Stack direction="row" className="personal-rules-header">
                <Typography sx={{ color: "white" }}>Presale Rule</Typography>
                <CloseIcon onClick={() => handleCloseRules()} />
              </Stack>
              <Policy />
            </DialogContentText>
          </Dialog>
        </Stack>
        <Stack direction="row" className="agree-btn-two ">
          <Button variant="text" onClick={() => setapply_bit_dialog_box(false)}>
            Cancel
          </Button>
          <Button
            className="!text-white"
            variant="text"
            color="primary"
            sx={{
              background:
                (type === "green" || type === 1 || type === 3 || type === 7 || type === 9)
                  ? "#18B660" // Green background
                  : (type === "red" || type === 2 || type === 6 || type === 4 || type === 8)
                    ? "#FB5B5B" // Red background
                    : (type === "voilet" || type === 0 || type === 5)
                      ? "#C86EFF" // Violet background
                      : (type === "small")
                        ? "#6EA8F4" // Small background
                        : (type === "big")
                          ? "#FBB13B" // Big background
                          : "transparent" // Default background
            }}

            onClick={() => {
              betFunctionStart();
            }}
            loding={true}
          >
            Total amount &nbsp; ₹{value || "0"}.00
          </Button>
        </Stack>

        <CustomCircularProgress isLoading={loding} />
      </Box>
    </Drawer >
  );
};

export default ApplyBetDialogBox;
