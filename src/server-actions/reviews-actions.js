'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from "next/cache";

import { formReviewSchema, validateFormWithZodSchema } from "@/utils/zodformvalidationschema";
import primsaClientConfig from '@/prismaClientConfig';


const getAuthenticatedUser = async () => {

    try {
        
        const user = await currentUser();


        if (!user) {
            throw new Error('you must be authenticated in order to access this route');
        }

        if(!user?.privateMetadata?.hasProfile) {
            redirect('/profile/create');
        }


        return user;


    } catch (error) {

        console.log(error);

        return {
            message: error?.message 
        }

    }

}


export const createReview = async (prevState, formData) => {

    try {
        
        const user = await getAuthenticatedUser();

        const rawData = Object.fromEntries(formData);

        const formFieldsValidated = validateFormWithZodSchema(formReviewSchema, rawData);

        await primsaClientConfig.review.create({
            data: {
                ...formFieldsValidated,
                idOfTheProfileWhoGaveAReviewToTheProperty: user.id
            }
        });


        revalidatePath(`/properties/${formFieldsValidated.idOfThePropertyWhoseReviewHasBeenGiven}`);

        
        return {
            message: 'your review has been submitted successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new review, please try again'
        }

    }

}


export const fetchAllReviewsOfAParticularProperty = async (idOfPropertyWhoseAllReviewsShouldBeFetched) => {

    try {

        const allReviewsOfTheParticularProperty = await primsaClientConfig.review.findMany({
            where: {
                idOfThePropertyWhoseReviewHasBeenGiven: idOfPropertyWhoseAllReviewsShouldBeFetched
            },
            select: {
                id: true,
                rating: true,
                comment: true,
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                        profileImage: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });


        return allReviewsOfTheParticularProperty;
        
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while fetching all reviews of the property, please try again'
        }

    }

}


export const fetchAllReviewsByCurrentlyLoggedInUser = async () => {

    try {

        const user = await getAuthenticatedUser();

        const allReviewsByUser = await primsaClientConfig.review.findMany({
            where: {
                idOfTheProfileWhoGaveAReviewToTheProperty: user.id
            },
            select: {
                id: true,
                rating: true,
                comment: true,
                property: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        return allReviewsByUser;
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while fetching all the reviews of currently logged in user, please try again'
        }

    }

}


export const deleteReview = async (prevState) => {

    try {

        const { reviewId } = prevState;

        const user = await getAuthenticatedUser();

        await primsaClientConfig.review.delete({
            where: {
                id: reviewId,
                idOfTheProfileWhoGaveAReviewToTheProperty: user.id
            }
        });

        revalidatePath('/reviews');

        return {
            message: 'review deleted successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while deleting a review, please try again'
        }

    }

}


export const findExistingReviewOnParticularPropertyByCurrentlyLoggedInUser = async (userId, propertyId) => {

    try {

        return primsaClientConfig.review.findFirst({
            where: {
                idOfTheProfileWhoGaveAReviewToTheProperty: userId,
                idOfThePropertyWhoseReviewHasBeenGiven: propertyId
            }
        })
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while finding the review, please try again'
        }

    }

}