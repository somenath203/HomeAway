import Link from "next/link";

import { Button } from "@/components/ui/button";


const EmptyList = ({
  heading = 'No items in the list',
  message = 'Keep exploring the properties',
  btnText = 'Back to Home'
}) => {
  return <div className="mt-4">

    <h2 className="text-xl font-bold">{heading}</h2>

    <p className="text-lg">{message}</p>

    <Button asChild className='mt-4 capitalize' size='lg'>
      
      <Link href='/'>{btnText}</Link>
    
    </Button>
  
  </div>;
};

export default EmptyList;
