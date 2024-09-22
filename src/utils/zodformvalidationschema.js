import { z } from "zod";


export const profileFormSchema = z.object({
    firstName: z.string().min(2, { message: 'first name cannot be less than 2 characters' }),
    lastName: z.string().min(2, { message: 'last name cannot be less than 2 characters' }),
    userName: z.string().min(2, { message: 'username cannot be less than 2 characters' })
});


export const propertyFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'name must be at least 2 characters.',
      })
      .max(100, {
        message: 'name must be less than 100 characters.',
      }),
    tagline: z
      .string()
      .min(2, {
        message: 'tagline must be at least 2 characters.',
      })
      .max(100, {
        message: 'tagline must be less than 100 characters.',
      }),
    price: z.coerce.number().int().min(0, {
      message: 'price must be a positive number.',
    }),
    category: z.string(),
    description: z.string().refine(
      (description) => {
        const wordCount = description.split(' ').length;
        return wordCount >= 10 && wordCount <= 1000;
      },
      {
        message: 'description must be between 10 and 1000 words.',
      }
    ),
    country: z.string(),
    noOfGuests: z.coerce.number().int().min(0, {
      message: 'guest amount must be a positive number.',
    }),
    noOfBedrooms: z.coerce.number().int().min(0, {
      message: 'bedrooms amount must be a positive number.',
    }),
    noOfBeds: z.coerce.number().int().min(0, {
      message: 'beds amount must be a positive number.',
    }),
    noOfBathrooms: z.coerce.number().int().min(0, {
      message: 'bahts amount must be a positive number.',
    }),
    amenities: z.string(),
  });


export const formReviewSchema = z.object({
  idOfThePropertyWhoseReviewHasBeenGiven: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10, 'the minimum character of a comment should be 10').max(1000, 'the maximum character of a comment should be 1000')
});


// validating the incoming form values with the help of Zod. If there is error then it will be sent 
// to catch block and then via catch block, it will be sent to the client and if there is no error 
// then the data will be passed to the next line where it is been stored in the database
export const validateFormWithZodSchema = (schema, formRawDdata) => {

    const validatedFields = schema.safeParse(formRawDdata);

    if(!validatedFields?.success) {

        const zodErrors = validatedFields?.error?.errors?.map((errorMessage) => {
            return errorMessage?.message
        });

        throw new Error(zodErrors.join(', '));
        // converting all the errors from array to string by joining them with ','

    }

    return validatedFields?.data; 
    // returning the actual data of the form if it has passed the validation condition

}
