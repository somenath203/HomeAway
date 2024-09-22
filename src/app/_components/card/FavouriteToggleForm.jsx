'use client';

import { usePathname } from "next/navigation";

import FormContainer from "../form/FormContainer";
import { toggleFavouriteProperty } from "@/server-actions/property-actions";
import FavouritePropertyCardSubmitButton from "./FavouritePropertyCardSubmitButton";


const FavouriteToggleForm = ({ fechedFavouritePropertyIdFromServerAction, idOfPropertyOnWhichUserClicked }) => {

  const pathname = usePathname();

  const toggleAction = toggleFavouriteProperty.bind(null, {
    fechedFavouritePropertyIdFromServerAction,
    idOfPropertyOnWhichUserClicked,
    pathname
  });

  return (
    <FormContainer action={toggleAction}>

      <FavouritePropertyCardSubmitButton isFavourite={fechedFavouritePropertyIdFromServerAction ? true : false} />

    </FormContainer>
  )
}

export default FavouriteToggleForm;