import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailReadOutlined";
import Person4Icon from '@mui/icons-material/Person4';
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { flexbetween, flexcenter, flexcenterstart, normalinput, passwordinput } from '../../../Shared/Commom';
import { storeCookies } from "../../../Shared/CookieStorage";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { signupSchemaValidataon } from "../../../Shared/Validation";
import { bgcolorlight, bgcolorlight2, bggold, bggrad, bggray } from "../../../Shared/color";
import flag from "../../../assets/img/flag.png";
import logo from "../../../assets/img/logo.png";
import Layout from '../../../component/Layout/Layout';
import { CandidateNameFn } from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";
import theme from '../../../utils/theme';
import VerifyregistrationOtp from './VerifyregistrationOtp';
import passwordic from "../../../assets/password.png"
import emailic from "../../../assets/email_tab.png"
import svgrepo from "../../../assets/copycode.png"
import viewsvg1 from "../../../assets/eye_open.png"
import viewsvg from "../../../assets/eye_close.png"
import ag_first from "../../../assets/ag_first.png";
import phoneic from "../../../assets/phone.png";


function Register() {
  const navigate = useNavigate();
  const [isOpenOTPBox, setIsOpenOTPBox] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [show_confirm_password, set_show_confirm_password] =
    React.useState(false);
  const [loding, setloding] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const url = new URL(window.location.href);
  const [refParam, setrefParam] = useState(url.searchParams.get("ref") || "");
  const handle_confirm_ClickShowPassword = () =>
    set_show_confirm_password(!show_confirm_password);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValue = {
    email: "",
    mobile: "",
    name: "",
    pass: "",
    confirmpass: "",
    refid: refParam,
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      if (fk.values.pass !== fk.values.confirmpass)
        return toast("Password and confirm password should be same.");
      // if (!fk.values.privacy_policy)
      //   return toast("Please confirm the privacy policy.");

      const reqBody = {
        email: fk.values.email,
        mobile: String(fk.values.mobile) || "",
        pass: fk.values.pass,
        confirmpass: fk.values.confirmpass,
        refid: result?.id,
        name: fk.values.name,
        // privacy_policy: false,
      }

      Sendotp(reqBody);
    },
  });
  const Sendotp = async (reqbody) => {
    setloding(true);
    try {
      const response = await axios.post(endpoint.registration_send_otp, reqbody,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      toast.success(response?.data?.msg, { id: 1 });
      if ("OTP sent Successfully" === response?.data?.msg) {
        setIsOpenOTPBox(true)
      }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
    setloding(false);
  };


  const { data } = useQuery(
    ["getname", fk.values.refid],
    () => CandidateNameFn({ userid: fk.values.refid }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const result = data?.data?.data;

  return (
    isOpenOTPBox ? <VerifyregistrationOtp result={result} newfk={fk} /> :
      <Layout header={false} footer={false}>
        <Box sx={style.authheader}>
          <Container>
            <Box sx={{ ...flexbetween, background: bggrad, px: 1, py: 1 }}>
              <Box to={'/'} component={NavLink} sx={{ width: "20%" }}>
                <ArrowBackIosNewIcon sx={style.icon1} />
              </Box>
              <Box sx={{ width: "60%" }}>
                <Box component="img" src={logo} sx={style.logocss}></Box>
              </Box>
              <Box component={NavLink} sx={{ width: "20%" }}>
                <Box sx={{ ...flexcenter, float: "right" }}>
                  <Box component="img" src={flag} sx={style.flagcss}></Box>
                  <Typography variant="body1" ml={1} sx={{ color: "white  " }}>
                    EN
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: 1, background: bggrad, pt: 2 }}>
              <Typography
                sx={{ color: "white ", mb: 1 }}
                variant="h6"
                className="funp15"
              >
                {" "}
                Register{" "}
              </Typography>
              <Typography sx={{ color: "white " }} className="funp11" mb={2}>
                Please register by phone number or email
              </Typography>
            </Box>
          </Container>
        </Box>

        <Container >
          <Box sx={style.authform} component="form">
            <Box sx={{
              ...style.flexcoloumcenter, ...style.registerheader, borderBottom: '2px solid red',
              paddingBottom: '10px'
            }}>
              <Box component={"img"} src={phoneic} sx={{ width: '27px' }}></Box>
              <Typography variant="body1" sx={{ color: bggold, fontSize: '15px ', fontWeight: '700', }}>
                Register your account
              </Typography>
            </Box>
          </Box>
          <Box
            component="form"
            sx={{
              width: "90%",
              marginLeft: "5%",
              pb: 5,
              transition: "0.3s",
            }}
            onSubmit={fk.handleSubmit}
          >
            <Box mt={0}>
              <FormControl fullWidth>
                <Box sx={{ ...flexcenterstart, my: 1, }}>
                  <Box component={"img"} src={ag_first} sx={{ width: '24px' }}></Box> <Typography variant="body1" ml={1} sx={{ color: 'black' }}> Name</Typography>
                </Box>
                <TextField
                  className="funp13"

                  id="name"
                  placeholder="Enter Name"
                  sx={{ ...normalinput, width: '100%', }}
                  name="name"
                  type="text"
                  value={fk.values.name}
                  onChange={fk.handleChange}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.name && fk.errors.name && (
                  <div className="error">{fk.errors.name}</div>
                )}
              </FormControl>
            </Box>

            <FormControl fullWidth>
              <Box sx={{ ...flexcenterstart, my: 1, }}>
                <Box component={"img"} src={phoneic} sx={{ width: '20px' }}></Box>
                {" "}
                <Typography variant="body1" ml={1} sx={{ color: "black" }}>
                  {" "}
                  Phone number
                </Typography>
              </Box>
              <Box sx={{ ...style.flexbetween }}>
                <TextField
                  className="funp13"
                  sx={{ ...normalinput, width: '100%', }}
                  ml={2}
                  id="mob"
                  name="mobile"
                  type="number"
                  value={fk.values.mobile}
                  onChange={fk.handleChange}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                  placeholder="Enter Phone Number"
                />
              </Box>
              {fk.touched.mobile && fk.errors.mobile && (
                <div className="error">{fk.errors.mobile}</div>
              )}
            </FormControl>

            <Box>
              <FormControl fullWidth>
                <Box sx={{ ...flexcenterstart, my: 1, }}>
                  <Box component={"img"} src={emailic} sx={{ width: '24px' }}></Box>{" "}
                  <Typography variant="body1" ml={1} sx={{ color: "black" }}>
                    E-mail
                  </Typography>
                </Box>
                <TextField
                  className="funp13"
                  id="fullWidth"
                  type="email"
                  placeholder="Enter email"
                  sx={{ ...normalinput, width: '100%', }}
                  name="email"
                  value={fk.values.email}
                  onChange={fk.handleChange}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.email && fk.errors.email && (
                  <div className="error">{fk.errors.email}</div>
                )}
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <Box sx={{ ...flexcenterstart, my: 1, }}>
                  <Box component={"img"} src={passwordic} sx={{ width: '24px' }}></Box>{" "}
                  <Typography variant="body1" ml={1} sx={{ color: "black" }}>
                    Set password
                  </Typography>
                </Box>
                <OutlinedInput
                  className="funp13"
                  placeholder="Enter password"
                  name="password"
                  sx={{ ...passwordinput, width: '100%', }}
                  value={fk.values.password}
                  onChange={fk.handleChange}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Box component={"img"} src={viewsvg1} sx={{ width: '24px', mr: 1, }}></Box>
                        ) : (

                          <Box component={"img"} src={viewsvg} sx={{ width: '24px', mr: 1, }}></Box>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {fk.touched.password && fk.errors.password && (
                  <div className="error">{fk.errors.password}</div>
                )}
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <Box sx={{ ...flexcenterstart, my: 1, }}>
                  <Box component={"img"} src={passwordic} sx={{ width: '24px' }}></Box>{" "}
                  <Typography variant="body1" ml={1} sx={{ color: "black" }}>
                    Confirm password
                  </Typography>
                </Box>
                <OutlinedInput
                  className="funp13"
                  sx={{ ...passwordinput, width: '100%', }}
                  name="confirmed_password"
                  id="confirmed_password"
                  value={fk.values.confirmed_password}
                  onChange={fk.handleChange}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                  placeholder="Enter confirm password"
                  type={show_confirm_password ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handle_confirm_ClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {show_confirm_password ? (
                          <Box component={"img"} src={viewsvg1} sx={{ width: '24px', mr: 1, }}></Box>
                        ) : (

                          <Box component={"img"} src={viewsvg} sx={{ width: '24px', mr: 1, }}></Box>

                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {fk.touched.confirmed_password && fk.errors.confirmed_password && (
                  <div className="error">{fk.errors.confirmed_password}</div>
                )}
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <Box sx={{ ...flexcenterstart, my: 1, }}>
                  <Box component={"img"} src={svgrepo} sx={{ width: '24px' }}></Box>{" "}
                  <Typography variant="body1" ml={1} sx={{ color: "black" }}>
                    Referral Code
                  </Typography>
                </Box>
                <TextField
                  className="funp13"
                  id="referral_code"
                  placeholder="Enter Referral Code"
                  sx={{ ...normalinput, width: '100%', }}
                  name="referral_code"
                  value={fk.values.referral_code}
                  onChange={fk.handleChange}
                  onKeyDown={(e) => e.key === "Enter" && fk.handleSubmit()}
                />
                {fk.touched.referral_code && fk.errors.referral_code ? (
                  <div className="error">{fk.errors.referral_code}</div>
                ) : fk.values.referral_code ? (
                  result ? (
                    <div className="no-error">Referral From: {result}</div>
                  ) : (
                    <div className="error">Invalid Referral Id</div>
                  )
                ) : null}

              </FormControl>
            </Box>
            <Box mt={1}>
              <FormControl fullWidth>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={fk.values.privacy_policy}
                      sx={{ color: 'red !important', fontSize: "12px", fontWeight: "500", '&>label>div>span': { color: 'red !important' } }}
                      onClick={() =>
                        fk.setFieldValue(
                          "privacy_policy",
                          !fk.values.privacy_policy
                        )
                      }
                    />
                  }
                  label={
                    <span style={{ color: 'black', fontSize: "12px", }}>
                      I have read and agree to the{' '}
                      <a
                        rel="noopener noreferrer"
                        style={{ color: 'black', textDecoration: 'underline' }}
                      >
                        Privacy Agreement
                      </a>
                    </span>
                  }
                />
              </FormControl>
            </Box>
            <Stack mt={1}>
              <Box sx={{ width: '100%' }}> <Button className='goldbtn2' onClick={fk.handleSubmit}>Register</Button></Box>
              <Box sx={{ width: '100%' }}>
                <NavLink to='/'>
                  <Button className='goldborderbtn'>Back to Login</Button>
                </NavLink>
              </Box>
            </Stack >

          </Box>
          <CustomCircularProgress isLoading={loding} />
        </Container>
      </Layout>
  );
}

export default Register;

const style = {
  authheader: { background: bggray },
  logocss: { width: "116px", margin: 'auto', },
  flagcss: { width: "30px" },
  icon: { color: bggold },
  icon1: { fontSize: "18px", color: "white" },
  icon2: { color: bggold, mr: 1 },

  authform: { width: "100%", padding: 2 },
  tabs: { width: "100%", "&>p": { textTransform: "none" } },
  checkbox: {
    mt: 1,
    "&>span>svg": { color: bggold },
  },
  loginfooter: { width: "70%", margin: "auto", mt: 5 },
  footericon: { color: bggold, fontSize: "30px", mb: 1 },
  flexbetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between;",
  },
  flexcenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexcoloumcenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: { color: bggold },
  // icon2: { color: bggold, mr: 1 },
};