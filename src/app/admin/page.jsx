import { Suspense } from "react";

import { ChartsLoadingContainer, StatsLoadingContainer } from "../_components/admin/Loading";
import StatsContainer from "../_components/admin/StatsContainer";
import ChartsContainer from "../_components/admin/ChartsContainer";


const Page = () => {
  return (
    <>

      <Suspense fallback={<StatsLoadingContainer />}>

        <StatsContainer />

      </Suspense>

      <Suspense fallback={<ChartsLoadingContainer />}>

        <ChartsContainer />

      </Suspense>
    
    </>
  )
}

export default Page;