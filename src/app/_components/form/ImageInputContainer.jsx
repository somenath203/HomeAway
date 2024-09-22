'use client';
import { useState } from 'react';
import Image from 'next/image';
import { LuUser2 } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import SubmitButton from './SubmitButton';

const ImageInputContainer = ({ image, name, action, text, children, labeltext='Profile Image' }) => {


  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);


  const userIcon = (
    <LuUser2 className="w-24 h-24 bg-primary rounded text-white mb-4" />
  );

  return (
    <div>
      
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded object-cover mb-4 w-24 h-24"
        />
      ) : (
        userIcon
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsUpdateFormVisible((prevValue) => !prevValue)}
      >
        {text}
      </Button>

      {isUpdateFormVisible && <div className='max-w-lg mt-4'>

        <FormContainer action={action}>

            { children }

            <ImageInput labeltext={labeltext} />

            <SubmitButton size='sm' buttontext='Submit' />

        </FormContainer>

      </div>}

    </div>
  );
};

export default ImageInputContainer;
