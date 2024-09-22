import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const RatingInput = ({ name, labelText }) => {

  const ratingNumbers = Array.from({ length: 5 }, (_, index) => {

    const value = index + 1;

    return value.toString();

  }).reverse(); 

  return <div className='mb-2 max-w-xs'>

    <Label htmlFor={name} className='capitalize'>{labelText || name}</Label>

    <Select 
      defaultValue={ratingNumbers[0]} 
      name={name} 
      required
    >

      <SelectTrigger>

        <SelectValue />

      </SelectTrigger>


      <SelectContent>

        {ratingNumbers.map((rating) => (
          <SelectItem key={rating} value={rating}>
            {rating}
          </SelectItem>
        ))}
        
      </SelectContent>
    
    </Select>
    
  </div>;
};

export default RatingInput;
