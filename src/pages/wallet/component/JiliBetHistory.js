import {
    AccordionSummary,
    Box,
    Container,
    Stack,
    Typography
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import {
    zubgtext
} from "../../../Shared/color";
import deposit from "../../../assets/service_feedback.png";
import { JiliBetHistoryFn } from "../../../services/apicalling";
import Layout from "../.././../component/Layout/Layout";

function JiliBetHistory() {

    const { isLoading, data } = useQuery(
        ["jilil_history"],
        () => JiliBetHistoryFn(),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

    const res = data?.data?.data || [];

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
                        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
                            <Box component="img" src={deposit} width={30}></Box>
                            <Typography
                                variant="body1"
                                color="initial"
                                sx={{ fontSize: "15px ", color: "black", ml: "10px" }}
                            >
                                Jili Bet History
                            </Typography>
                        </Stack>
                        {res?.map((i) => {
                            return (
                                <Box
                                    sx={{
                                        mb: 2,
                                        padding: "1px",
                                        borderRadius: "10px",
                                        background: '#d8d6d6',
                                    }}
                                >
                                    <AccordionSummary
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{
                                            background: "white",
                                            color: zubgtext,
                                            borderRadius: "5px",
                                            margin: "0px important",
                                            mb: 1,
                                        }}
                                    >
                                        <Box className="flexbetween">
                                            <div className="!flex  !flex-col gap-1">

                                                <Box className="flexrowsstart">
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ color: "", }}
                                                        className="!font-bold !pr-1"
                                                    >
                                                        {i?.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ color: "green" }}
                                                        className="!text-[11px]"
                                                    >
                                                        <span className="!text-black"> Bet Amount : </span> {i?.betAmount}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        className="funp15"
                                                        sx={{ color: "#0D0335", textDecoration: "none" }}
                                                    >
                                                        <span className="!text-[14px]">{i?.gamesno}</span>
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        className="funp13 "
                                                        sx={{ color: "#0D0335" }}
                                                    > <span className="!text-black !text-[10px]">D/T : </span>
                                                        <span className="!text-[10px] !text-gray-500">
                                                            {moment(i?.createdAt)?.format("DD-MM-YYYY")}{" "}
                                                            {moment.utc(i?.createdAt)?.format("HH:mm:ss")}
                                                        </span>
                                                    </Typography>
                                                </Box>
                                            </div>
                                            <Box className="flexrows">
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        borderRadius: "5px",
                                                        padding: "1px 10px",
                                                        border: `.5px solid red`,
                                                        color: "red",
                                                    }}
                                                    className={` funp15
                        !w-[80px] !text-center
                         ${i?.winAmount === 0
                                                            ? "!text-red-400"
                                                            : "!text-green-400 !border-[.5px] !border-green-500"

                                                        } !py-0`}
                                                >
                                                    {" "}
                                                    {i?.winAmount === 0
                                                        ? "Failed"
                                                        : "Success"
                                                    }
                                                </Typography>
                                             

                                                <Typography
                                                    variant="body1"
                                                    className="!mt-2 !text-xs"

                                                >
                                                    {" "}
                                                    {i?.round}
                                                </Typography>
                                                {i?.winAmount === 0 ? "" :
                                                    <Typography
                                                        variant="body1"
                                                        className=""
                                                    >
                                                        {" "}
                                                       Win : ₹ {Number(i?.winAmount)?.toFixed(2)}
                                                    </Typography>}
                                            </Box>
                                        </Box>
                                    </AccordionSummary>

                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}

export default JiliBetHistory;
