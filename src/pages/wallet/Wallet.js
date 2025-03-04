import {
  Box,
  Button,
  Container,
  Stack,
  Typography
} from "@mui/material";
import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import CustomCircularProgress from "../../Shared/CustomCircularProgress";
import MyModal from "../../Shared/Modal";
import {
  bgdarkgray,
  bggrad
} from "../../Shared/color";
import wallet from "../../assets/images/save_wallet.png";
import service_guide from "../../assets/rechargeHistory-b5a853c0.png";
import rechargeIcon from "../../assets/rechargeIcon-e515aee4.png";
import wallettransfer1 from "../../assets/widthdrawBlue-80197e64.png";
import deposite from "../../assets/withdrawHistory-fb2bafcf.png";
import Layout from "../../component/Layout/Layout";
import { JiliwalletFn, walletamount, yesterdayFn } from "../../services/apicalling";

function Wallet() {

  const { isLoading, data } = useQuery(["walletamount"], () => walletamount(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const amount = data?.data?.data || 0;

  const series = [(Number(Number(amount?.wallet || 0) % 100) || 0)?.toFixed(2),]
  const series2 = [(Number(Number(amount?.winning || 0) % 100) || 0)?.toFixed(2),];


  const {data:jili} =useQuery(["Jili_wallet"],()=> JiliwalletFn(),{
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  })
  const jili_wallet = jili?.data?.jilli_wallet_amnt || []

  const { data: status } = useQuery(["yesterday_income"], () => yesterdayFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const statusyesterday = status?.data?.data

  const [options] = React.useState({
    colors: ["#EB3430", "red", "green"],
    chart: {
      height: 150,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "11px",
          },
          value: {
            fontSize: "16px",
          },
        },
        stroke: {
          colors: ["#EB3430"],
        },
      },
      radialBar: {
        dataLabels: {
          show: false,
        },
      },
    },
    labels: ["0.40%", "B", "C", "D"],
  });

  return (
    <Layout>
      <Container
        className="no-scrollbar"
        sx={{
          background: bgdarkgray,
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{

            marginTop: "50px",
            background: bggrad,
            border: '1px solid #D9AC4F',
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: '100%',
            }}
          >

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%'
              }}
              className="walletBox"
            >
              <Box component="img" src={wallet} width={40} ></Box>
              <Typography variant="h2" color="initial" sx={{ color: 'white' }}>
                ₹ {Number(
                  Number(amount?.wallet || 0) + Number(amount?.winning || 0) + Number(amount?.working_wallet || 0)
                )?.toFixed(2)}

              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ color: 'white' }}
              >
                Total balance
              </Typography>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} sx={{ width: '100%', padding: '0px 16px 16px' }}>
                <div class="visa_info">
                  <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="body1" sx={{ color: 'white', fontSize: '13px', }}>0</Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontSize: '13px', }}>Total amount</Typography>
                  </Box>
                </div>
                <div class="visa_logo">
                  <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="body1" sx={{ color: 'white', fontSize: '13px', }}>0</Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontSize: '13px', }}>Total deposit amount</Typography>
                  </Box>
                </div>
              </Stack>
            </Box>
          </Box>
        </Box>
        {/*  */}

        <Box className="wallet-track-box">
          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >

            <Stack
              direction="row"
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",

                pb: 2,
                borderRadius: '10px',
              }}
            >
              <Box sx={{ width: "50%", position: "relative" }}>

                <Typography

                  variant="body1"
                  color="initial"
                  sx={{
                    position: "absolute",
                    left: "39%",
                    top: "32%",
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "black",
                    textAlign: 'center !important',
                    ml: '-3%',
                    mt: '1%',
                  }}
                >
                  {series}
                </Typography>

                <ReactApexChart
                  options={options}
                  series={series}
                  type="radialBar"
                  height={150}
                 />
                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "black", fontWeight: "500", fontFamily: 'inter !important' }}
                  >
                    {Number(amount?.wallet)?.toFixed(0,2)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "black", fontWeight: "500", fontFamily: 'inter !important' }}
                  >
                    Main wallet
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "50%", position: "relative" }}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{
                    position: "absolute",
                    color: "black",
                    left: "40%",
                    top: "32%",
                    fontSize: "15px",
                    fontWeight: "400",
                    ml: '-3%',
                    mt: '1%',
                  }}
                >
                  {series2}
                </Typography>
                <ReactApexChart
                  options={options}
                  series={series2}
                  type="radialBar"
                  height={150}
                />
                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { fontSize: "11px", fontWeight: 500 },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "black", fontWeight: "500", fontFamily: 'inter !important' }}
                  >
                    {Number(jili_wallet)?.toFixed(0,2)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "black", fontWeight: "500", fontSize: '13px', fontFamily: 'inter !important' }}
                  >
                    Game wallet
                  </Typography>
                </Box>
              </Box>
            </Stack>

          </Stack>
          <Button sx={{ color: 'white', background: bggrad, borderRadius: '25px', padding: '8px', width: '90%', ml: '5%', fontWeight: '700', textTransform: 'capitalize', }}>Main wallet transfer</Button>
          <div style={{ padding: '5px', borderRadius: '10px', marginTop: '16px', marginBottom: '100px' }}>
            <Box sx={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'start', justifyContent: 'flex-start', '&>a': { width: '25%', },
              '&>a>div': { display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', padding: '5px' },
              'a>div>p': { textAlign: 'center', fontSize: '13px', color: '#9a8f8f', fontFamily: 'inter !important' },
              '&>a>div>img': { width: '65px', filter: 'hue-rotate(-346deg)' },
            }}>
              <NavLink to="/wallet/Recharge">
                <div className=" " >
                  <p className=" mt-0">Deposit</p>
                  <Box component="img" src={rechargeIcon} ></Box>
                </div>
              </NavLink>
              <NavLink to="/Withdrawal">
                <div className=" " >
                  <p className=" mt-0">Withdrawal</p>
                  <Box component="img" src={wallettransfer1} className="!text-blue-500" ></Box>
                </div>
              </NavLink>
              <NavLink to="/depositHistory">
                <div className=" " >
                  <p className=" mt-0">Deposit history</p>
                  <Box component="img" src={service_guide} ></Box>
                </div>
              </NavLink>
              <NavLink to="/withdravalHistory">
                <div className=" " >
                  <p className=" mt-0">Withdrawal history</p>
                  <Box component="img" src={deposite} ></Box>
                </div>
              </NavLink>
            </Box>
          </div>
        </Box>
        <CustomCircularProgress isLoading={isLoading} />
        {statusyesterday?.status_of_deposit_popup === 1 ?
          <MyModal />
          : ""}

      </Container>
    </Layout>
  );
}

export default Wallet;