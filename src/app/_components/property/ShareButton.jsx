'use client';

import { LuShare2 } from 'react-icons/lu';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';


const ShareButton = ({ propertyId, name }) => {

  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  const sharePropertyLink = `${baseUrl}/properties/${propertyId}`;


  return (
    <Popover>

      <PopoverTrigger asChild>

        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>

      </PopoverTrigger>

      <PopoverContent
        side="top" 
        align="end" 
        sideOffset={10} 
        className="flex items-center gap-x-2 justify-center w-full"
      >

        <TwitterShareButton url={sharePropertyLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton url={sharePropertyLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton url={sharePropertyLink} title={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>

      </PopoverContent>

    </Popover>
  );
};

export default ShareButton;
