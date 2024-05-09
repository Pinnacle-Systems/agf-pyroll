import React from 'react'
import GoogleGeoChart from '../../components/GoogleGeoChart'
import CardWrapper from '../../components/CardWrapper'
import { GoogleGuageChart } from '../../components/GoogleGuageChart'


const PageTwo = () => {
    return (
        <div className='w-full grid grid-cols-2'>
            <CardWrapper name={"Country Wise Orders"}>
                <GoogleGeoChart />
            </CardWrapper>
            <CardWrapper name={"Guage"}>
                <div className='flex items-center justify-center w-full ml-32 mt-32'>
                    <GoogleGuageChart />
                </div>
            </CardWrapper>
        </div>
    )
}

export default PageTwo