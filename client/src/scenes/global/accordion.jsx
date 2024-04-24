import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { push } from '../../redux/features/opentabs';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { tokens } from '../../theme';
import { FaHome } from "react-icons/fa";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    '&:not(:last-child)': {
        borderBottom: 0,

    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary

        sx={{
            color: 'White',

            border: '1px solid'
        }}
        expandIcon={< ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
        {...props}
    />
))(({ theme }) => ({

    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',

        color: 'white'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    '#panel1d-header': {
        backgroundColor: 'black',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    border: '1px solid white',
    color: 'white'
}));

const CustomizedAccordions = () => {
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const dispatch = useDispatch()

    return (
        <div className='w-full   flex flex-col items-center justify-center '>

            <div className=' w-full p-1 '>

                <Accordion >

                    <AccordionSummary id="panel1d-header" sx={{

                        bgcolor: 'black',
                        color: 'white',


                    }}>
                        <button className='w-full  header-font flex   items-center  gap-5  justify-start   top-bar ' onClick={() => dispatch(push({ id: 1, name: "DASHBOARD" }))}>
                            <span className=' font-normal text-[16px] font-semibold   '>
                                DASHBOARD
                            </span>
                        </button>
                    </AccordionSummary>

                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h4 className='w-[100%] text-[15px] font-normal text-white '>Order Management</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] text-[15px] font-normal pl-9' onClick={() => dispatch(push({ id: 3, name: "ORDERS" }))}>Orders</h4>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

                    <AccordionSummary id="panel1d-header "  >
                        <h4 className='w-[100%]   font-normal text-[15px] text-white '>PO Management</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] text-[15px] font-normal text-[15px] pl-9' onClick={() => dispatch(push({ id: 2, name: "PO REGISTER" }))}>PO REGISTER</h4>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h4 className='w-[100%] text-[15px] font-normal text-white'>Pro Management</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] text-[15px] font-normal pl-9' onClick={() => dispatch(push({ id: 3, name: "ORDERS" }))}>Orders</h4>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h4 className='w-[100%] text-[15px] font-normal text-white'>Inventory Mgmt</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] text-[15px] font-normal pl-9' onClick={() => dispatch(push({ id: 3, name: "ORDERS" }))}>Orders</h4>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h4 className='w-[100%] text-[15px] font-normal text-white'>Production</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] text-[15px] font-normal pl-9' onClick={() => dispatch(push({ id: 3, name: "ORDERS" }))}>Orders</h4>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h4 className='w-[100%] text-[15px] font-normal text-white'>Shipment</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] text-[15px] font-normal pl-9' onClick={() => dispatch(push({ id: 3, name: "ORDERS" }))}>Orders</h4>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default CustomizedAccordions;
