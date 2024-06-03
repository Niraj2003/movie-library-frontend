# Frontend Documentation for Movie Library Web Application

The frontend of the Movie Library Web Application is built using React and Bootstrap, providing a user-friendly interface for managing movie lists, searching for movies, and viewing detailed movie information. Below are the key components and features implemented in the frontend:

## Key Components

### Home Component (`Home.js`):

- Displays public movie lists created by users.
- Allows navigation to login and registration pages.
- Fetches public lists from the backend and displays them using Bootstrap cards.
- Users can expand lists to see movies within them.

### Login Component (`Login.js`):

- Provides a form for users to log in using their email and password.
- Handles user authentication and sets an auth token in cookies.
- Redirects authenticated users to their profile page.

### MovieDetails Component (`MovieDetails.js`):

- Displays detailed information about a specific movie.
- Fetches movie details from the OMDB API based on the movie's IMDb ID.

### MovieList Component (`MovieList.js`):

- Allows users to search for movies and add them to a custom movie list.
- Users can create lists, specify if they are public or private, and submit the lists to the backend.

### Profile Component (`Profile.js`):

- Displays the logged-in user's profile information and their created movie lists.
- Allows users to expand lists to see the movies within them.
- Fetches user data and movie lists from the backend.

### Register Component (`Register.js`):

- Provides a form for new users to register an account with email, username, and password.
- Submits registration data to the backend.

### Navigation Component (`Navbar.js`):

- Provides navigation links to different pages (Home, Login, Register, Profile, Movies).
- Uses React Bootstrap for the layout.

## Features

### User Authentication:

- Users can register, log in, and log out.
- Authentication tokens are stored in cookies for secure access.

### Movie Search and Details:

- Users can search for movies using the OMDB API.
- Detailed information about selected movies is displayed on a dedicated page.

### Movie Lists:

- Users can create custom movie lists, which can be public or private.
- Lists can be viewed and managed on the profile page.

### Responsive Design:

- The application uses Bootstrap for a responsive and modern UI.

## Environment Variables

The application uses the following environment variables:

- `REACT_APP_BACKEND_URL`: URL of the backend server.
- `REACT_APP_OMDB_API`: API key for accessing the OMDB API.


## Functionality Overview:

- User Authentication:
  - Users can sign up for a new account or log in to their existing account.
  - Authentication tokens are stored in cookies for secure access to protected routes.
- Movie Search:
  - Users can search for movies using the search bar on the home page.
  - The application fetches movie details from the OMDB API based on the user's search query.
- List Creation:
  - Users can create personalized lists of movies by selecting them from search results.
  - Lists can be named and categorized as public or private based on user preference.
- Profile Viewing:
  - Users can view their profile information, including username and email.
  - The profile page also displays the movie lists created by the user.

## Tech Stack:

- Frontend: React, React Router
- Styling: Bootstrap
- HTTP Requests: Axios
- State Management: useState, useEffect hooks

The frontend of the Movie Library Web Application provides a seamless and intuitive user experience, allowing users to explore, create, and manage their movie collections with ease.
