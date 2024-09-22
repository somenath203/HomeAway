import { useFormStatus } from 'react-dom';
import { ReloadIcon } from '@radix-ui/react-icons';
import { FaRegHeart, FaHeart } from "react-icons/fa";  

import { Button } from '@/components/ui/button';


const FavouritePropertyCardSubmitButton = ({ isFavourite }) => {

  const { pending } = useFormStatus();

  return (
    <Button type='submit' size='icon' variant='outline' className='p-2 cursor-pointer'>
        { pending ? <ReloadIcon className='animate-spin' /> : isFavourite ? <FaHeart /> : <FaRegHeart />  }
    </Button>
  );
};

export default FavouritePropertyCardSubmitButton;