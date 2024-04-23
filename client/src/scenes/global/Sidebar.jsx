import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

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

                    width: '100%',
                },

                '& .pro-inner-item': {
                    padding: '5px 5px 25px 2px !important',
                },
            }}
        >

            <CustomizedAccordions />
        </Box>
    );
};

export default Sidebar;

