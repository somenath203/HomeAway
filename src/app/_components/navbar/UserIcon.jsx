import { LuUser2 } from "react-icons/lu";

import { fetchProfilePictureOfUser } from "@/server-actions/user-actions";

const UserIcon = async () => {

  const profilePicOfLoggedInUser = await fetchProfilePictureOfUser();


  if (profilePicOfLoggedInUser) {
    return <img src={profilePicOfLoggedInUser} className="w-6 h-6 rounded-full object-cover" />
  }

  return (
    <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />
  )
}

export default UserIcon;