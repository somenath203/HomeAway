import { findCountryByCode } from '@/utils/countries';


const CountryNameComponent = ({ countryCode }) => {

  const validCountry = findCountryByCode(countryCode);

  const countryName =
    validCountry.name.length > 20
      ? `${validCountry.name.substring(0, 20)}...`
      : validCountry.name;

  return <span className='flex items-center gap-2 text-sm'>

    {countryName}
    
  </span>

};

export default CountryNameComponent;
