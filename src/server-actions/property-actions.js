'use server';

import { redirect } from "next/navigation";
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from "next/cache";

import { propertyFormSchema, validateFormWithZodSchema } from "@/utils/zodformvalidationschema";
import { uploadImageToSupbaseBucket } from "@/utils/supabase";
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


export const createNewProperty = async (prevState, formData) => {

    try {

        const user = await getAuthenticatedUser();

        const rawData = Object.fromEntries(formData);

        const rentalImage = formData.get('image');


        const validatedFields = validateFormWithZodSchema(propertyFormSchema, rawData);

        
        const imageUploadInSupabase = await uploadImageToSupbaseBucket(rentalImage);

        await primsaClientConfig.property.create({
            data: {
                ...validatedFields,
                image: imageUploadInSupabase,
                idOfTheProfileWhoCreatedTheProperty: user?.id
            }
        });

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new property, please try again'
        }

    }

    redirect('/')

}


export const fetchAllAvailableProperties = async ({ search='', category }) => {


    try {        

        const allProperties = await primsaClientConfig.property.findMany({
            where: {
                category, 
                OR: [
                    {name: {contains: search, mode: 'insensitive'}},
                    {tagline: {contains: search, mode: 'insensitive'}},
                ]
            },
            select: {
                id: true, 
                name: true,
                image: true,
                tagline: true,
                country: true,
                price: true
            },
            orderBy: {
                createdAt: 'desc' 
            }
        });


        return allProperties;

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching all the properties, please try again'
        }

    }

}


export const fetchFavouriteProperty = async ({ propertyId }) => {

    try {        

        const user = await getAuthenticatedUser();


        const favorite = await primsaClientConfig.favourite.findFirst({
            where: {
              idOfTheProfileWhoMarkedThePropertyFavourite: user.id,
              idOfThePropertyWhichIsMarkedAsFavourite: propertyId, 
            },
            select: {
              id: true,
            },
        });
          

        return favorite?.id;
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching the favourite property, please try again'
        }

    }

}


export const toggleFavouriteProperty = async (prevState) => {

    try {

        const user = await getAuthenticatedUser();

        const { fechedFavouritePropertyIdFromServerAction, idOfPropertyOnWhichUserClicked, pathname } = prevState;        

        if(fechedFavouritePropertyIdFromServerAction) {

            await primsaClientConfig.favourite.delete({
                where: {
                    id: fechedFavouritePropertyIdFromServerAction 
                }
            });

        } else {

            await primsaClientConfig.favourite.create({
                data: { 
                    idOfThePropertyWhichIsMarkedAsFavourite: idOfPropertyOnWhichUserClicked,
                    idOfTheProfileWhoMarkedThePropertyFavourite: user.id
                }
            });

        }

        revalidatePath(pathname);

        return {
            message: fechedFavouritePropertyIdFromServerAction ? 'property removed from favourite property list successfully' : 'property added to favourite property list successfully'
        }

    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while toggling the favourite property, please try again'
        }

    }

}

export const fetchAllFavouritesProperty = async () => {

    try {

        const user = await getAuthenticatedUser();


        const allFavouritesProperty = await primsaClientConfig.favourite.findMany({
            where: {
                idOfTheProfileWhoMarkedThePropertyFavourite: user.id
            },
            select: {
                property: {
                    select: {
                        id: true, 
                        name: true,
                        image: true,
                        tagline: true,
                        country: true,
                        price: true
                    }
                }
            }
        });

        return allFavouritesProperty?.map((favourite) => favourite?.property);

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while toggling the favourite property, please try again'
        }

    }

}


export const fetchParticularPropertyDetailById = async (propertyId) => {

    try {

        return primsaClientConfig.property.findUnique({
            where: {
                id: propertyId
            },
            include: {
                profile: true,
                propertyBooking: {
                    select: {
                        checkIn: true,
                        checkOut: true
                    }
                }
            }
        });
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while toggling the favourite property, please try again'
        }

    }

}


export const fetchAveragePropertyRatingAndTotalNumberOfRatings = async (propertyId) => {

    try {

        const avgRatingAndTotalNumberOfRatingOfParticularProperty = await primsaClientConfig.review.groupBy({
            by: ['idOfThePropertyWhoseReviewHasBeenGiven'], 
            _avg: {
                rating: true
            },
            _count: {
                rating: true
            },
            where: {
                idOfThePropertyWhoseReviewHasBeenGiven: propertyId
            }
        });

        return {
            averageRating: avgRatingAndTotalNumberOfRatingOfParticularProperty[0]?._avg.rating?.toFixed() ?? 0, // if avg rating is present, then, return that, else return zero
            totalNumberOfRatings: avgRatingAndTotalNumberOfRatingOfParticularProperty[0]?._count.rating ?? 0
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while deleting a review, please try again'
        }

    }

}


