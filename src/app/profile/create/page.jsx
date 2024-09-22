import { currentUser } from '@clerk/nextjs/server'; 
import { redirect } from 'next/navigation';

import FormContainer from "@/app/_components/form/FormContainer";
import FormInput from "@/app/_components/form/FormInput";
import SubmitButton from "@/app/_components/form/SubmitButton";
import { createProfileServerAction } from "@/server-actions/user-actions";


const Page = async () => {

  const currentLoggedInUser = await currentUser();

  if(currentLoggedInUser?.privateMetadata?.hasProfile) {

    redirect('/');
    
  }

  return (
    <section>


        <h1 className="text-2xl font-semibold mb-8 capitalize">
            Complete your Profile
        </h1>


        <div className="border p-8 rounded-md">

            <FormContainer action={createProfileServerAction}>

                <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <FormInput 
                        type='text' 
                        name='firstName' 
                        label='First Name' 
                        placeholder='enter your firstname' 
                        defaultValue='John'
                    />

                    <FormInput 
                        type='text' 
                        name='lastName' 
                        label='Last Name' 
                        placeholder='enter your lastname' 
                        defaultValue='Doe'
                    />

                    <FormInput 
                        type='text' 
                        name='userName' 
                        label='Username' 
                        placeholder='enter your username' 
                        defaultValue='johndoe12@'
                    />

                </div>

                <SubmitButton buttontext='Complete your Profile' className='mt-8' />

            </FormContainer>

        </div>


    </section>
  )
}


export default Page;