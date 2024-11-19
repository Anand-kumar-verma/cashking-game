import VolumeUpIcon from "@mui/icons-material/VolumeUpOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";

import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { flexbetween } from "../../Shared/Commom";
import { checkTokenValidity } from "../../Shared/CookieStorage";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import MyModal from "../../Shared/Modal";
import {
  bgdarkgray,
  bggold,
  bggrad,
  bggray,
  bglightgray,
  bgtan,
  zubgshadow,
} from "../../Shared/color";
import crown1 from "../../assets/crown1.png";
import crown2 from "../../assets/crown2.png";
import crown3 from "../../assets/crown3.png";
import download from "../../assets/downloadbutton.png";
import game1 from "../../assets/images/game1.png";
import game2 from "../../assets/images/game2.png";
import game3 from "../../assets/images/game3.png";
import game4 from "../../assets/images/game4.png";
import game5 from "../../assets/images/game5.png";
import game6 from "../../assets/images/game6.png";
import game7 from "../../assets/images/game7.png";
import game8 from "../../assets/images/game8.png";
import stage from "../../assets/images/podium.png";
import customer from "../../assets/images/pro_notification.png";
import slider1 from "../../assets/img/banner1.png";
import slider2 from "../../assets/img/banner2.jpg";
import slider3 from "../../assets/img/banner3.jpg";
import slider4 from "../../assets/img/banner4.png";
import slider5 from "../../assets/img/banner5.jpg";
import slider6 from "../../assets/img/banner6.png";
import slider7 from "../../assets/img/banner7.png";
import logo from "../../assets/img/logo.png";
import place1 from "../../assets/place1.png";
import place2 from "../../assets/place2.png";
import place3 from "../../assets/place3.png";
import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import winerbanner1 from "../../assets/winerbanner1.png";
import Layout from "../../component/Layout/Layout";
import {
  net_wallet_amount_function,
  please_reconnect_the_serverFun,
  waitingAviatorFun,
} from "../../redux/slices/counterSlice";
import { MyGamesFn, walletamount, yesterdayFn } from "../../services/apicalling";
import {
  apk_url,
  endpoint,
  fron_end_main_domain
} from "../../services/urls";
import theme from "../../utils/theme";
import Casino from "./component/Casino";
import Fishing from "./component/Fishing";
import Lottery from "./component/Lottery";
// import MiniGames from "./component/MiniGames";
import { enCryptData } from "../../Shared/secret";
import JiliGames from "./component/JiliGames";
import PVC from "./component/PVC";
import Populer from "./component/Populer";
import Slots from "./component/Slots";
import Sports from "./component/Sports";


const imageSources = [
  "https://mui.com/static/images/avatar/2.jpg",
  "https://mui.com/static/images/avatar/3.jpg",
  profile3,
  "https://mui.com/static/images/avatar/4.jpg",
  profile1,
  "https://mui.com/static/images/avatar/1.jpg",
  profile2,
  "https://mui.com/static/images/avatar/5.jpg",
];

