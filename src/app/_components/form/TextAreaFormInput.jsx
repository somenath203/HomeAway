import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


const TextAreaFormInput = ({ defaultDescription = 'Glamping Tuscan Style in an Aframe Cabin Tent, nestled in a beautiful olive orchard. AC, heat, Queen Bed, TV, Wi-Fi and an amazing view. Close to Weeki Wachee River State Park, mermaids, manatees, Chassahwitzka River and on the SC Bike Path. Kayaks available for rivers. Bathhouse, fire pit, Kitchenette, fresh eggs. Relax & enjoy fresh country air. No pets please. Ducks, hens and roosters roam the grounds. We have a Pot Cake Rescue from Bimini, Retriever and Pom dog. The space is inspiring and relaxing. Enjoy the beauty of the orchard. Spring trees are in blossom and harvested in Fall. We have a farm store where we sell our farm to table products' }) => {
  
  const name = 'description';

  return (
    <div className="mb-2">

      <Label htmlFor={name} className="capitalize" rows={5} required>
        Description (10 - 1000 words)
      </Label>

      <Textarea
        id={name}
        name={name}
        className="leading-loose !resize-none"
        defaultValue={defaultDescription}
      />

    </div>
  );
};

export default TextAreaFormInput;
