import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


const isPublicRoute = createRouteMatcher(['/']);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);


export default clerkMiddleware((auth, req) => {


  const clerkIdOfTheCurrentlyLoggedInUser = auth().userId;


  const admin_clerk_user_id = process.env.ADMIN_CLERK_USER_ID;
  // We have stored the ID of the user who is admin in .env file and then we check whether the clerk
  // ID of the user who is admin is equal to the clerk ID of the currently logged in user or not, if yes,
  // then, grant him/her access to the admin panel
  
  const isCurrentLoggedInUserAdmin = clerkIdOfTheCurrentlyLoggedInUser === admin_clerk_user_id;

  if(isAdminRoute(req) && !isCurrentLoggedInUserAdmin) {

    // if the current path that the user is trying to access is '/admin' and if the current logged in
    // user is not an actual admin, then, redirect him/her back to home page
    return NextResponse.redirect(new URL('/', req.url));

  }

  
  if (!isPublicRoute(req)) auth().protect();


});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};