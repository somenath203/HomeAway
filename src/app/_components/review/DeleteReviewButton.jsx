'use client';

import { ReloadIcon } from "@radix-ui/react-icons";
import { LuTrash2 } from "react-icons/lu";
import { useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";


const DeleteReviewButton = () => {

  const { pending } = useFormStatus();

  return (
    <Button 
        type='submit' 
        size='icon' 
        variant='link' 
        className='p-2 cursor-pointer'
    >{pending ? <ReloadIcon className='animate-spin' /> : <LuTrash2 />}</Button>
  )

}

export default DeleteReviewButton