import { redirect } from "next/navigation";

import { 
    fetchParticularRentalAllDetails, 
    updateProperty, 
    updatePropertyImage  
} from "@/server-actions/property-actions";
import FormContainer from "@/app/_components/form/FormContainer";
import FormInput from "@/app/_components/form/FormInput";
import CategoriesSelectInput from "@/app/_components/form/CategoriesSelectInput";
import PriceInput from "@/app/_components/form/PriceInput";
import TextAreaFormInput from "@/app/_components/form/TextAreaFormInput";
import CountryInput from "@/app/_components/form/CountryInput";
import CounterInput from "@/app/_components/form/CounterInput";
import AmenitiesInput from "@/app/_components/form/AmenitiesInput";
import ImageInputContainer from "@/app/_components/form/ImageInputContainer";
import SubmitButton from "@/app/_components/form/SubmitButton";


const Page = async ({ params }) => {

  const property = await fetchParticularRentalAllDetails(params.id);

  if(!property) {

    redirect('/');

  }

  const defaultAmenities = JSON.parse(property.amenities);

  
  return (
    <section>

        <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Property</h1>

        <div className="border p-8 rounded-md">

            <ImageInputContainer 
                name={property.name} 
                text='Update Property Image' 
                action={updatePropertyImage} 
                labeltext="Property Image Update" 
                image={property.image}
            >

                <input type="hidden" name="propertyIdFromHiddenInputToUpdateImage" value={property.id} />


            </ImageInputContainer>
            

            <FormContainer action={updateProperty}>

                <input type="hidden" name="propertyIdFromHiddenInputToUpdateFormFieldValues" value={property.id} />


                <div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">

                    <FormInput 
                        name='name' 
                        type='text' 
                        label='Property Name' 
                        defaultValue={property.name}     
                    />

                    <FormInput 
                        name='tagline' 
                        type='text' 
                        label='Property Tagline' 
                        defaultValue={property.tagline}     
                    />

                    <PriceInput defaultValue={property.price} />

                    <CategoriesSelectInput defaultValue={property.category} />

                    <CountryInput defaultValue={property.country} />

                </div>

                
                <TextAreaFormInput defaultDescription={property.description} />


                <h3 className="text-lg mt-8 mb-4 font-medium">
                    Accomodation Details
                </h3>

                <CounterInput detail='guests' name='noOfGuests' defaultValue={property.noOfGuests} />

                <CounterInput detail='bedrooms' name='noOfBedrooms' defaultValue={property.noOfBedrooms} />
                
                <CounterInput detail='beds' name='noOfBeds' defaultValue={property.noOfBeds} />
                
                <CounterInput detail='bathrooms' name='noOfBathrooms' defaultValue={property.noOfBathrooms} />


                <h3 className='text-lg mt-10 mb-6 font-medium'>Amenities</h3>

                <AmenitiesInput defaultValue={defaultAmenities} />


                <SubmitButton buttontext='Edit Rental' className='mt-12' />

            
            </FormContainer>

        </div>

    </section>
  )
}

export default Page;