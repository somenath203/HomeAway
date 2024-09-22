# HomeAway

## Introduction

HomeAway is a full-stack rental booking application that allows users to browse, create, and book rentals across various categories. Users can filter and search rentals, like and share them via email or social media, as well as leave ratings and comments. The application also provides functionalities to manage user profiles, handle bookings, and view reviews. Admin users can track important statistics like total users, properties, and bookings. The app features both dark and light modes and is fully responsive.

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

