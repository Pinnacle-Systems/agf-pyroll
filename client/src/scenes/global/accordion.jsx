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
    <MuiAccordion disableGutters className='bg-gray-500' elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
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
            backgroundColor: "#979595",
            color: 'white'
        }}
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({

    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    border: '1px solid white',
    backgroundColor: "#979595",
    color: 'white'
}));

const CustomizedAccordions = () => {
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const dispatch = useDispatch()

    return (
        <div className='w-full   text-white flex flex-col items-center justify-center '>
            <button className='header-font flex  text-white  items-center  gap-5 justify-start  pt-3 ' onClick={() => dispatch(push({ id: 1, name: "DASHBOARD" }))}>
                <FaHome className='lg' />
                <span className='subheading-font font-semibold'>
                    DASHBOARD
                </span>
            </button>
            <div className='mt-2 w-full p-1'>
                <Accordion expanded={expanded === 'panel1'} classes onChange={handleChange('panel1')}>
                    <AccordionSummary id="panel1d-header"  >
                        <h4 className='w-[100%]  font-semibold subheading-font'>Po management</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] subheading-font font-semibold subheading-font' onClick={() => dispatch(push({ id: 2, name: "PO REGISTER" }))}>PO REGISTER</h4>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <h4 className='w-[100%] subheading-font font-semibold'>Ord management</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h4 className='w-[100%] subheading-font font-semibold' onClick={() => dispatch(push({ id: 2, name: "PO REGISTER" }))}>PO REGISTER</h4>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default CustomizedAccordions;
