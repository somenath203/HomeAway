import Link from 'next/link';
import { SignedOut, SignedIn, SignInButton, SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

import UserIcon from './UserIcon';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LuAlignLeft } from 'react-icons/lu';
import { links } from '@/utils/DropDownLinks';
import SignOutLink from './SignOutLink';


const LinksDropdown = () => {

  const { userId } = auth();

  const isCurrentlyLoggedInUserAdmin = userId === process.env.ADMIN_CLERK_USER_ID;

  return (
    <DropdownMenu>


      <DropdownMenuTrigger asChild>

        <Button variant='outline' className="flex gap-4 max-w-[100px]">
          
          <LuAlignLeft className='w-6 h-6' />

          <UserIcon className='w-6 h-6' />

        </Button>

      </DropdownMenuTrigger>


      <DropdownMenuContent className='w-52' align='start' sideOffSet={10}>

        {/* Whatever we place inside 'SignedOut' will be displayed if the user hasn't logged in*/}
        <SignedOut>

          <DropdownMenuItem>

            <SignInButton mode='modal'>
              <button className='w-full text-left'>LogIn</button>
            </SignInButton>

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>

            <SignUpButton mode='modal'>
              <button className='w-full text-left'>SignUp</button>
            </SignUpButton>

          </DropdownMenuItem>

        </SignedOut>

        <SignedIn>

          {links.map((link) => {

            if(link.label === 'admin' && !isCurrentlyLoggedInUserAdmin) {
              
              return null;
              
            }
            
            return <DropdownMenuItem key={link.label}>
              <Link href={link.href} className='capitalize w-full'>{link.label}</Link>
            </DropdownMenuItem>

          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>

        </SignedIn>

      </DropdownMenuContent>


    </DropdownMenu>
  )
}

export default LinksDropdown;