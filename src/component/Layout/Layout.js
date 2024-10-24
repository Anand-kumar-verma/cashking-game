import Box from '@mui/material/Box';
import React from 'react'
import Footer from "./component/Footer/Footer";
import Header from "./component/Header.js/Header";
import { bgdarkgray } from '../../Shared/color';

function Layout(props) {
  const { header = true, footer = true, children } = props
  return (
    <Box sx={style.root}>
      {header && <Header />}

      {children}

      {footer && <Footer />}
    </Box>
  )
}

export default Layout

const style = {
  root: { position: 'relative', background: '#F7F8FF', maxWidth: '400px', margin: 'auto', minHeight: '100vh', },
}