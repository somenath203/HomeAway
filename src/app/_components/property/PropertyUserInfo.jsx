import Image from 'next/image';

const PropertyUserInfo = ({ userProfileImage, userFullName }) => {
  return (
    <article className="grid grid-cols-[auto, 1fr] gap-4 mt-4">
    
      <Image
        src={userProfileImage}
        alt={userFullName}
        width={50}
        height={50}
        className='rounded w-12 h-12 object-cover'
      />

      <div>

        <p>Property created by <span className='font-bold'>{userFullName}</span> </p>

      </div>

    </article>
  );
};

export default PropertyUserInfo;
