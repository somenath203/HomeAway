import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchAllFavouritesProperty } from "@/server-actions/property-actions";
import EmptyList from "../_components/home/EmptyList";
import PropertiesList from "../_components/home/PropertiesList";

const Page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasProfile) {

    redirect('/profile/create');
    
  }

  const allFavouritesProperties = await fetchAllFavouritesProperty();

  if(allFavouritesProperties.length === 0) {

    return <EmptyList />

  }

  return (
    <div className="flex flex-col gap-3">

      <p className="text-2xl">Favourite Properties</p>

      <PropertiesList properties={allFavouritesProperties} />

    </div>
  )
};

export default Page;