import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CustomizedAccordions from './Accordion'
// Custom Item component for MenuItems


// function to get path name & change according to useState
const getCurrentPathname = () => {
    let path = window.location.pathname;
    path = path.substring(1);

    if (path === '') {
        path = 'Dashboard';
    } else {
        let capitalized = path.charAt(0).toUpperCase() + path.slice(1);
        path = capitalized;
    }

    return path;
};

const Sidebar = ({ isCollapsed }) => {
    return (
        <Box
            sx={{
                overflow: "hidden",
                width: isCollapsed ? '' : '100%',
                '& .pro-sidebar-inner': {
                    background: `#243447`,
                    width: '100%',
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',
                },
                '& .pro-inner-item': {
                    padding: '5px 5px 25px 2px !important',
                },
            }}
        >
            <div className='w-full pt-1'>
                <img
                    src={`../../assets/pin.a0917c99.png`}
                    alt="user-profile"
                    className='bg-white h-full w-[98%]   object-cover'
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <CustomizedAccordions />
        </Box>
    );
};

export default Sidebar;

