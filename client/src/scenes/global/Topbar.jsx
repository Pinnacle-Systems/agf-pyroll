import { useContext, useState } from 'react';
import * as React from 'react';
import { Badge, Box, button, useTheme, IconButton } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../components/Header';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CustomizedAccordions from './accordion';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Topbar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });



  return (
    <Box display="flex" justifyContent="space-between" position="sticky"
      top={0}
      zIndex={1000}
      bgcolor="background.paper"
      boxShadow={4}
      p={'2px'} >

      <Box
        display="flex"


      >
        <img
          src={`../../assets/pin.a0917c99.png`}
          alt="user-profile"
          className='w-[15%] h-[100%]'
          style={{ borderRadius: '10%', cursor: 'pointer' }}
        />
        <Box>    <IconButton
          sx={{
            position: 'fixed',
            zIndex: 999,
          }}
          onClick={toggleSidebar}
        >
          <MenuOutlinedIcon />
        </IconButton></Box>
      </Box>


      <div className=' flex gap-3'>
        <button onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'light' ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </button>
        <button>
          <Badge variant="dot" color="secondary">
            <NotificationsOutlinedIcon />
          </Badge>
        </button>
        <button>
          <SettingsOutlinedIcon />
        </button>
        <button>
          <PersonOutlinedIcon />
        </button>
      </div>
    </Box>

  );

};

export default Topbar;
