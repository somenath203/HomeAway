import FormContainer from "@/app/_components/form/FormContainer";
import FormInput from "@/app/_components/form/FormInput";
import { createNewProperty } from "@/server-actions/property-actions";
import SubmitButton from "@/app/_components/form/SubmitButton";
import PriceInput from "@/app/_components/form/PriceInput";
import CategoriesSelectInput from "@/app/_components/form/CategoriesSelectInput";
import TextAreaFormInput from "@/app/_components/form/TextAreaFormInput";
import CountryInput from "@/app/_components/form/CountryInput";
import ImageInput from "@/app/_components/form/ImageInput";
import CounterInput from "@/app/_components/form/CounterInput";
import AmenitiesInput from "@/app/_components/form/AmenitiesInput";


const Page = () => {
  return (
    <section>
        
        <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Property</h1>


        <div className='border p-8 rounded'>

            <h3 className='text-lg mb-4 font-medium'>General Details</h3>

            <FormContainer action={createNewProperty}>

                <div className="grid md:grid-cols-2 gap-8 mb-4">

                    <FormInput 
                        name='name' 
                        type='text' 
                        label='Property Name (max 20 characters allowed)' 
                        defaultValue='Star Cabin'
                    />

                    <FormInput 
                        name='tagline' 
                        type='text' 
                        label='Property Tag Line (max 30 characters allowed)' 
                        defaultValue='Dream Gateway awaits you'
                    />

                    <PriceInput />

                    <CategoriesSelectInput />

                </div>

                <TextAreaFormInput />


                <div className="grid sm:grid-cols-2 gap-8 mt-4">    

                    <CountryInput />

                    <ImageInput labeltext='Rental Image' />

                </div>


                <h3 className="text-lg mt-8 mb-4 font-medium">Accomodation Details</h3>

                <CounterInput detail='guests' name='noOfGuests' />

                <CounterInput detail='bedrooms' name='noOfBedrooms' />
                
                <CounterInput detail='beds' name='noOfBeds' />
                
                <CounterInput detail='bathrooms' name='noOfBathrooms' />


                <h3 className='text-lg mt-10 mb-6 font-medium'>Amenities</h3>

                <AmenitiesInput />
                
                
                <SubmitButton buttontext='Create New Rental' className='mt-12' />


            </FormContainer>
        
        </div>

    
    </section>
  )
}

export default Page;