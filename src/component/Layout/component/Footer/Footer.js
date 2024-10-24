import { Padding } from '@mui/icons-material'
import { Box, Container, Stack, Typography, colors } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WalletIcon from '@mui/icons-material/Wallet';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import zIndex from '@mui/material/styles/zIndex'
import { bgfootergray, bggold, bggrad, bggray } from '../../../../Shared/color';
import { flexcenter, flexcoloumcenter } from '../../../../Shared/Commom';
import footer from "../../../../assets/images/footer.png";
import home from "../../../../assets/home.png";
import homeactive from "../../../../assets/home_color.png";
import promotion from "../../../../assets/diamond-svgrepo-com.png";
import wallet from "../../../../assets/wallet.png";
import walletactive from "../../../../assets/wallet color.png";
import account from "../../../../assets/account.png";
import accountactive from "../../../../assets/account_color.png";
import activity from "../../../../assets/activitu (1).png";
import activityactive from "../../../../assets/activitu (2).png";
import theme from '../../../../utils/theme';

function Footer() {

  const [nav, setNav] = useState(1);

  const location = useLocation();
  const navigation = (value) => {
    setNav(value);
  };

  return (

    <Box
      sx={{
        px: 1,
        backgroundImage: `url(${footer})`,
        backgroundSize: "100% 100%",
      }}
      className="footerBox"
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-around" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(1)}
          to="/dashboard"
        >
          {location.pathname === '/dashboard' ?
            <Box component="img" src={homeactive} width={25}></Box>
            :
            <Box component="img" src={home} width={25}></Box>
          }

          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: location.pathname === '/dashboard' ? "#D2090A" : "#768096",
            }}
          >
            Home
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(2)}
          to="/activity"
        >
          {location.pathname === '/activity' ?
            <Box component="img" src={activityactive} width={25}></Box>
            :
            <Box component="img" src={activity} width={25}></Box>
          }
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: location.pathname === '/activity' ? "#D2090A" : "#768096",
            }}
          >
            Activity
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(3)}
          to="/promotion"
        >
          <Box
            sx={{
              ...flexcenter,
              width: "55px !important",
              height: "55px !important",
              position: 'absolute',
              top: '-40px',
              left: '2px',
              background: '#E32724',
              borderRadius: '50%',
              border: '3px solid white',
            }}
          >
            <Box component='img' src={promotion} width={30}></Box>

          </Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              mt: 3,
              fontSize: "11px",
              fontWeight: 500,
              color: location.pathname === '/promotion' ? "#D2090A" : "#768096",
            }}
          >
            Promotion
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(4)}
          to="/wallet"
        >
          {location.pathname === '/wallet' ?
            <Box component="img" src={walletactive} width={25}></Box>
            :
            <Box component="img" src={wallet} width={25}></Box>
          }
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: location.pathname === '/wallet' ? "#D2090A" : "#768096",
            }}
          >
            Wallet
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(5)}
          to="/account"
        >
          {location.pathname === '/account' ?
            <Box component="img" src={accountactive} width={25}></Box>
            :
            <Box component="img" src={account} width={25}></Box>
          }
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: location.pathname === '/account' ? "#D2090A" : "#768096",
            }}
          >
            Account
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default Footer

const style = {
  root: { position: 'relative', },
  footer: { position: 'fixed', bottom: '0', maxWidth: '400px', width: '100%', background: bgfootergray, padding: '7px 20px ', boxSizing: 'border-Box', zIndex: '5000000' },
  navbarbox: { '&>path': { color: bggray }, '&>svg': { fontSize: '30px', } },
  footerinner: { display: 'flex', alignItems: 'end', justifyContent: 'space-between' },
}



// < Box sx = { style.root } >
//   <Box sx={style.footer}>
//     <Box sx={style.footerinner}>
//       <NavLink onClick={() => setValue(1)} to="/dashboard">
//         <Box sx={{ ...flexcoloumcenter, ...style.navbarbox }}>
//           <OtherHousesIcon className="funp18" sx={{ '&>path': { color: location.pathname == '/dashboard' ? bggold : bggray } }} />
//           <Typography className="funp13" sx={{ color: location.pathname === '/dashboard' ? bggold : bggray }}>Home</Typography>
//         </Box>
//       </NavLink>
//       <NavLink onClick={() => setValue(2)} to="/activity">
//         <Box sx={{ ...flexcoloumcenter, ...style.navbarbox }}>
//           <EmojiEventsIcon className="funp18" sx={{ '&>path': { color: location.pathname === '/activity' ? bggold : bggray } }} />
//           <Typography className="funp13" sx={{ color: location.pathname === '/activity' ? bggold : bggray }}>Activity</Typography>
//         </Box>
//       </NavLink>
//       <NavLink onClick={() => setValue(3)} to="/promotion">
//         <Box sx={{ ...flexcoloumcenter, ...style.navbarbox, }}>
//           <Box component='img' src={promotion} sx={{ position: 'absolute', width: '60px', top: '-18px' }}></Box>
//           <Typography className="funp13" sx={{ color: location.pathname === '/promotion' ? bggold : bggray }}>Promotion</Typography>
//         </Box>
//       </NavLink>
//       <NavLink onClick={() => setValue(4)} to="/wallet">
//         <Box sx={{ ...flexcoloumcenter, ...style.navbarbox }}>
//           <WalletIcon className="funp18" sx={{ '&>path': { color: location.pathname === '/wallet' ? bggold : bggray } }} />
//           <Typography className="funp13" sx={{ color: location.pathname === '/wallet' ? bggold : bggray }} >Wallet</Typography>
//         </Box>
//       </NavLink>
//       <NavLink onClick={() => setValue(5)} to="/account">
//         <Box sx={{ ...flexcoloumcenter, ...style.navbarbox }}>
//           <AssignmentIndIcon className="funp18" sx={{ '&>path': { color: location.pathname === '/account' ? bggold : bggray } }} />
//           <Typography className="funp13" sx={{ color: location.pathname === '/account' ? bggold : bggray }}>Account</Typography>
//         </Box>
//       </NavLink>
//     </Box>
//   </Box>
//   </Box >