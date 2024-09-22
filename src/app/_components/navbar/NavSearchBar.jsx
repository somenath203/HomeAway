'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";


const NavSearchBar = () => {

  const searchParams = useSearchParams();

  const pathname = usePathname();

  const { replace } = useRouter();

  const [ searchInput, setSearchInput ] = useState(searchParams.get('search')?.toString() || '');
                                                          // here, 'search' means &search in url

  const handleSearch = useDebouncedCallback((value) => {

    const params = new URLSearchParams(searchParams);

    if (value) {
      
      params.set('search', value);

    } else {

      params.delete('search');

    }

    replace(`${pathname}?${params.toString()}`);


  }, 500);



  useEffect(() => {

    if (!searchParams.get('search')) {

      setSearchInput('');

    }

  }, [searchParams.get('search')])

  return (
    <Input 
      type="text" 
      placeholder='find your property' 
      className='max-w-xs dark:bg-muted'
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  )
}

export default NavSearchBar;