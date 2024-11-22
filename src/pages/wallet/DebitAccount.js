import {
    Button,
    CircularProgress,
    Container,
    TextField
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Layout from "../../component/Layout/Layout";
import { JiliwalletFn, walletamount } from "../../services/apicalling";
import { endpoint } from "../../services/urls";
import { enCryptData } from "../../Shared/secret";

function DebitAccount() {
    const client = useQueryClient()
    const login_data = localStorage.getItem("logindataen")
        && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"),
            "anand")?.toString(CryptoJS.enc.Utf8) || null;
    const user_id = login_data && JSON.parse(login_data)?.UserID;

    const { isLoading, data } = useQuery(["jili_wallet"], () => JiliwalletFn(), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retryOnMount: false,
        refetchOnWindowFocus: false
    });
    const amount = data?.data?.jilli_wallet_amnt || 0;

    const { data: main } = useQuery(["walletamount"], () => walletamount(), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retryOnMount: false,
        refetchOnWindowFocus: false
    });
    const walletmain = main?.data?.data || [];

    const initialValues = {
        user_id: "",
        transfer_amount: "",
    };

    const fk = useFormik({
        initialValues: initialValues,
        onSubmit: async () => {
            if(!fk.values.transfer_amount){
                return toast("Please Enter Amount")
            }
            const reqbody = {
                user_id: user_id,
                transfer_amount: fk.values.transfer_amount,
            };
            // console.log(reqbody);
            DebitFn(reqbody)
        },
    });

    const DebitFn = async (reqbody) => {
        try {
            const res = await axios.post(endpoint.jili_debit_api, {
                payload: enCryptData(reqbody)
            });
            toast(res?.data?.msg);
            if (res?.data?.msg === "Balance decreased successfully") {
                client.refetchQueries("walletamount")
                client.refetchQueries("jili_wallet")
                fk.handleReset()
            }
        } catch (e) {
            console.log(e);
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <CircularProgress />
            </Layout>
        );
    }

    return (
        <Layout>
            <Container>
                <div className="">
                    <div className="mt-14 w-full bg-white bg-opacity-5 gap-2 p-5">
                        <div className="!flex justify-between !mb-10 p-1" >
                            <div className="!flex !flex-col">
                                <span className="!text-xs">  Main Wallet : {Number(walletmain?.wallet)?.toFixed(0,2)}</span>
                                <span className="!text-xs"> Winning Wallet : {Number(walletmain?.winning)?.toFixed(0,2)} </span>
                            </div>
                            <span className="!text-xs">Jili Wallet : {Number(amount)?.toFixed(0,2)}</span>
                        </div>


                        <div className="mt-5">Transfer Amount</div>
                        <TextField
                            fullWidth
                            placeholder="Enter Wallet Amount"
                            className="!bg-white !bg-opacity-5"
                            size="small"
                            type="number"
                            id="transfer_amount"
                            name="transfer_amount"
                            value={fk.values.transfer_amount}
                            onChange={fk.handleChange}
                        />

                        <div className="mt-5 !flex !justify-between gap-2">
                            <Button
                                variant="contained"
                                className={`!bg-[#FF7D89] place-items-center`}
                                onClick={() => fk.resetForm()}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                className={`!bg-[#47C45D] place-items-center`}
                                onClick={fk.handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export default DebitAccount;

const styles = {
    root: { background: "#202020", pb: 6 },
    depositWithdrawIcon: { width: "30px", height: "30px" },
};
