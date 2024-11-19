import { Box, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slot from '../../../assets/images/fishing.png';
import vendorlogo17 from '../../../assets/images/vendorlogo17.png';
import vendorlogo18 from '../../../assets/images/vendorlogo18.png';
import vendorlogo19 from '../../../assets/images/vendorlogo19.png';
import vendorlogo20 from '../../../assets/images/vendorlogo20.png';
import vendorlogo21 from '../../../assets/images/vendorlogo21.png';
import vendorlogo22 from '../../../assets/images/vendorlogo22.png';
import vendorlogo23 from '../../../assets/images/vendorlogo23.png';
import vendorlogo24 from '../../../assets/images/vendorlogo24.png';
import vendorlogo25 from '../../../assets/images/vendorlogo25.png';
import vendorlogo26 from '../../../assets/images/vendorlogo26.png';
import vendorlogo27 from '../../../assets/images/vendorlogo27.png';
import vendorlogo28 from '../../../assets/images/vendorlogo28.png';
import vendorlogo29 from '../../../assets/images/vendorlogo29.png';
import { bggrad } from "../../../Shared/color";
import { useQuery } from "react-query";
import { MyGamesFn } from "../../../services/apicalling";

function Fishing({alljiligames ,getGamnesbyID}) {

    const style = {
        winbox: { background: bggrad, borderRadius: '20px', height: '120px', marginBottom: '0px', },
        positiongame: {
            position: 'absolute', top: '10px', left: '20px',
            '&>div>p': { fontSize: '12px', fontWeight: 400, color: 'white' }
        },
        gameheading: { fontSize: '20px', fontWeight: 700, color: 'white' },
    }

    return (
        <Box sx={{ padding: '15px' }}>
            <Stack direction='row' sx={{ alignItems: 'center', mb: 2 }}>
                <Box component='img' src={Slot} width={25} ></Box>
                <Typography variant="body1" color="initial" sx={{ ml: 1, fontSize: '15px', fontWeight: 600 }}>
                    Fishing                </Typography>
            </Stack>
            <Grid container spacing={2}>
                {alljiligames?.map((item)=>{
                    return<>
                     <Grid item xs={4}>
                        <Box sx={style.winbox} 
                          onClick={() => getGamnesbyID(item?.id)}>
                            <Box component='img' src={item?.img} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                </Grid>
                    </>
                })}
           
                </Grid>

        </Box >
    )
}

export default Fishing

