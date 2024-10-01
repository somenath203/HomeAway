'use server';

import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { profileFormSchema, validateFormWithZodSchema } from "@/utils/zodformvalidationschema";
import primsaClientConfig from '@/prismaClientConfig';
import { uploadImageToSupbaseBucket } from '@/utils/supabase';


const getAuthenticatedUser = async () => {

    try {
        
        const user = await currentUser();


        if (!user) {
            throw new Error('you must be authenticated in order to access this route');
        }

        return user;


    } catch (error) {

        console.log(error);

        return {
            message: error?.message 
        }

    }

}


export const createProfileServerAction = async (prevState, formData) => {

    try {

        const currentLoggedInUser = await currentUser();

        if(!currentLoggedInUser) {
            throw new Error('Please authenticate yourself first before creating the profile');
        }

        const rawData = Object.fromEntries(formData);

        const validatedFields = validateFormWithZodSchema(profileFormSchema, rawData);

        await primsaClientConfig.profile.create({
            data: {
                clerkId: currentLoggedInUser?.id, 
                email: currentLoggedInUser?.primaryEmailAddress?.emailAddress,      
                profileImage: currentLoggedInUser?.imageUrl ?? '', 
                ...validatedFields 
            }
        });

    
        await clerkClient.users.updateUserMetadata(currentLoggedInUser?.id, {
            privateMetadata: {
                hasProfile: true,
            }
        });

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating your profile, please try again'
        }
        
    }

    redirect('/'); 

};


export const fetchProfilePictureOfUser = async () => {

    try {

        const user = await currentUser();

        if(!user) {
            return null
        }

        const profilePicOfTheUrl = await primsaClientConfig.profile.findUnique({
            where: {
                clerkId: user?.id
            },
            select: {
                profileImage: true 
            }
        });

        return profilePicOfTheUrl?.profileImage;
        
    } catch (error) {

        console.log(error);

        return {
            message: error?.message || 'there was an error while creating your profile, please try again'
        }

    }

}


export const fetchWholeProfileOfUser = async () => {

    try {

        const user = await getAuthenticatedUser();

        const profileOfUser = await primsaClientConfig.profile.findUnique({
            where: {
                clerkId: user?.id
            }
        });

        if(!profileOfUser) {

            redirect('/profile/create');
        
        }

        return profileOfUser;
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while fetching your profile, please try again'
        }

    }

}


export const updateProfile = async (prevState, formData) => {

    try {

        const user = await getAuthenticatedUser();

        if(!user) {

            return null;

        }


        const rawData = Object.fromEntries(formData);


        const validatedFields = validateFormWithZodSchema(profileFormSchema, rawData);


        await primsaClientConfig.profile.update({
            where: {
                clerkId: user?.id
            },
            data: validatedFields
        });


        revalidatePath('/profile');
        

        return {
            message: 'profile has been updated successfully'
        }
        
    } catch (error) {
        
        return {

            message: error?.message || 'there was an error while updating your profile, please try again'

        }

    }

}


export const updateProfileImageAction = async (prevState, formData) => {

    try {

        const image = formData.get('image');

        const user = await getAuthenticatedUser();

        const response = await uploadImageToSupbaseBucket(image);

        await primsaClientConfig.profile.update({
            where: {
                clerkId: user?.id
            },
            data: {
                profileImage: response
            }
        });

        revalidatePath('/profile');

        return {
            message: 'profile image updated successfully'
        }
        
    } catch (error) {
        
        return {

            message: error?.message || 'there was an error while updating your profile picture, please try again'

        }

    }

}