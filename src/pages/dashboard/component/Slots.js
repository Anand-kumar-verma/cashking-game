import { Box, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slot from '../../../assets/images/slot.png';
import win from '../../../assets/images/win.png';
import vendorlogo1 from '../../../assets/images/vendorlogo1.png';
import vendorlogo2 from '../../../assets/images/vendorlogo2.png';
import vendorlogo3 from '../../../assets/images/vendorlogo3.png';
import vendorlogo4 from '../../../assets/images/vendorlogo4.png';
import vendorlogo5 from '../../../assets/images/vendorlogo5.png';
import vendorlogo6 from '../../../assets/images/vendorlogo6.png';
import vendorlogo7 from '../../../assets/images/vendorlogo7.png';
import { bggrad } from "../../../Shared/color";


function Slots({alljiligames ,getGamnesbyID}) {

    const style = {
        winbox: { background: bggrad, borderRadius: '20px', height: '150px', marginBottom: '20px', },
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
                    Slots                </Typography>
            </Stack>
            <Grid container spacing={2}>
                {alljiligames?.map((item) => {
                    return <>
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

export default Slots
