import { formatQuantity } from '@/utils/formatquantity';


const PropertyDetails = ({ propertyDetails }) => {

  const { noOfBathrooms, noOfBedrooms, noOfBeds, noOfGuests } = propertyDetails;

  return <p className='text-md font-light'>

    <span> {formatQuantity(noOfBathrooms, 'bathroom')} &middot; </span>

    <span> {formatQuantity(noOfBedrooms, 'bedroom')} &middot; </span>

    <span> {formatQuantity(noOfBeds, 'bed')} &middot; </span>

    <span> {formatQuantity(noOfGuests, 'max guest')} </span>

  </p>;

};


export default PropertyDetails;
