import { ArrowForwardIos, CopyAll } from "@mui/icons-material";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import copy from "clipboard-copy";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  bgdarkgray,
  bggold,
  bggrad,
  bglightgray,
  bgtan,
  zubgtext,
} from "../../Shared/color";
import bep from "../../assets/images/bep20token_nadcab.png";
import walet from "../../assets/images/wallet.png";
import waletact from "../../assets/images/walletactive.png";
import c1 from "../../assets/service_Center.png";
import depo from "../../assets/rechargeHistory.png";
import f1 from "../../assets/service_feedback.png";
import lang from "../../assets/languageIcon.png";
import n1 from "../../assets/service_notification.png";
import not from "../../assets/notification.png";
import dp1 from "../../assets/images/pr.png";
import star from "../../assets/gamestatistics.png";
import trc from "../../assets/images/tether-usdt-logo-FA55C7F397-seeklogo.com.png";
import vip from "../../assets/images/vipp.png";
import edit from "../../assets/pro_vip.png";
import income from "../../assets/gamestatistics.png";
import wit from "../../assets/transaction.png";
import wtd from "../../assets/pro_withdraw.png";
import power from "../../assets/power-svgrepo-com.svg";
// import sunlotteryhomebanner from "../../assets/sunlotteryhomebanner.jpg";
import toast from "react-hot-toast";
import MyModal from "../../Shared/Modal";
import s from "../../assets/wallet-money-svgrepo-com (3).svg";
import dpt from "../../assets/wallets.png";
import Layout from "../../component/Layout/Layout";
import {
  VipIncomeFn,
  walletamount,
  yesterdayFn,
} from "../../services/apicalling";
import { baseUrl, fron_end_main_domain } from "../../services/urls";

