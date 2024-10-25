import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Box, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { bggrad, zubgback, zubgmid, zubgshadow, zubgtext, zubgwhite } from '../../../Shared/color';
import Layout from '../../../component/Layout/Layout';

function Notification() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Box sx={{ mt: 8 }}></Box>
      <Container sx={style.container}>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>


        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>
        <Box sx={style.notificationBox}>
          <Stack direction='row' sx={style.notificationStack}>
            <Stack direction='row' sx={style.notificationStack}>
              <LocalPostOfficeIcon mr={1} sx={{ color: 'white' }} />
              <Typography variant="body1" className='W' sx={{ color: 'white' }}>LOGIN NOTIFICATION</Typography>
            </Stack>
            <DeleteIcon mr={1} sx={{ color: 'white' }} />
          </Stack>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>2024-03-13 10:09:31</Typography>
          <Typography variant="body1" className='W' sx={{ color: 'white' }}>Your account is logged in 2024-03-13 10:09:31</Typography>
        </Box>

      </Container>
    </Layout>
  );
}

export default Notification;


export const style = {
  container: { background: zubgback, width: '100%', height: '100vh', overflow: 'auto', py: 3 },
  header: {
    padding: '10px 8px',
    background: zubgtext,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > p': {
      fontSize: '20px',
      fontWeight: '600',
      textAlign: 'center',
      color: 'white',
    },
    '& > a > svg': {
      color: 'white',
      fontSize: '35px'
    }
  },
  notificationBox: {
    mt: 2,
    width: '95%', marginLeft: '2.5%', borderRadius: '10px', background: bggrad, boxShadow: zubgshadow, padding: '10px', mb: 1,
    '&>div>div>p': { color: zubgtext, fontSize: '14px', marginLeft: '10px', fontWeight: '500', },
    '&>p': { color: zubgtext, fontSize: '13px', marginLeft: '0px', fontWeight: '500', mt: '10px', },
    '&>div>div>svg': { color: zubgtext, fontSize: '24px', }, '&>div>svg': { color: zubgtext, fontSize: '24px', },
  }, notificationStack: { alignItems: 'center', justifyContent: 'space-between', },
};
