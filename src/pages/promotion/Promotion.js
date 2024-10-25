import { DashboardRounded, Money } from "@mui/icons-material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import { Box, Container, Stack, Typography } from "@mui/material";
import copy from "clipboard-copy";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import {
  bgdarkgray,
  bggold,
  bggrad,
  bglightgray,
  lightblue,
  zubgtext,
} from "../../Shared/color";
import customer from "../../assets/call-outgoing-svgrepo-com (1).svg";
import copyIimage from "../../assets/copycode.png";
import sort from "../../assets/filter-search-svgrepo-com.svg";
import donut from "../../assets/teamport.png";
import donut1 from "../../assets/doller.png";
import donut2 from "../../assets/doller.png";
import donut3 from "../../assets/images/stastistics.png";
import money from "../../assets/invitereg.png";
import cus_service from "../../assets/cus_service.png";
import promotion_data from "../../assets/promotion_data.png";
import MyModal from "../../Shared/Modal";
import Layout from "../../component/Layout/Layout";
import { MygetdataLevelFn, walletamount, yesterdayFn } from "../../services/apicalling";
import { fron_end_main_domain } from "../../services/urls";
import { backgroundImageFun } from "../../redux/slices/counterSlice";
import promotion from "../../assets/promotionbg-13880556.png";


