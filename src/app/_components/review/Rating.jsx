import { FaStar, FaRegStar } from "react-icons/fa";


const Rating = ({ rating }) => {

  const stars = Array.from({ length: 5 }, (_, index) => {

    return index + 1 <= rating

  });

  return (
    <div className='flex items-center gap-x-1'>

      {stars.map((star, index) => {

        const className = `w-3 h-3 ${star ? 'text-primary' : 'text-gray-400'}`

        return star ? <FaStar className={className} /> : <FaRegStar className={className} key={index} />
      
      })}

    </div>
  )
}

export default Rating;