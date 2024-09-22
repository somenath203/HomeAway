# HomeAway

## Introduction

HomeAway is a full-stack rental booking application that allows users to explore, create, and manage rental properties. Users can browse rentals from various categories, filter them based on preferences, and search for specific rentals. In addition to browsing, users can create their own rental listings, book properties, and interact with other listings by liking, commenting, and rating them. Users can manage their bookings, reviews, and favorites seamlessly. The application supports user authentication and has an admin panel for managing users, properties, and bookings. HomeAway also features light and dark modes and is fully responsive.

## Features of the Application

- **User Functionalities:**
  - Browse rentals from different categories.
  - Filter or search for specific rental categories.
  - Like, comment, and rate rentals.
  - Create a new rental listing with relevant details and images.
  - View and manage all rentals created by the user.
  - Book rentals by selecting check-in and check-out dates and making payments via Stripe.
  - View, edit, or delete reviews from the “Reviews” section.
  - Manage liked rentals in the “Favorites” section.
  - Update profile information including profile picture.
  - View all bookings under the “Reservation” section.
  - View full rental details including photos, amenities, and location on a map.
  - View and manage all bookings made for their own created rentals.
  
- **Admin Functionalities:**
  - View the total number of users, properties, and bookings.
  - Track the number of bookings made each month with a bar graph.
  
- **Additional Features:**
  - Dark and light mode support.
  - Fully responsive design for optimal viewing on all devices.

## Technologies Used

- **Clerk.js** - Authentication system for managing user signups and logins.
- **Prisma ORM** - Database ORM for efficient querying and management of the PostgreSQL database.
- **Next.js** - Full-stack framework for building the application with server-side rendering.
- **Tailwind CSS** - Utility-first CSS framework for styling the application.
- **ShadCN UI** - Component library for building a sleek user interface.
- **Neon PostgreSQL** - Database for storing all application data.
- **Supabase** - Used for storing user profile images and rental images.
- **Recharts** - Data visualization library used for displaying booking statistics in the admin panel.
- **Leaflet** - Interactive maps for displaying rental locations.
- **Stripe** - Payment gateway for processing bookings.
- **Zod** - Validation library for ensuring data integrity.
- **Zustand** - State management library used across the application.