function Account() {
  const [opend, setOpend] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("order_id");
  const client = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, data: amount } = useQuery(
    ["walletamount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );
  const wallet = amount?.data?.data;

  const { data: data } = useQuery(["vip_bonus"], () => VipIncomeFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
  const res = data?.data?.data;

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  async function sendUrlCallBackToBackend(transactionId) {
    try {
      const res = await axios.get(
        `${baseUrl}/api/deposit-collback?order_id=${transactionId}`
      );
      if (res?.data?.status === "200") {
        window.location.href = `${fron_end_main_domain}/account`;
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    client.removeQueries("myprofile");
    client.refetchQueries("walletamount");
    if (transactionId) {
      sendUrlCallBackToBackend(transactionId);
    }
  }, []);

  const { data: amountdata } = useQuery(
    ["yesterday_income"],
    () => yesterdayFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const statusyesterday = amountdata?.data?.data;

  return (
    <Layout header={false}>
      <Container sx={style.container}>
        <Box
          sx={{
            padding: 1,
            background: bggrad,
            height: "25vh",
            borderRadius: "0px 0px 50px 50px",
          }}
        >
          <Container>
            <Box className="flex justify-start items-center gap-2 ">
              <Typography
                className=" !mt-5 !mr-2"
                onClick={() => setOpend(true)}
              >
                <img
                  src={dp1}
                  alt=""
                  className="!rounded-full  w-[72px] h-[72px]"
                />
              </Typography>
              <Box className="flex flex-col ">
                <Box className="flex justify-start items-center mt-5">
                  <Typography sx={{ color: 'white', fontWeight: "700" }}>
                    {wallet?.full_name}
                  </Typography>
                  <Typography>
                    <div
                      className="!flex justify-center !cursor-pointer"
                      onClick={() => navigate("/vip")}
                    >
                      <img src={vip} alt="" className=" w-12 ml-3" />
                      <p className="!text-xs !font-bold -ml-1 !text-white-400 !text-center bg-[#FEAA57] rounded-full h-4 w-4 !mt-2">
                        {" "}
                        {res?.length}
                      </p>
                    </div>
                  </Typography>
                </Box>
                <Box
                  className="!w-fit h-6 rounded-full p-1 !cursor-pointer  realtive !left-40 flex gap-3 justify-center"
                  sx={{ background: '#FEAA57' }}
                  onClick={() => functionTOCopy(wallet?.username || 0)}
                >
                  <Typography className="text-white !text-xs">UID </Typography>
                  <Typography className="text-white !text-xs">| </Typography>
                  <Typography className="text-white !text-xs">
                    {wallet?.username || 0} <CopyAll fontSize="small" />{" "}
                  </Typography>
                </Box>
                <p style={{ color: "white", marginTop: "2px" }}>
                  Mobile No : {wallet?.mob_no || 0}{" "}
                </p>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box sx={{ position: "relative", height: "150px" }}>
          <Box
            sx={{
              ...style.actionContainer,
              position: "absolute",
              left: "2.5%",
              bottom: "24%",
            }}
          >
            <Box
              sx={{

                paddingBottom: "10px",
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                color="initial"
                sx={style.balanceText}
              >
                Total Balance
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={style.totalBalance}
              >
                ₹
                {(
                  Number(
                    Number(wallet?.winning || 0) + Number(wallet?.wallet || 0)
                  ) || 0
                )?.toFixed(2)}{" "}
                <CachedIcon sx={style.cachedIcon} />
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box sx={style.actionBox} component={NavLink} to="/wallet">
                <Box component="img" src={s} sx={style.actionImage} />
                <Typography
                  variant="body1"
                  color="initial"
                  sx={style.actionText}
                >
                  Wallet
                </Typography>
              </Box>
              <Box
                sx={style.actionBox}
                component={NavLink}
                to="/wallet/Recharge"
              >
                <Box component="img" src={dpt} sx={style.actionImage} />
                <Typography
                  variant="body1"
                  color="initial"
                  sx={style.actionText}
                >
                  Deposit
                </Typography>
              </Box>
              <Box sx={style.actionBox} component={NavLink} to="/Withdrawal">
                <Box component="img" src={wtd} sx={{ ...style.actionImage, filter: 'contrast(0.7)' }} />
                <Typography
                  variant="body1"
                  color="initial"
                  sx={style.actionText}
                >
                  Withdraw
                </Typography>
              </Box>
              <Box sx={style.actionBox} component={NavLink} to="/vip">
                <Box component="img" src={edit} sx={style.actionImage} />
                <Typography
                  variant="body1"
                  color="initial"
                  sx={style.actionText}
                >
                  VIP Level
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="grid grid-cols-2 gap-3 "
          sx={{ mt: "-20px", width: "95%", ml: "" }}
        >
          <NavLink to="/credit_Account">
            <Box
              className="flex gap-1 p-1 py-4 justify-center items-center   rounded-lg"
              sx={{ background: 'white' }}
            >
              <Typography>
                <img src={waletact} alt="" className="w-10" />
              </Typography>
              <Typography sx={{ color: "black" }}>
                Credit  <br />
                <span className="!text-xs !text-gray">
                  {" "}
                 To Jili Account
                </span>
              </Typography>
            </Box>
          </NavLink>
          <NavLink to="/debit_Account">
            <Box
              className="flex gap-1 p-1 py-4 justify-center items-center   rounded-lg"
              sx={{ background: 'white' }}
            >
              <Typography>
                <img src={walet} alt="" className="w-10" />
              </Typography>
              <Typography sx={{ color: "black" }}>
                Debit <br />
                <span className="!text-xs !text-gray">
                  {" "}
                  From Jili Account
                </span>
              </Typography>
            </Box>
          </NavLink>
        </Box>
        <Box
          className="grid grid-cols-2 gap-3 "
          sx={{ mt: "-20px", width: "95%", ml: "2.5%" }}
        >
          <NavLink to="/depositHistory">
            <Box
              className="flex gap-1 p-1 py-4 justify-center items-center   rounded-lg"
              sx={{ background: 'white' }}
            >
              <Typography>
                <img src={depo} alt="" className="w-10" />
              </Typography>
              <Typography sx={{ color: "black" }}>
                Deposit <br />
                <span className="!text-xs !text-gray">
                  {" "}
                  My Deposit history
                </span>
              </Typography>
            </Box>
          </NavLink>
          <NavLink to="/withdravalHistory">
            <Box
              className="flex gap-1 p-1 py-4 justify-center items-center   rounded-lg"
              sx={{ background: 'white' }}
            >
              <Typography>
                <img src={wit} alt="" className="w-10" />
              </Typography>
              <Typography sx={{ color: "black" }}>
                Withdraw <br />
                <span className="!text-xs !text-gray">
                  {" "}
                  My Withdraw history
                </span>
              </Typography>
            </Box>
          </NavLink>
        </Box>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Box
            sx={{
              background: 'white',
              width: "95%",
              ml: "2.5%",
              borderRadius: "8px ",
            }}
          > <Box
          className="flex justify-between gap-1  p-2"
          sx={{ borderBottom: "1px solid #dfdfdf" }}
          component={NavLink}
          to="/jili_transaction"
        >
          <Box className="flex items-center gap-2">
            <Typography>
              {" "}
              <img src={star} alt="" className="w-6" />
            </Typography>
            <Typography className="!mt-1 text-black" sx={{ fontSize: '13px' }}>
              Jili Transaction History
            </Typography>
          </Box>
          <IconButton>
            {" "}
            <ArrowForwardIos sx={{ color: bggold }} fontSize="small" />
          </IconButton>
        </Box>
        <Box
              className="flex justify-between gap-1  p-2"
              sx={{ borderBottom: "1px solid #dfdfdf" }}
              component={NavLink}
              to="/jili_bet"
            >
              <Box className="flex items-center gap-2">
                <Typography>
                  {" "}
                  <img src={star} alt="" className="w-6" />
                </Typography>
                <Typography className="!mt-1 text-black" sx={{ fontSize: '13px' }}>
                  Jili Bet History
                </Typography>
              </Box>
              <IconButton>
                {" "}
                <ArrowForwardIos sx={{ color: bggold }} fontSize="small" />
              </IconButton>
            </Box>
            <Box
              className="flex justify-between gap-1  p-2"
              sx={{ borderBottom: "1px solid #dfdfdf", width: "100%" }}
              component={NavLink}
              to="/gamenotification"
            >
              <Box className="flex items-center gap-2">
                <Typography>
                  {" "}
                  <img src={not} alt="" className="w-6" />
                </Typography>
                <Typography className="!mt-1 text-black" sx={{ fontSize: '13px' }}>
                  Game Notification
                </Typography>
              </Box>
              <IconButton>
                {" "}
                <ArrowForwardIos sx={{ color: bggold }} fontSize="small" />
              </IconButton>
            </Box>
            <Box
              className="flex justify-between gap-1  p-2"
              sx={{ borderBottom: "1px solid #dfdfdf" }}
              component={NavLink}
              to="/Gamestaticks"
            >
              <Box className="flex items-center gap-2">
                <Typography>
                  {" "}
                  <img src={star} alt="" className="w-6" />
                </Typography>
                <Typography className="!mt-1 text-black" sx={{ fontSize: '13px' }}>
                  Game Statics
                </Typography>
              </Box>
              <IconButton>
                {" "}
                <ArrowForwardIos sx={{ color: bggold }} fontSize="small" />
              </IconButton>
            </Box>
           
            <Box
              className="flex justify-between gap-1  p-2"
              component={NavLink}
              to="/language"
            >
              <Box className="flex items-center gap-2">
                <Typography>
                  {" "}
                  <img src={lang} alt="" className="w-6" />
                </Typography>
                <Typography className="!mt-1 text-black" sx={{ fontSize: '13px' }}> Language </Typography>
              </Box>
              <IconButton>
                <ArrowForwardIos sx={{ color: bggold }} fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ background: 'white', width: "95%", ml: "2.5%" }}
          className="  rounded-lg !mt-4 py-5"
        >
          <Typography className=" px-3" sx={{ color: "black" }}>
            Service Center
          </Typography>
          <Box className="grid grid-cols-3 m-5 justify-center gap-5">
            <Box
              className="flex flex-col justify-center items-center"
              component={NavLink}
              to="/feedback"
            >
              <Typography>
                <img src={f1} alt="" className="w-8 " />
              </Typography>
              <Typography className=" !text-black !text-sm">
                Feedback
              </Typography>
            </Box>
            <Box
              className="flex flex-col justify-center items-center"
              component={NavLink}
              to="/account/income-main"
            >
              <Typography>
                <img src={income} alt="" className="w-8 " />
              </Typography>
              <Typography className=" !text-black !text-sm">Income</Typography>
            </Box>
            <Box
              className="flex flex-col justify-center items-center"
              component={NavLink}
              to="/notification"
            >
              <Typography>
                <img src={n1} alt="" className="w-8 " />
              </Typography>
              <Typography className=" !text-black  !text-sm ml-2">
                {" "}
                Notification
              </Typography>
            </Box>
            <Box
              className="flex flex-col justify-center items-center"
              component={NavLink}
              to="/customerLine"
            >
              <Typography>
                <img src={c1} alt="" className="w-8 " />
              </Typography>
              <Typography
                className=" !text-black  !text-sm"
                sx={{ textAlign: "center" }}
              >
                {" "}
                Customer service
              </Typography>
            </Box>
            <Box
              className="flex flex-col justify-center items-center"
              component={NavLink}
              to="/SettingCenter/LoginPassword"
            >
              <Typography>
                <img src={lang} alt="" className="w-8 " />
              </Typography>
              <Typography
                className=" !text-black !text-sm"
                sx={{ textAlign: "center" }}
              >
                Change Password
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={style.actionContainertwo}>
          <Stack
            sx={{
              width: "100%",
              borderRadius: "10px",
            }}
          >
          </Stack>
        </Box>

        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            pb: 5,
          }}
        >
          <Button
            className="goldborderbtn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <Box component="img" src={power} width={25} sx={{ mr: 2 }} />
            Logout
          </Button>
        </Box>
        {/* {openDialogBoxHomeBanner && (
          <Dialog
            PaperProps={{ width: "500px", height: "500px" }}
            open={openDialogBoxHomeBanner}
          >
            <div>
              <p>
                <IconButton onClick={() => setopenDialogBoxHomeBanner(false)}>
                  <CloseIcon />
                </IconButton>
              </p>
              <p>
                <img src={sunlotteryhomebanner} />
              </p>
            </div>
          </Dialog>
        )} */}
        <CustomCircularProgress isLoading={isLoading} />
        {statusyesterday?.status_of_deposit_popup === 1 ? <MyModal /> : ""}
      </Container>
    </Layout>
  );
}

export default Account;

const style = {
  container: { background: bgdarkgray, mb: "64px" },
  header: {
    alignItems: "center",
    paddingTop: "20px",
    width: "95%",
    margin: "auto",
    mb: 2,
  },
  profileBox: {
    width: "60px",
    height: "60px",
    borderRadius: "20px",
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%", borderRadius: "20px" },
  userInfo: {
    ml: 3,
    "& > :nth-child(1)": {
      fontSize: "18px",
      fontWeight: "600",
      color: zubgtext,
    },
    "& > :nth-child(2)": {
      fontSize: "14px",
      fontWeight: "400",
      color: "white",
      padding: "0px 20px",
      background: zubgtext,
      borderRadius: "20px",
    },
  },
  rankImage: { width: "100px", height: "100px" },
  balanceContainer: {
    // backgroundImage: `url(${bgms})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "100% 100%",
    background: zubgtext,
    borderRadius: "10px",
    padding: "20px",
    width: "95%",
    margin: "auto",
    marginTop: "2px",
  },
  balanceText: {
    fontSize: "13px",
    fontWeight: "400",
    color: "#9a8f8f",
  },
  balanceText1: {
    fontSize: "13px",
    fontWeight: "500",
    color: "white",
  },
  totalBalance: {
    fontSize: "18px",
    fontWeight: "600",
    color: "black",
    marginRight: "10px",
  },
  cachedIcon: { color: "gray", ml: 1, fontSize: "17px" },
  cardImage: { width: "50px" },
  cardNumber: { fontSize: "14px", color: "white", marginLeft: "10px" },
  actionContainer: {
    borderRadius: "10px",
    padding: "20px",
    width: "95%",
    margin: "auto",
    marginTop: "25px",
    background: '#fff',
  },
  actionBox: { width: "20%" },
  actionImage: { width: "30px", height: "30px", margin: "auto" },
  actionText: {
    color: "black",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "400",
    mt: "4px",
  },
  actionContainertwo: {
    flexDirection: "column",
    borderRadius: "10px",
    width: "95%",
    margin: "auto",
    marginTop: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBox2: { width: "48%" },
  actionImage2: { width: "30px", height: "30px", margin: "auto" },
  actionText2: {
    color: "black",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
    mt: "4px",
  },
};
