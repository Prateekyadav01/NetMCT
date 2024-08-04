# Netflix Clone

This project is a Netflix-like web application that allows users to browse and search for movies. It uses React, Redux, and Tailwind CSS for the frontend, and Node.js, Express, and MongoDB for the backend. Movie data is fetched from the TMDB API.

## Features

- User Authentication
- Browse Popular Movies
- Search for Movies
- View Movie Details
- Responsive Design
- State Management with Redux

## Tech Stack

### Frontend
- React
- Redux
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- TMDB API

## Installation

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository
    ```sh
    git clone https://github.com/yourusername/netflix-clone.git
    cd netflix-clone
    ```

2. Install dependencies for both frontend and backend
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables

   Create a `.env` file in the `backend` directory with the following content:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    TMDB_API_KEY=your_tmdb_api_key
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the backend server
    ```sh
    cd backend
    npm start
    ```

2. Start the frontend development server
    ```sh
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`