function Dashboard() {
  const [value, setValue] = useState(1);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [status, setStatus] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const dispatch = useDispatch();
  // const isAvailableUser = sessionStorage.getItem("isAvailableUser");

  const navigate = useNavigate();
  // const [poicy, setpoicy] = React.useState(false);
  const [type_of_game, settype_of_game] = React.useState("");
  const [winnner_data, setwinnerdata] = useState([]);
  // const [openbannerurl, setopenbannerurl] = useState("");
  const [loding, setloding] = useState(false);
  // const [lodingBanner, setlodingBanner] = useState(false);

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  const top11WinnerFunction = async () => {
    // setloding(true);
    try {
      const response = await axios.get(`${endpoint.top11winner}`);
      setwinnerdata(response?.data?.data);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    top11WinnerFunction();
  }, []);

  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const wallet = data?.data?.data;

  useEffect(() => {
    dispatch(net_wallet_amount_function(data?.data?.data));
  }, [Number(data?.data?.data?.wallet), Number(data?.data?.data?.winning)]);

  useEffect(() => {
    // openbannerFunction();
    localStorage.removeItem("amount_set");
    localStorage.removeItem("Deposit_type");
    localStorage.removeItem("server_provider");
  }, []);

  const initialValues = {
    referrel_code: `${fron_end_main_domain}/register?ref=${wallet?.referral_code}`,
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("This is handle submit");
    },
  });

  useEffect(() => {
    dispatch(waitingAviatorFun(true));
    dispatch(please_reconnect_the_serverFun(false));
  }, []);

  const { data: amount } = useQuery(["yesterday_income"], () => yesterdayFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const statusyesterday = amount?.data?.data

  const getStatus = async () => {
    try {
      const res = await axios.get(endpoint.get_status);
      setStatus(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  const valuedata =
  (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
          localStorage.getItem("logindataen"),
          "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
  null;
const user_id = valuedata && JSON.parse(valuedata)?.UserID;

  const { data:game } = useQuery(["game_detail"], () => MyGamesFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const alljiligames = game?.data


const getGamnesbyID = async (gameId) => {

    const reqbody = {
        user_id: user_id,
        game_id: gameId
    }
    try {
        const res = await axios.post(endpoint.jili_games_id, {
            payload: enCryptData(reqbody),
        },);
        if (res?.data?.data?.Data) {
          window.location.href = res?.data?.data?.Data;
      } else {
          toast("Coming Soon")
    }
  } catch (e) {
        console.log(e);
    }
};

  return (
    <Layout header={false}>
      <Box sx={styles.root}>
        <Box sx={{ ...flexbetween }}>
          <Box component="img" sx={{ width: "116px" }} src={logo}></Box>
          <Box sx={{ display: 'flex' }} >
            <Box className="!cursor-pointer" component="img" sx={{ width: "30px", mr: 1, filter: 'brightness(10)' }} src={customer} onClick={() => navigate('/ticket')}>
            </Box>
            <Box component="img" sx={{ width: "30px" }} src={download} onClick={() => { window.location.href = apk_url }}></Box>
          </Box>
        </Box>

      </Box>
      <Box >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
          style={{

            overflow: "hidden",
            height: "25vh",
          }}
        >
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider1} sx={styles.sliderimg}></Box>
          </SwiperSlide>
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider6} sx={styles.sliderimg}></Box>
          </SwiperSlide>
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider5} sx={styles.sliderimg}></Box>
          </SwiperSlide>
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider7} sx={styles.sliderimg}></Box>
          </SwiperSlide>
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider2} sx={styles.sliderimg}></Box>
          </SwiperSlide>
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider3} sx={styles.sliderimg}></Box>
          </SwiperSlide>
          <SwiperSlide sx={styles.sliderbox}>
            {" "}
            <Box component="img" src={slider4} sx={styles.sliderimg}></Box>
          </SwiperSlide>


          <div
            className="autoplay-progress"
            slot="container-end"
            style={{ display: "none" }}
          >
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent} style={{ display: "none" }}></span>
          </div>
        </Swiper>
      </Box>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          py: 1,
          background: "#FFFBE8",
        }}
      >
        <VolumeUpIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        <Typography
          variant="body1"
          color="initial"
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            mr: 1,
            textAlign: "center",
            color: theme.palette.primary.main,
          }}
        >
          1.All recharge methods only available in RECHARGE menu on OFFICIAL
        </Typography>
        <Typography className="!bg-red-400 !text-white !text-xs  !font-bold rounded-2xl px-2 !flex justify-center">
          <WhatshotIcon fontSize="small" />{" "}
          <span className="my-1">Details</span>
        </Typography>
      </Stack>
      <Box sx={{ pb: "70px" }}>
        <Container
          className="!h-[100%] !overflow-auto no-scrollbar"
          sx={{ background: bgdarkgray }}
        >

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 15px",
              mt: 1,
            }}
          >
            <NavLink onClick={() => handleChange(1)}>
              <Box
                className="gamecategory "
                sx={{
                  background:
                    value === 1 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 1 && "10px !important",
                }}
              >
                <Box component="img" src={game1}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Lottery
              </Typography>
            </NavLink>
            <NavLink onClick={() => handleChange(2)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 2 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 2 && "10px !important",
                }}
              >
                <Box className="h-20  rounded-full" component="img" src={"https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/l/lots-of-slots-switch/hero"}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Slots
              </Typography>
            </NavLink>
            <NavLink onClick={() => handleChange(3)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 3 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 3 && "10px !important",
                }}
              >
                <Box component="img" src={game3}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Sports
              </Typography>
            </NavLink>
            <NavLink onClick={() => handleChange(4)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 4 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 4 && "10px !important",
                }}
              >
                <Box component="img" src={game4}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Table & Card
              </Typography>
            </NavLink>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 15px",
            }}
          >
            <NavLink onClick={() => handleChange(5)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 5 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 5 && "10px !important",
                }}
              >
                <Box component="img" src={game8}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Slot
              </Typography>
            </NavLink>
            <NavLink onClick={() => handleChange(6)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 6 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 6 && "10px !important",
                }}
              >
                <Box component="img" src={game7}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Fishing
              </Typography>
            </NavLink>
            <NavLink onClick={() => handleChange(7)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 7 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 7 && "10px !important",
                }}
              >
                <Box component="img" src={game6}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Jili games
                {/* Mini games */}
              </Typography>
            </NavLink>
            <NavLink onClick={() => handleChange(8)}>
              <Box
                className="gamecategory"
                sx={{
                  background:
                    value === 8 &&
                    " linear-gradient(118.23deg,#ff8e89 26.37%,#ffc3a2 89.18%)!important",
                  borderRadius: value === 8 && "10px !important",
                }}
              >
                <Box component="img" src={game5}></Box>
              </Box>
              <Typography variant="body1" color="initial" sx={styles.gamecattext}>
                Popular
              </Typography>
            </NavLink>
          </Stack>
          {value === 1 && <Lottery />}
          {value === 2 && <Slots alljiligames={alljiligames?.crash} getGamnesbyID={getGamnesbyID} />}
          {value === 3 && <Sports />}
          {value === 4 && <Casino  alljiligames={alljiligames?.tableandcard} getGamnesbyID={getGamnesbyID}/>}
          {value === 5 && <PVC alljiligames={alljiligames?.slot} getGamnesbyID={getGamnesbyID}/>}
          {value === 6 && <Fishing alljiligames={alljiligames?.fish} getGamnesbyID={getGamnesbyID}/>}
          {/* {value === 7 && <MiniGames />} */}
          {value === 7 && <JiliGames alljiligames={alljiligames?.data}  getGamnesbyID={getGamnesbyID}/>}
          {value === 8 && <Populer />}

          {loding ? (
            <div className="w-[100%] flex justify-center">
              <CircularProgress className="!text-#E71D1E" />
            </div>
          ) : (
            <Box sx={styles.wininfoouter}>
              <Stack direction={"row"} sx={{ alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    background: "red",
                    width: "4px",
                    height: "16px",
                  }}
                ></Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 700,
                    ml: 1,
                    color: "black",
                  }}
                >
                  Winning information
                </Typography>
              </Stack>
              {winnner_data?.slice(5, 8)?.map((i, index) => {
                return (
                  <Stack key={index} direction="row" sx={styles.winnerslider}>
                    <div style={{ position: "relative" }}>
                      <Box
                        width={25}
                        height={25}
                        component={"img"}
                        src={crown2}
                        sx={styles.bca}
                      ></Box>
                      <Box
                        component={"img"}
                        src={imageSources[index]}
                        alt={`Profile ${index + 1} `}
                        width={45}
                        height={45}
                        sx={styles.winnerprofile}
                      ></Box>
                    </div>
                    <Typography variant="body1" sx={styles.winnername}>
                      <p className="!flex !flex-col" style={{ color: "#525252", fontSize: '13px', fontWeight: '600' }}>
                        {i?.email
                          ? i.email.split("@")[0].substring(0, 2) +
                          "**" +
                          (i.email.split("@")[0].length > 2
                            ? i.email.split("@")[0].substring(2, 4)
                            : "")
                          : "**"}
                      </p>
                    </Typography>
                    <Box sx={styles.winnerbannerouter}>
                      <Box
                        height={45}
                        component={"img"}
                        src={winerbanner1}
                        sx={styles.winnerbannerinner}
                      ></Box>
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={styles.winneramout || 0}>
                        Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                      </Typography>
                      <Typography variant="body1" sx={styles.winnertitle}>
                        Winning amount
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          )}

          <Stack direction={"row"} sx={{
            alignItems: "center", mb: 2, width: "95%",
            marginLeft: "2.5%",
            pb: 3,
            pt: 1,
          }}>
            <Box
              sx={{
                background: "red",
                width: "4px",
                height: "16px",
              }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                ml: 1,
                color: "black",
              }}
            >
              Today's earnings chart
            </Typography>
          </Stack>
          <Box sx={styles.podiumbox} mt={5}>
            <Stack direction="row" sx={styles.podiumtextouterbox}>
              <Box sx={styles.winner2box}>
                <Box
                  component={"img"}
                  src={crown2}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile1}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place2}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt2}>
                  <Typography variant="body1" sx={{ color: bgdarkgray }}>
                    {winnner_data?.[1]?.email
                      ? winnner_data?.[1]?.email
                        ?.split("@")?.[0]
                        ?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[1]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[1]?.email
                          ?.split("@")?.[0]
                          ?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography variant="body1" sx={styles.winningamount}>
                    ₹ {Number(winnner_data?.[1]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: "-18%",
                  left: "33.33%",
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown1}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile2}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place1}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt2}>
                  <Typography variant="body1">
                    {winnner_data?.[0]?.email
                      ? winnner_data?.[0]?.email
                        ?.split("@")?.[0]
                        ?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[0]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[0]?.email
                          ?.split("@")?.[0]
                          ?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography variant="body1" sx={styles.winningamount}>
                    ₹ {Number(winnner_data?.[0]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "absolute",
                  zIndex: 30,
                  top: 0,
                  right: 0,
                  height: "100%",
                }}
              >
                <Box
                  component={"img"}
                  src={crown3}
                  sx={styles.winnercroun}
                ></Box>
                <Box
                  component={"img"}
                  src={profile3}
                  sx={styles.winnerprofilepod}
                ></Box>
                <Box
                  component={"img"}
                  src={place3}
                  sx={styles.winnerposition}
                ></Box>
                <Box sx={styles.winner2amt2}>
                  <Typography variant="body1">
                    {winnner_data?.[2]?.email
                      ? winnner_data?.[2]?.email
                        ?.split("@")?.[0]
                        ?.substring(0, 2) +
                      "**" +
                      (winnner_data?.[2]?.email?.split("@")?.[0]?.length > 2
                        ? winnner_data?.[2]?.email
                          ?.split("@")?.[0]
                          ?.substring(2, 4)
                        : "")
                      : "**"}
                  </Typography>
                  <Typography variant="body1" sx={styles.winningamount}>
                    ₹ {Number(winnner_data?.[2]?.win)?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box sx={styles.wininfoouter}>
            {winnner_data?.slice(3, 5)?.map((i, index) => {
              return (
                <Stack key={index} direction="row" sx={styles.winnerslider}>
                  <div style={{ position: "relative" }}>
                    <Box
                      width={25}
                      height={25}
                      component={"img"}
                      src={crown2}
                      sx={styles.bca}
                    ></Box>
                    <Box
                      component={"img"}
                      src={imageSources[index]}
                      alt={`Profile ${index + 1} `}
                      width={45}
                      height={45}
                      sx={styles.winnerprofile}
                    ></Box>
                  </div>
                  <Typography variant="body1" sx={styles.winnername}>
                    <p className="!flex !flex-col" style={{ color: "#525252", fontSize: '13px', fontWeight: '600' }}>
                      {i?.email
                        ? i.email.split("@")[0].substring(0, 2) +
                        "**" +
                        (i.email.split("@")[0].length > 2
                          ? i.email.split("@")[0].substring(2, 4)
                          : "")
                        : "**"}
                    </p>
                  </Typography>
                  <Box sx={styles.winnerbannerouter}>
                    <Box
                      height={45}
                      component={"img"}
                      src={winerbanner1}
                      sx={styles.winnerbannerinner}
                    ></Box>
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={styles.winneramout || 0}>
                      Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" sx={styles.winnertitle}>
                      Winning amount
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box>
          {/* <Box sx={styles.wininfoouter} >
            <Stack direction={"row"} sx={{ alignItems: "center", mb: 2, }}>
              <Box
                sx={{
                  background: 'black',
                  width: "4px",
                  height: "16px",
                }}
              ></Box>
              <Typography
                variant="body1"

                sx={{ fontSize: "18px", fontWeight: 700, ml: 1, color: 'black' }}
              >
                Last Trade Top Winner
              </Typography>
            </Stack>
            {winnner_data?.slice(3, 8)?.map((i, index) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  sx={styles.winnerslider}
                >
                  <div style={{ position: 'relative' }}>
                    <Box
                      width={25}
                      height={25}
                      component={"img"}
                      src={crown2}
                      sx={styles.bca}
                    ></Box>
                    <Box
                      component={"img"}
                      src={imageSources[index]}
                      alt={`Profile ${index + 1} `}
                      width={45}
                      height={45}
                      sx={styles.winnerprofile}
                    ></Box>

                  </div>
                  <Typography
                    variant="body1"

                    sx={styles.winnername}
                  >
                    <p className="!flex !flex-col" style={{ color: 'black' }}>
                      <span>tanve***</span>
                      <span>fun@859***</span>
                    </p>
                  </Typography>
                  <Box sx={styles.winnerbannerouter}>
                    <Box
                      height={45}
                      component={"img"}
                      src={winerbanner1}
                      sx={styles.winnerbannerinner}
                    ></Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"

                      sx={styles.winneramout || 0}
                    >
                      Receive ₹{Number(i?.win || 0)?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body1"

                      sx={styles.winnertitle}
                    >
                      Winning amount
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
          </Box> */}
          {/* {poicy && !lodingBanner && (
            <Dialog
              open={poicy}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosepolicy}
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{ className: `!max - w - [500px] ${gray} ` }}
            >
              <div
                style={{
                  background: zubgtext,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                {!openbannerurl ||
                  (openbannerurl === "" && (
                    <p style={{ color: "black", fontSize: "14px" }}>
                      Notification
                    </p>
                  ))}
                <RxCross2
                  style={{ color: "black" }}
                  onClick={handleClosepolicy}
                />
              </div>
              <DialogContent style={{ background: zubgback }}>
                {!openbannerurl || openbannerurl === "" ? (
                  <Notification handleClosepolicy={handleClosepolicy} />
                ) : (
                  <img src={openbannerurl} className="w-[100%] h-[100%]" />
                )}
              </DialogContent>
            </Dialog>
          )} */}
          {statusyesterday?.status_of_deposit_popup === 1 ?
            <MyModal />
            : ""}

        </Container>
      </Box>
      <CustomCircularProgress isLoading={isLoading || isLoading} />
    </Layout>
  );
}

export default Dashboard;

const styles = {
  root: { background: bggrad, padding: "5px 15px" },
  dashboardTitle: {
    textAlign: "center",
    color: "#E71D1E !important",
    fontSize: "21px",
    fontWeight: "500",
  },
  swiperImage: { width: "100%", height: "auto" },
  depositWithdrawContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 4,
    width: "95%",
    marginLeft: "2.5%",
  },
  depositWithdrawIcon: { width: "30px", height: "30px" },
  referralLinkContainer: {
    background: bggrad,
    boxShadow: zubgshadow,
    padding: "15px 15px",
    borderRadius: "5px",
    mt: 4,
    width: "95%",
    marginLeft: "2.5%",
  },
  referralLinkTitle: {
    color: "#160D3D",
    fontSize: "14px",
    fontWeight: "500 !important",
    mb: 1,
  },
  referralLinkInputContainer: { alignItems: "center" },
  referralLinkInput: {
    width: "100%",
    background: bglightgray,
    boxShadow: zubgshadow,
    borderRadius: "5px",
    "&>div>input": { color: "black" },
  },
  referralLinkButton: {
    marginLeft: 2,
    background: bgdarkgray,
    color: "black",
  },
  socialButtonsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
  },
  telegramButton: {
    fontSize: "14px",
    color: "#160D3D !important",
    textTransform: "capitalize",
    fontWeight: "400",
    background: "#27A3E3",
    "&:hover": { background: "#27A3E3" },
  },
  supportButton: {
    fontSize: "14px",
    color: "black",
    textTransform: "capitalize",
    fontWeight: "400",
    background: bgdarkgray,
    "&:hover": { background: bgdarkgray },
  },
  socialButtonIcon: {
    margin: "auto",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: { fontSize: "30px", "&>path": { color: "black !important" } },
  socialIconinfo: {
    fontSize: "27px",
    margin: "auto",
    color: `${theme.palette.primary.dark}!important`,
    "&>path": { color: `${theme.palette.primary.dark}!important` },
  },
  socialButtonText: {
    color: " !important",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
  },
  gameTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#E71D1E !important",
    transition: "all 0.3s",
  },
  stageinner: {
    width: "32%",
    position: "absolute",
    top: "0%",
    left: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  winnerprofile: {
    borderRadius: "50%",
    objectPosition: "center",
    objectFit: "cover",
  },
  name: { color: "#8f5206", fontSize: "13px", fontWeight: 500 },
  wininfoouter: {
    width: "95%",
    marginLeft: "2.5%",
    padding: "10px 0px",
    mt: "20px",
    borderRadius: "10px",
    position: "relative",
  },
  winnername: { fontSize: "12px", fontWeight: 400, mx: 1 },
  winner1: {
    position: "absolute",
    left: "41%",
    top: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner2: {
    position: "absolute",
    left: "17%",
    bottom: "52%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winner3: {
    position: "absolute",
    right: "18%",
    bottom: "49%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  winnerslider: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0px 10px 5px",
    position: "relative",
    borderRadius: "10px",
    my: 1.5,
    animation: "infinite moves",
  },
  winnerbannerouter: {
    background: theme.palette.primary.main,
    width: "23%",
    borderRadius: "10px",
    objectPosition: "center",
  },
  winnerbannerinner: {
    width: "100%",
    borderRadius: "10px",
    objectPosition: "center",
    objectFit: "cover",
  },
  winneramout: {
    fontSize: "13px",
    fontWeight: 800,
    marginLeft: 1,
    color: "black",
  },
  winnertitle: {
    fontSize: "12px",
    fontWeight: 500,
    marginLeft: 1,
    color: "#7a7a7a",
  },
  bca: {
    width: "25px",
    height: "25px",
    position: "absolute",
    bottom: "57%",
    left: "-33%",
    transform: "rotate(-20deg)",
  },
  headertitle: { color: bggold },
  podiumbox: {
    backgroundImage: `url(${stage})`,
    width: "95%",
    height: "140px",
    mt: "54px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    position: "relative",
    zIndex: 10,
    ml: "2.5%",
  },
  podiumtextouterbox: { width: "100%", height: "100%", position: "relative" },
  winner2box: {
    width: "30%",
    position: "absolute",
    zIndex: 30,
    top: 0,
    left: 0,
    height: "100%",
  },
  winnerposition: {
    width: "70px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "21%",
    top: "14%",
  },
  winnerprofilepod: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "25%",
    top: "-11%",
  },
  winnercroun: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    position: "absolute",
    left: "11%",
    top: "-25%",
    zIndex: 1000,
  },
  winner2amt: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: "22%",
    textAlign: "center",
    "&>p": { color: "black", fontWeight: 400, fontSize: "11px" },
  },
  winner2amt2: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: "22%",
    textAlign: "center",
    "&>p": { color: bgdarkgray, fontWeight: 400, fontSize: "11px" },
  },
  winningamount: {
    marginTop: "5px",
    padding: "5px",
    borderRadius: "10px",
    background: bggrad,
    marginLeft: "5%",
    width: "90%",
    color: bgdarkgray,
  },
  headertitle: { color: bggold },
  winbox: {
    background: "#e9e9e9",
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
    "&>div>p": { fontSize: "12px", fontWeight: 400, color: "black" },
  },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "black" },
  gamemenubox: {
    padding: "8px 5px",
    background: bglightgray,
    mt: 2,
    borderRadius: "10px",
    width: "100%",
  },
  gameimgbox: { width: "25%", borderRadius: "10px", height: "16vh" },
  gameimg: {
    width: "100%",
    borderRadius: "10px",
    height: "100%",
    objectFit: "cover",
  },
  gamenamebox: { width: "70%" },
  playbutton: {
    background: bggrad,
    color: bgtan,
    fontWeight: "900",
    fontSize: "13px",
    padding: "5px 30px",
  },
  maxwin: {
    background: bggray,
    padding: "2px 5px 2px 5px",
    borderRadius: "5px",
  },
  gamecattext: {
    textAlign: "center",
    textDecoration: "none !important",
    fontSize: "11px",
    fontWeight: 500,
    mt: 1,
  },
};
