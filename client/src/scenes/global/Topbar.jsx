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
    <div className='top-Bar-style flex items-center justify-between text-white font-bold text-lg h-full'
    >
      <div className='p-1'>
        <img
          src={`../../assets/pin.a0917c99.png`}
          alt="user-profile"
          className='w-44 bg-white rounded-lg'
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className='text-[24px] font-normal'>Management Information Dashboard</div>
      <div>
        <button onClick={colorMode.toggleColorMode}>
          <DarkModeOutlinedIcon className='text-white' />
        </button>
        <button>
          <Badge variant="dot" color="secondary">
            <NotificationsOutlinedIcon className='text-white' />
          </Badge>
        </button>
        <button>
          <SettingsOutlinedIcon className='text-white' />
        </button>
        <button>
          <PersonOutlinedIcon className='text-white' />
        </button>
      </div>
    </div>

  );

};

export default Topbar;
