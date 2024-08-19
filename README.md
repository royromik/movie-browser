This documentation provides an overview of the Movie-Browsing Web Application, including its features, components, and setup instructions. The application allows users to search for movies, filter results based on various criteria, and save their favorite movies. It is designed to be responsive and accessible.

Features
Movie Search: Users can search for movies using a search bar with debounced input.
Advanced Filtering: Users can filter movies by genre, release year range, and rating.
Favorite Movies: Users can mark movies as favorites and view them in a dedicated section.
Responsive Design: The application adjusts to various screen sizes, ensuring usability on mobile devices and desktops.
Accessibility: The application follows best practices for accessibility to accommodate users with different needs.
Technologies Used
Frontend: React, Axios, CSS
Backend: TMDB API for movie data
Deployment: Future plan - Netlify, Vercel, or GitHub Pages

Setup Instructions
1. Clone the Repository from github - git@github.com:royromik/movie-browser.git
Install Dependencies - npm install

Configuration - 
Create a .env file in the root directory of your project and add your TMDB API key:

Start the application using npm start command 

Components
1. App.js
The main component that sets up routing and state management for movies and favorites.

2. Header.js
A transparent header with the application name, search bar, and user icon.

MovieListComponent.js
Displays a list of movies with an option to mark them as favorites.

MovieFilterComponent.js
Allows users to filter movies by genre, release year, and rating.

CarouselComponent.js
Show favourite movies selected by user

Responsive Design
The application uses CSS Flexbox and Grid to ensure a responsive layout. Media queries adjust the design for various screen sizes.

Accessibility
Semantic HTML: Proper use of HTML5 elements.
ARIA Roles: Added to interactive elements for better screen reader support.
Keyboard Navigation: Ensured all interactive elements are accessible via keyboard.

Conclusion
This Movie-Browsing Web Application provides an interactive and user-friendly experience for searching, filtering, and saving favorite movies. It is built with responsiveness and accessibility in mind, ensuring a wide range of users can enjoy its features. For any issues or contributions, please refer to the repository’s issue tracker or submit a pull request.

API Integration
Fetching Movie Data
Search Movies: GET https://api.themoviedb.org/3/search/movie
Filter Movies: GET https://api.themoviedb.org/3/discover/movie

