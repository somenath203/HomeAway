import FormContainer from '../_components/form/FormContainer';
import {
  updateProfile,
  fetchWholeProfileOfUser,
  updateProfileImageAction,
} from '@/server-actions/user-actions';
import FormInput from '../_components/form/FormInput';
import SubmitButton from '../_components/form/SubmitButton';
import ImageInputContainer from '../_components/form/ImageInputContainer';


const Page = async () => {

  const profileOfCurrentLoggedInUser = await fetchWholeProfileOfUser();


  return (
    <section>

      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Profile
      </h1>

      <div className="border p-8 rounded-md">

        
        <ImageInputContainer 
          image={profileOfCurrentLoggedInUser?.profileImage}
          name={profileOfCurrentLoggedInUser?.userName}
          action={updateProfileImageAction}
          text='Update Profile Image'
        />

        <FormContainer action={updateProfile}>

          <div className="grid md:grid-cols-2 gap-4 mt-4">

            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              placeholder="enter your firstname"
              defaultValue={profileOfCurrentLoggedInUser?.firstName}
            />

            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="enter your lastname"
              defaultValue={profileOfCurrentLoggedInUser?.lastName}
            />

            <FormInput
              type="text"
              name="userName"
              label="Username"
              placeholder="enter your username"
              defaultValue={profileOfCurrentLoggedInUser?.userName}
            />

          </div>

          <SubmitButton buttontext="Update Profile" className="mt-8" />

        </FormContainer>

      </div>

    </section>
  );
};

export default Page;