function Promotion() {
  const { data: amount } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const wallet = amount?.data?.data;

  const { isLoading, data } = useQuery(
    ["yesterday_income"],
    () => yesterdayFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const result = data?.data?.data || [];

  const { data: level } = useQuery(
    ["get_level_general"],
    () => MygetdataLevelFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const get = level?.data?.data?.[0] || [];



  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  return (
    <Layout header={false}>
      <Container>
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Typography variant="body1"></Typography>
          <Typography variant="body1" className="!text-black !mx-5">
            Agency
          </Typography>
          <Box component={NavLink} to="/promotion/TeamReport/">
            <Box component="img" src={sort} width={30}></Box>
          </Box>
        </Box>
        <Box sx={style.commitionboxOuter} className=" ">
          <Box sx={style.commitionbox}>
            <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
              {Number(result?.yesterday_income || 0)?.toFixed(4)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#ff4b4b", background: 'white' }}
            >
              Yesterday Income
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Upgrade the level to increase income
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ...style.subcordinateBox, position: 'relative', mt: '18vh', }}>
          <Stack direction="row" sx={{ width: "100%" }}>
            <Box sx={style.subordinatesleft}>
              <EmojiPeopleOutlinedIcon />
              <Typography variant="body1">Direct subordinates</Typography>
            </Box>
            <Box sx={style.subordinatesRight}>
              <Groups2OutlinedIcon />
              <Typography variant="body1">Team subordinates</Typography>
            </Box>
          </Stack>
          <Box sx={style.boxStyles}>
            <Box sx={style.innerBoxStyles}>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" className="!text-black">
                  {result?.direct_reg || 0}
                </Typography>
                <Typography variant="body1">Number of register</Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" className="!text-black">
                  {result?.direct_depo_mem || 0}
                </Typography>
                <Typography variant="body1">
                  Number of Deposit Members
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" className="!text-black">
                  {Number(result?.direct_yest_depo || 0)?.toFixed(2)}
                </Typography>
                <Typography variant="body1">Deposit amount</Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"
                  className="!text-black"

                >
                  {result?.no_of_direct_people_making_first_depo || 0}
                </Typography>
                <Typography variant="body1">
                  No of people making first deposit
                </Typography>
              </Box>
            </Box>

            <Box sx={style.innerBoxStylestwo}>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" className="!text-black">
                  {result?.team_reg || 0}
                </Typography>
                <Typography variant="body1">Number of register</Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" className="!text-black">
                  {result?.team_depo_mem || 0}
                </Typography>
                <Typography variant="body1">
                  Number of Deposit Members
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography variant="body1" className="!text-black">
                  {Number(result?.team_yest_depo || 0)?.toFixed(2)}
                </Typography>
                <Typography variant="body1">Deposit amount</Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"
                  className="!text-black"

                >
                  {result?.no_of_team_people_making_first_depo || 0}
                </Typography>
                <Typography variant="body1">
                  No of people making first deposit
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={style.subcordinateBox}>
          {/* <Stack direction="row" sx={{ width: "100%" }}>
            <Box sx={style.subordinatesleft2}>
              <EmojiPeopleOutlinedIcon />
              <Typography variant="body1">Total commission</Typography>
            </Box>
          </Stack> */}
          <Box sx={style.boxStyles}>
            {/* <Box sx={style.innerBoxStyles}>

              <Box sx={style.subcordinatelist} >
                <Typography
                  variant="body1"
                  className="!text-black"

                >
                  {Number(get?.daily_salary_today || 0)?.toFixed(2)}

                </Typography>
                <Typography
                  variant="body1"

                >
                  Today salary
                </Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"
                  className="!text-black"

                >
                  {Number(get?.daily_salary_total || 0)?.toFixed(2)}
                </Typography>
                <Typography
                  variant="body1" >
                  Total salary
                </Typography>
              </Box>
            </Box> */}

            {/* <Box sx={style.innerBoxStylestwo}>

              <Box sx={style.subcordinatelist}>
                <Typography variant="body1"
                  className="!text-black" >
                  {Number(get?.today_withdrawal || 0)?.toFixed(2)}
                </Typography>
                <Typography variant="body1">Today withdrawal</Typography>
              </Box>
              <Box sx={style.subcordinatelist}>
                <Typography
                  variant="body1"
                  className="!text-black"

                >
                  {Number(get?.total_withdrawal || 0)?.toFixed(2)}

                </Typography>
                <Typography variant="body1">Total withdrawal</Typography>
              </Box>
            </Box> */}
          </Box>
          <Box sx={style.invitebtn}>
            <NavLink
              onClick={() =>
                functionTOCopy(
                  `${fron_end_main_domain}/register?ref=${wallet?.referral_code}`
                )
              }
            >
              <Typography sx={{}}>INVITATION LINK</Typography>
            </NavLink>
          </Box>
        </Box>
        <Box sx={style.invitebutton} className="invitebutton">
          <Box sx={style.invitbox}>
            <Stack direction="row">
              <Box
                sx={{}}
                component="img"
                src={copyIimage}
                className="!cursor-pointer"
                onClick={() => functionTOCopy(wallet?.referral_code)}
              ></Box>
              <Typography variant="body1">Copy invitation code</Typography>
            </Stack>
            <Stack direction="row">
              <Typography variant="body1">{wallet?.referral_code}</Typography>
              <ArrowForwardIosOutlinedIcon />
            </Stack>
          </Box>
          <NavLink to="/promotion/TeamReport">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                <Box
                  component="img"
                  sx={{}}
                  src={donut}
                ></Box>
                <Typography variant="body1">Subordinate data</Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          <NavLink to="/promotion/SubordinateIncome">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                <Box
                  component="img"
                  sx={{}}
                  src={donut3}
                ></Box>
                <Typography variant="body1">Subordinate Income</Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          <NavLink to="/promotion/Commission">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                <Box
                  component="img"
                  sx={{}}
                  src={donut2}
                ></Box>
                <Typography variant="body1">Commission Income</Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          <NavLink to="/account/income-main">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                <Box
                  component="img"
                  sx={{}}
                  src={money}
                ></Box>
                <Typography variant="body1">Income data</Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>
          <NavLink to="/promotion/TeamReport/data">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                <Box
                  component="img"
                  sx={{}}
                  src={donut1}
                ></Box>
                <Typography variant="body1">Team data</Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>

          <NavLink to="/customerLine/">
            <Box sx={style.invitbox}>
              <Stack direction="row">
                <Box
                  component="img"
                  sx={{}}
                  src={cus_service}
                ></Box>
                <Typography variant="body1">
                  Agent line customer service
                </Typography>
              </Stack>
              <Stack direction="row">
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>
          </NavLink>

          <Box sx={style.promotionBoxOuter}>
            <Box sx={style.promotionBox}>
              <Stack direction="row">
                <Box
                  component="img"
                  src={promotion_data}
                  sx={{}}
                ></Box>
                <Typography variant="body1" sx={{ color: "black !important" }}>
                  Promotion data
                </Typography>
              </Stack>
            </Box>
            <Stack direction="row">
              <Box className="!text-black">
                <DashboardRounded />
                <Typography variant="body1" >
                  {Number(get?.this_week_commission || 0)?.toFixed(4)}
                </Typography>
                <Typography variant="body1">This Week</Typography>
              </Box>
              <Box className="!text-black">
                <Money />
                <Typography variant="body1" >
                  {Number(get?.total_commission || 0)?.toFixed(4)}
                </Typography>
                <Typography variant="body1">Total Commission</Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <Box className="!text-black">
                <EmojiPeopleOutlinedIcon />
                <Typography variant="body1">
                  {Number(result?.total_direct_reg || 0)?.toFixed(0, 2)}
                </Typography>
                <Typography variant="body1">Direct subordinate</Typography>
              </Box>
              <Box className="!text-black">
                <Groups2OutlinedIcon />
                <Typography variant="body1">{Number(result?.total_team_reg || 0)?.toFixed(0, 2)}</Typography>
                <Typography variant="body1">Team subordinates</Typography>
              </Box>
            </Stack>
          </Box>
          <Box sx={style.promotionBoxOutertwo}></Box>
        </Box>
        {/* 
        {openDialogBoxHomeBanner && (
          <Dialog PaperProps={{ width: "500px", height: "500px" }} open={openDialogBoxHomeBanner}>
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
        {result?.status_of_deposit_popup === 1 ?
          <MyModal />
          : ""}

      </Container>
    </Layout>
  );
}

export default Promotion;

const style = {
  header: {
    padding: "10px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "black",
    },
  },
  commitionboxOuter: {
    background: '#E32724',
    padding: "20px 10px",
    backgroundImage: `url(${promotion})`,
    backgroundSize: '100%',
    position: 'absolute',
    width: '100%',
    height: '35vh',
  },
  commitionbox: {
    margin: "auto",
    width: "70%",
    textAlign: "center",
    // py: 5,
    "&>p:nth-child(1)": { fontSize: "25px", fontWeight: "500" },
    "&>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: "400",
      padding: "5px 0px",
      background: lightblue,
      borderRadius: "20px",
    },
    "&>p:nth-child(3)": {
      fontSize: "13px",
      fontWeight: "400",
      marginTop: "5px",
    },
  },
  subordinatesleft: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: '#F2413B',
    borderTopLeftRadius: "10px",
    borderRight: "2px solid white",
    "&>svg": { color: "white", fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "white", fontSize: "14px", fontWeight: "500" },
  },
  subordinatesleft2: {
    width: "100%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: '#F2413B',
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderRight: "2px solid white",
    "&>svg": { color: "white", fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "white", fontSize: "14px", fontWeight: "500" },
  },
  subordinatesRight: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: '#F2413B',
    borderTopRightRadius: "10px",
    "&>svg": { color: "white", fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "white", fontSize: "14px", fontWeight: "500" },
  },
  boxStyles: {
    // backgroundImage: `url(${bgms1})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: '100% 100%',
    background: '#fff',
    padding: "15px 15px",
    display: "flex",
    borderRadius: " 0px 0px 10px 10px",
  },
  innerBoxStyles: {
    width: "50%",
    borderRight: "1px solid black",
    borderBottomLeftRadius: "10px",
    padding: "0px 0px",
  },
  innerBoxStylestwo: { width: "50%", padding: "0px 0px" },
  subcordinatelist: {
    textAlign: "center",
    "&>p:nth-child(1)": { color: lightblue, fontSize: "13px" },
    "&>p:nth-child(2)": { color: '#575757', fontSize: "13px" },
    mb: 1,
  },
  subcordinateBox: {
    width: "100%",
    padding: "10px 10px",

  },
  invitebutton: {
    width: "100%",
    background: bgdarkgray,
  },
  invitebtn: {
    mt: "20px",
    "&>a>p": {
      width: "95%",
      marginLeft: "2.5%",
      borderRadius: "20px",
      textAlign: "center",
      padding: "6px",
      background: bggrad,
      color: "white",
      fontSize: "17px",
      fontWeight: 600,
      mb: 2,
    },
  },
  invitbox: {
    width: "95%",
    background: '#fff',
    padding: "10px",
    mb: "20px",
    borderRadius: "10px",
    marginLeft: "2.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div>img": { width: "30px", marginRight: "10px" },
    "&>div>p": { fontSize: "14px", color: "black !important" },
    "&>div": { alignItems: "center" },
    "&>div:nth-child(2)>p": { marginRight: "20px", color: "black !important" },
    "&>div:nth-child(2)>svg": {
      fontSize: "14px",
      marginRight: "10px",
      color: "black !important",
    },
  },
  promotionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div:nth-child(1)": { alignItems: "center" },
    "&>div:nth-child(1)>img": { width: "35px", marginRight: "10px" },
    "&>div:nth-child(1)>p": {
      fontSize: "17px",
      fontWeight: 500,
      color: "black !important",
    },
  },
  promotionBoxOuter: {
    width: "95%",
    background: '#fff',
    padding: "10px",
    mt: "20px",
    borderRadius: "5px",
    marginLeft: "2.5%",
    paddingBottom: "15px",
    "&>div:nth-child(2)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid gray",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div>p:nth-child(1)": { color: "black !important" },
    "&>div:nth-child(2)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "black !important",
    },
    "&>div:nth-child(3)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid #ff00001f",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div>p:nth-child(1)": { color: "black !important" },
    "&>div:nth-child(3)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "black !important",
    },
  },
  promotionBoxOutertwo: {
    width: "90%",
    padding: "10px",
    borderRadius: "5px",
    marginLeft: "5%",
    paddingBottom: "90px",
  },
};
