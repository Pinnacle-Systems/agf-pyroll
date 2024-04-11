import React from 'react'
import PoRegister from './poRegister'


import { Box, Grid, Typography } from "@mui/material"
// import DebtOverview from "./components/DebtOverview"
// import DebtPaymentHistory from "./components/DebtPaymentHistory"
// import DebtToIncomeRatio from "./components/DebtToIncomeRatio"
// import DebtBurdenRatio from "./components/DebtBurdenRatio"
import PoParameters from './poParameters'

export default function index() {
  return (
    <>
      <Box sx={{}}>
        <Box sx={{ paddingBlock: 2, width: "100%" }}>
          <Typography variant="h3">Po Management</Typography>

        </Box>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12} md={6} lg={8}>
            <PoRegister />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PoParameters />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6}>
            <DebtToIncomeRatio />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <DebtBurdenRatio />
          </Grid> */}
        </Grid>
      </Box>
    </>
  )
}
