'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const Chart = ({ dataForChartForTotalBookingsPerMonth }) => {

  return (
    <section className='mt-24'>

      <h1 className='text-4xl font-semibold text-center'>Monthly Bookings</h1>

      <ResponsiveContainer width='100%' height={300}>

        <BarChart data={dataForChartForTotalBookingsPerMonth} margin={{ top: 50 }}>

          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='currentBookingDataDate' />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey='total_number_of_bookings_this_month' fill='#f97215' barSize={75} />

        </BarChart>

      </ResponsiveContainer>

    </section>
  )
}


export default Chart;