import { createClient } from '@supabase/supabase-js';

const bucket_name = 'home-away-image-bucket';


const supabase_project_url = process.env.SUPABASE_PROJECT_URL;

const supabase_project_api_key = process.env.SUPABASE_PROJECT_API_KEY;


const supabase = createClient(supabase_project_url, supabase_project_api_key);


export const uploadImageToSupbaseBucket = async (image) => {

  try {
    
    const timestamp = Date.now();

    const uploadedImageNewCustomName = `${timestamp}-${image?.name}`;

    const { data, error } = await supabase.storage
      .from(bucket_name)
      .upload(uploadedImageNewCustomName, image, {
      cacheControl: '3600',
    });

    if(error) {
        throw new Error('Image upload failed');
    } 

    return supabase
            .storage
            .from(bucket_name)
            .getPublicUrl(uploadedImageNewCustomName)
            .data
            .publicUrl;


  } catch (error) {
    
    console.log(error);

    return error.message || 'An unknown error occurred while uploading profile picture';
    
  }

};
