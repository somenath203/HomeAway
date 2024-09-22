import { fetchChartsDataOfTotalNumberOfBookingsPerMonth } from "@/server-actions/admin-actions";
import Chart from "./Chart";

const ChartsContainer = async () => {

  const dataForChartForTotalBookingsPerMonth = await fetchChartsDataOfTotalNumberOfBookingsPerMonth();
  
  if(dataForChartForTotalBookingsPerMonth.length < 1) {

    return null;

  }

  return (
    <Chart dataForChartForTotalBookingsPerMonth={dataForChartForTotalBookingsPerMonth} />
  )

}

export default ChartsContainer;