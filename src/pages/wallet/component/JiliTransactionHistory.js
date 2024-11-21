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
    zubgtext
} from "../../../Shared/color";
import deposit from "../../../assets/service_feedback.png";
import { JiliTransactionHistoryFn } from "../../../services/apicalling";
import Layout from "../.././../component/Layout/Layout";

function JiliTransactionHistory() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const { isLoading, data } = useQuery(
        ["jilil_history"],
        () => JiliTransactionHistoryFn(),
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
                                Jili Transaction History
                            </Typography>
                        </Stack>
                        {res?.map((i) => {
                            return (
                                <Box
                                    sx={{
                                        mb: 2,
                                        padding: "15px",
                                        borderRadius: "10px",
                                        background: '#d8d6d6',
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
                                                Jili
                                            </Button>
                                        </Box>

                                        <Box>
                                            <Button
                                                sx={{ color: "green", textTransform: "capitalize" }}
                                                className={`${i?.transfer_status === "Approve"
                                                    ? "!text-green-500 !text-[15px]"
                                                    : "!text-red-500 !text-[15px]"
                                                    }`}
                                            >
                                                {i?.transfer_status}
                                            </Button>
                                            <IconButton>
                                                <ArrowForwardIcon sx={{ color: zubgtext }} />
                                            </IconButton>
                                        </Box>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        sx={{
                                            mt: "10px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            "&>p": { color: zubgtext },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            Balance
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            ₹ {Number(i?.transfer_amount)?.toFixed(2) || 0}
                                        </Typography>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        sx={{
                                            my: "5px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            "&>p": { color: zubgtext },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            Status
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            {i?.transfer_status}{" "}
                                        </Typography>
                                    </Stack>


                                    <Stack
                                        direction="row"
                                        sx={{
                                            mb: "5px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            "&>p": { color: zubgtext },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            Type
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                mb: "5px",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                "&>p": { color: zubgtext },
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="initial"
                                                className="!text-[15px] "
                                            >
                                                <p> {i?.transfer_type === "Dr" ? "Debit" : i?.transfer_type === "Cr" ? "Credit" : ""}</p>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            mb: "5px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            "&>p": { color: zubgtext },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            Transaction ID
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                mb: "5px",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                "&>p": { color: zubgtext },
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="initial"
                                                className="!text-[15px]"
                                            >
                                                <p> {i?.transactoin_id}</p>
                                            </Typography>

                                    
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            mb: "5px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            "&>p": { color: zubgtext },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            Date/Time
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            {moment(i?.initiate_date)?.format("DD-MM-YYYY")}{" "}
                                            {moment.utc(i?.initiate_date)?.format("HH:mm:ss")}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            mb: "5px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            "&>p": { color: zubgtext },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                            className="!text-[15px]"
                                        >
                                            Description
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                mb: "5px",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                "&>p": { color: zubgtext },
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="initial"
                                                className="!text-[15px]"
                                            >
                                                <p className="pt-1"> {i?.transfer_descriptoin?.substring(0, 25)}
                                                </p>
                                                <p>   {i?.transfer_descriptoin?.substring(25, 50)} </p>
                                               
                                            </Typography>

                                            {/* <IconButton>
                        <ContentCopyIcon sx={{ color: zubgtext }} />
                      </IconButton> */}
                                        </Stack>
                                    </Stack>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}

export default JiliTransactionHistory;
