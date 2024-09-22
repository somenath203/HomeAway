'use client';

import { ReloadIcon } from "@radix-ui/react-icons";
import { LuPenSquare } from 'react-icons/lu';
import { useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";


const PropertyEditButton = () => {

  const { pending } = useFormStatus();

  return (
    <Button 
        size='icon' 
        variant='link' 
        className='p-2 cursor-pointer'
    >{pending ? <ReloadIcon className='animate-spin' /> : <LuPenSquare />}</Button>
  )

}

export default PropertyEditButton;