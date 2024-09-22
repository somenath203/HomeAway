import { fetchStatisticsOfTheEntireApplication } from "@/server-actions/admin-actions";
import StatsCard from "./StatsCard";

const StatsContainer = async () => {

  const statisticsOfTheApplication = await fetchStatisticsOfTheEntireApplication();
  
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">

      <StatsCard 
        title='Total Users' 
        value={statisticsOfTheApplication.totalNumberOfUsersInTheApplication || 0}
      />

      <StatsCard 
        title='Total Properties' 
        value={statisticsOfTheApplication.totalNumberOfPropertiesInTheApplication || 0}
      />

      <StatsCard 
        title='Total Bookings' 
        value={statisticsOfTheApplication.totalNumberOfBookingsInTheApplication || 0}
      />

    </div>
  )

}

export default StatsContainer;