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
import { MdLogout } from "react-icons/md";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useDispatch } from 'react-redux';
import { push } from '../../redux/features/opentabs';
import logo from '../../assets/anugraha.png'

const Topbar = ({ onLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();


  return (
    <div className='top-Bar-style flex items-center justify-between text-white font-bold text-lg h-full'
    >
      <div className='p-1'>
        <img
          src={logo}
          alt="user-profile"
          className='w-44 bg-white rounded-lg'
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='text-[24px] font-normal'>Management Information Dashboard</div>
      <div>


        <button
          onClick={onLogout}
          className='text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none bg-transparent text-2xl'
        >
          <MdLogout />
        </button>
      </div>
    </div>

  );

};

export default Topbar;
