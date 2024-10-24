import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
  bgdarkgray,
  bggrad,
  zubgback,
  zubgbackgrad,
  zubgmid,
  zubgtext,
} from "../../../Shared/color";
import deposit from "../../../assets/rechargeHistory.png";
import Layout from "../../../component/Layout/Layout";
import { withdrawlHistoryFunction } from "../../../services/apicalling";
import theme from "../../../utils/theme";

function WithdravalHistory() {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(
    ["deposit_history"],
    () => withdrawlHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = data?.data?.data;

  return (
    <Layout>
      <Container
        sx={{
          background: 'white',
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box>
          <Box
            sx={{
              padding: "10px",
              borderRadius: "10px",
              mb: 5,
              mt: 9,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: 3 }}>
              <Box component="img" src={deposit} width={30}></Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "15px ", color: "black", ml: "10px" }}
              >
                Withdrawal history
              </Typography>
            </Stack>
            {res?.map((i) => {
              return (
                <Box
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    background: '#fff',
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <Box>
                      <Button
                        sx={{
                          background: '#E9302C',
                          color: "white",
                          textTransform: "capitalize",
                        }}
                      >
                        Withdrawal
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        sx={{ color: "green", textTransform: "capitalize" }}
                        className={`${i?.tr15_status === "Success"
                          ? "!text-green-700"
                          : "!text-red-500"
                          }`}
                      >
                        {i?.tr15_status}
                      </Button>
                      <IconButton>
                        <ArrowForwardIcon sx={{ color: zubgtext }} />
                      </IconButton>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography variant="body1">Balance</Typography>
                    <Typography variant="body1">₹ {i?.tr15_amt}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography variant="body1">Date/Time</Typography>
                    <Typography variant="body1">
                      {moment(i?.tr15_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.tr15_date)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography variant="body1">Status</Typography>
                    <Typography variant="body1">{i?.tr15_status} </Typography>
                  </Stack>
                  {i?.success_date !== null && i?.success_date !== "" && (
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography variant="body1">Success Date/Time</Typography>
                      <Typography variant="body1" className="!text-green-700">
                        {moment(i?.success_date)?.format("DD-MM-YYYY")}{" "}
                        {moment(i?.success_date)?.format("HH:mm:ss")}
                      </Typography>
                    </Stack>
                  )}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: zubgtext },
                    }}
                  >
                    <Typography variant="body1">Trans number</Typography>
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&>p": { color: zubgtext },
                      }}
                    >
                      <Typography variant="body1">{i?.tr15_trans}</Typography>
                      {/* <IconButton>
                        <ContentCopyIcon sx={{ color: zubgtext }} />
                      </IconButton> */}
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
            {/* <Button sx={style.paytmbtntwo}>All history</Button> */}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default WithdravalHistory;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgtext,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",

    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};