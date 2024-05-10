import React from 'react'
import GoogleGeoChart from '../../components/GoogleGeoChart'
import CardWrapper from '../../components/CardWrapper'
import { GoogleGuageChart } from '../../components/GoogleGuageChart'
import PatternedCharts from '../../components/PatternedChart'
import { useGetMostPaidTaxValQuery } from '../../redux/service/poData'

const PageTwo = () => {
    const { data: taxVal } = useGetMostPaidTaxValQuery()
    const taxValue = taxVal?.data || []
    return (
        <div className='w-full grid grid-cols-2'>
            <CardWrapper name={"Most of tax Paid "}>

                <PatternedCharts taxValue={taxValue} />

            </CardWrapper>
            {/* <CardWrapper name={"Country Wise Orders"}>
                <GoogleGeoChart />
            </CardWrapper>
            <CardWrapper name={"Guage"}>

                <GoogleGuageChart />

            </CardWrapper> */}

        </div>
    )
}

export default PageTwo