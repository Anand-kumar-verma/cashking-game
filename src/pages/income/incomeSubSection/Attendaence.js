import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";
import moment from "moment";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { bgdarkgray, bgtan, zubgback, zubgbackgrad, zubgmid, zubgshadow, zubgtext } from "../../../Shared/color";
import nodatafoundimage from "../../../assets/images/nodatafoundimage.png";
import Layout from "../../../component/Layout/Layout";
import {
  AttendenceIncomeFn
} from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";

function Attendence() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const client = useQueryClient();
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const ClaimIncomeFn = async (id) => {
    try {
      const response = await axios.get(
        `${endpoint.claim_income}?t_id=${id}`
      );
      client.refetchQueries("attendence_bonus");
      client.refetchQueries("walletamount");
      toast(response?.data?.msg);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const { isLoading, data } = useQuery(
    ["attendence_bonus"],
    () => AttendenceIncomeFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const res = data?.data?.data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      res?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, res]);


  if (!isLoading && !res)
    return (
      <Layout header={false}>
        <Container
          sx={{
            background: zubgback,
            width: "100%",
            height: "100vh",
            overflow: "auto",
            mb: 5,
          }}
        >
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon style={{ color: bgtan }} />
            </Box>
            <p style={{ color: bgtan }}>Attendance  Income</p>
          </Box>
          <div>
            <img className="" src={nodatafoundimage} />
          </div>
        </Container>
      </Layout>
    );
  return (
    <Layout header={false}>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon sx={{ color: bgtan }} />
          </Box>
          <p style={{ color: bgtan }}>Attendance Income</p>
          <Box></Box>
        </Box>
        <div className="!overflow-x-auto" style={{ width: "95%", marginLeft: '2.5%', marginTop: '16px', }}>
          <Table sx={{ background: bgdarkgray, boxShadow: zubgshadow }}>
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'black' }} className=" !font-bold !border !text-xs !border-r  !text-center !border-b !border-black">S.No</TableCell>
                <TableCell sx={{ color: 'black' }} className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-black">Date/Time</TableCell>
                <TableCell sx={{ color: 'black' }} className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-black">Amount</TableCell>
                <TableCell sx={{ color: 'black' }} className=" !font-bold !border !text-xs !border-r !text-center  !border-b !border-black">Claim</TableCell>
                <TableCell sx={{ color: 'black' }} className="!font-bold !border !text-xs !border-r !text-center  !border-b !border-black">Transaction Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((i, index) => (
                <TableRow key={i?.id}>
                  <TableCell sx={{ color: 'black' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-black">{index + 1}</TableCell>
                  <TableCell sx={{ color: 'black' }} className="!border !border-r !text-xs !text-center  !border-b !border-black">
                    {moment(i?.l01_date).format("DD-MM-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }} className="!border !border-r !text-xs !text-center  !border-b !border-black">{i?.l01_amount}</TableCell>
                  <TableCell sx={{ color: 'black' }} className="!border !border-r !text-xs !text-center  !border-b !border-black">
                    <span
                      className="border px-2 !cursor-pointer !flex "
                      onClick={() => i?.l01_clame_status === 0 && ClaimIncomeFn(i?.lo1_id)}>
                      {i?.l01_clame_status === 0 ? "Claim" : <span>Achieved <CheckCircleOutlineIcon className="!text-[15px] !pb-[1px] !text-green-500" /></span>}
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: 'black' }} className="!border !border-r !text-xs !text-center !border-b !border-black">{i?.l01_transection_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box className="paginationTable !mb-10">
            <TablePagination
              sx={{
                background: zubgtext,
                color: "white",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              rowsPerPageOptions={[10, 15, 25, 35]}
              component="div"
              count={res?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows"
            />
          </Box>
        </div>
      </Container>
    </Layout>

  );
}

export default Attendence;

const style = {
  header: {
    padding: "10px 8px",
    background: zubgtext,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
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
    mb: "10px",
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
    mb: "10px",
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
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};




