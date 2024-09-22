import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FormInput = ({ name, type, label, defaultValue, placeholder }) => {
  return (
    <div className="mb-2">

      <Label htmlFor={name} className='capitalize'>{label}</Label>

      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />

    </div>
  );
};

export default FormInput;
