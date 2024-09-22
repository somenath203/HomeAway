# HomeAway

## Introduction

HomeAway is a full-stack rental booking application that allows users to browse, create, and book rentals across various categories. Users can filter and search for rentals, like and share them via email or social media, as well as leave ratings and comments. The application also provides functionalities to manage user profiles, handle bookings, and view reviews. Admin users can track important statistics such as total users, properties, and bookings. The app features both dark and light modes and is fully responsive.

## Features of the Application

- **User Features:**
  - Browse rentals in different categories with options to filter or search.
  - Create, edit, and delete rentals under the "My Rentals" section.
  - Like/unlike rentals and save them in the "Favorites" section.
  - Comment, rate, and share rentals via email, WhatsApp, and Twitter.
  - View detailed rental information, including description, amenities, location map, and reviews.
  - Book rentals by selecting check-in and check-out dates via a calendar and paying securely through Stripe.
  - Manage bookings under the "Bookings" section, with options to cancel a booking.
  - View and manage personal reviews in the "Reviews" section.
  - Edit user profile information, including the profile picture.
  - **Restrictions on Reviews:** Users cannot leave a review or comment on their own created rental. They can only review rentals created by other users. Additionally, a user can give only one review per rental.

- **Admin Features:**
  - View total number of users, properties, and bookings.
  - Track monthly bookings using a bar graph.

- **Additional Features:**
  - Dark and light mode options.
  - Fully responsive design for various screen sizes.

## Technologies Used

- **Authentication:** Clerk.js
- **ORM:** Prisma
- **Framework:** Next.js
- **Styling:** Tailwind CSS, ShadCN UI
- **Database:** Neon PostgreSQL
- **Storage:** Supabase (for user profile images and rental images)
- **Charts:** Recharts (for displaying booking statistics)
- **Maps:** Leaflet (for displaying rental locations)
- **Payments:** Stripe
- **Form Validation:** Zod
- **State Management:** Zustand
- **Sharing:** React-Share

## Live Deployment Link

[HomeAway Live](https://home-away-somm.vercel.app/)

## Note Regarding Purchasing Subscription Using Stripe

To make a successful payment using Stripe for premium resume templates in this project, you can use the following test card number provided by Stripe:

- **Indian Test Visa Card:** `4000 0035 6000 0008`

For the card details:
- **Card Expiry Date:** Use any date in the future. For example, if today's date is 08/24 (August 2024), you can use an expiry date like 05/28 (May 2028), where `08` and `05` are months, and `24` and `28` are years.
- **Security Code (CVV):** Use `111` or `123`.

For more information, refer to the demo YouTube video of the project as mentioned above.
