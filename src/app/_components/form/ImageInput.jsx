'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";


const ImageInput = ({ labeltext }) => {

  const name = 'image';

  const { toast } = useToast();

  const checkFileSize = (e) => {

    const file = e.target.files[0]; 

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file && file.size > MAX_FILE_SIZE) {
      
      toast({
        description: 'file size cannot exceed above 5mb'
      });

      e.target.value = ''; 

    }

  }
  

  return (
    <div className="mb-2">

        <Label htmlFor={name} className='capitalize'>{labeltext}</Label>

        <Input 
          id={name} 
          name={name} 
          type="file" 
          accept=".jpg,.jpeg,.png" 
          className='max-w-xs'
          onChange={checkFileSize}
          required 
        />

    </div>
  )

}

export default ImageInput;