export const fetchAllPropertiesOfTheCurrentLoggedInUser = async () => {


    try {
        
        const user = await getAuthenticatedUser();

        const allRentalsOfTheCurrentLoggedInUser = await primsaClientConfig.property.findMany({
            where: {
                idOfTheProfileWhoCreatedTheProperty: user.id
            },
            select: {
                id: true,
                name: true,
                price: true
            }
        });


        const bookingInfoOfEachRentalsOfTheCurrentLoggedInUser = await Promise.all(

            
            await allRentalsOfTheCurrentLoggedInUser.map(async (rental) => {

                const totalNumberOfNightsBookedForEachProperty = await primsaClientConfig.booking.aggregate({
                    where: {
                        idOfThePropertyWhichIsBooked: rental.id,
                        paymentStatus: true
                    },
                    _sum: {
                        totalNights: true
                    }
                });


                const totalOrderAmountOfEachProperty = await primsaClientConfig.booking.aggregate({
                    where: {
                        idOfThePropertyWhichIsBooked: rental.id,
                        paymentStatus: true
                    },
                    _sum: {
                        orderTotal: true 
                    }
                });


                return {
                    ...rental, 
                    totalNumberOfDaysOfEachProperty: totalNumberOfNightsBookedForEachProperty._sum.totalNights, // return total nights booked of each available rental/property
                    totalOrderAmountOfEachProperty: totalOrderAmountOfEachProperty._sum.orderTotal, // return total order amount of each available rental/property
                }


            })

        );


        return {
            bookingInfoOfEachRentalsOfTheCurrentLoggedInUser: bookingInfoOfEachRentalsOfTheCurrentLoggedInUser
        }


    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while fetching the table of rentals, please try again'
        }

    }

}


export const deleteProperty = async (prevState) => {

    try {

        const { propertyId } = prevState;

        const user = await getAuthenticatedUser();


        await primsaClientConfig.property.delete({
            where: {
                id: propertyId,
                idOfTheProfileWhoCreatedTheProperty: user.id
            }
        });

        revalidatePath('/rentals');

        return {
            message: 'rental deleted successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while deleting the rental, please try again'
        }

    }

}


export const fetchParticularRentalAllDetails = async (propertyId) => {

    try {

        const user = await getAuthenticatedUser();

        return primsaClientConfig.property.findUnique({
            where: {
                id: propertyId,
                idOfTheProfileWhoCreatedTheProperty: user.id
            }
        });
        
    } catch (error) {

        console.log(error);

        return {
            message: error?.message || 'there was an error while fetching the details of the target rental, please try again'
        }

    }

}


export const updateProperty = async (prevState, formData) => {

    try {

        const user = await getAuthenticatedUser();

        const propertyId = formData.get('propertyIdFromHiddenInputToUpdateFormFieldValues');

        const rawData = Object.fromEntries(formData);


        const validatedFields = validateFormWithZodSchema(propertyFormSchema, rawData);


        await primsaClientConfig.property.update({
            where: {
                id: propertyId,
                idOfTheProfileWhoCreatedTheProperty: user.id
            },
            data: {
                ...validatedFields
            }
        });


        revalidatePath(`/rentals/edit/${propertyId}`);


        return {
            message: 'property has been updated successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while editing the target rental, please try again'
        }

    }

}


export const updatePropertyImage = async (prevState, formData) => {

    try {

        const user = await getAuthenticatedUser();

        const propertyId = formData.get('propertyIdFromHiddenInputToUpdateImage');

        const image = formData.get('image');

        const imageUploadedToSupabase = await uploadImageToSupbaseBucket(image);


        await primsaClientConfig.property.update({
            where: {
                id: propertyId,
                idOfTheProfileWhoCreatedTheProperty: user.id
            },
            data: {
                image: imageUploadedToSupabase
            }
        });


        revalidatePath(`/rentals/edit/${propertyId}`);

        return {
            message: 'property image has been updated successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while updating the target rental image, please try again'
        }

    }

}