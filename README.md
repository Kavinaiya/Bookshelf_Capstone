
# Bookshelf - A Mini Social Network for Book Lovers

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Contributors](#contributors)
- [Releases](#releases)
- [Acknowledgments](#acknowledgments)

---

## Project Overview

Bookshelf is a full-stack web application that serves as a mini social network for book enthusiasts. Users can curate their book collections, rate and review books, and engage with their book-loving friends. The application leverages a modern tech stack:

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB
- **Hosting**: Cloud platform mentioned - Heroku

## Features

### Frontend Features
- **Book Search and Collection Management**: Search for books and add them to personalized collections.
- **User Dashboards**: Tailored views showcasing user activities, reviews, and curated book lists.
- **Social Integration**: Track friend's reviews and discover new books through their collections.

### Backend Features
- **RESTful API**: Provides endpoints for user authentication, book data management, and reviews.
- **Secure Authentication**: Implements robust session handling and user data security.
- **Database Integration**: Uses MongoDB for efficient data storage and retrieval.

## Repository Structure

```
Bookshelf_Capstone/
├── client/
│   ├── public/              # Static assets such as HTML and images
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Individual page views for the app
│   │   ├── App.js           # Main React component
│   │   ├── index.js         # Application entry point
│   │   └── ...
│   ├── package.json         # Frontend dependencies
│   └── ...
├── server/
│   ├── controllers/         # Handles business logic for API routes
│   ├── models/              # Mongoose models for MongoDB
│   ├── routes/              # API route definitions
│   ├── server.js            # Main server entry point
│   ├── package.json         # Backend dependencies
│   └── ...
├── README.md                # Project documentation
└── ...
```

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed.
- A MongoDB instance (local or cloud-based, such as MongoDB Atlas).

### Setup and Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Kavinaiya/Bookshelf_Capstone.git
   ```

2. Navigate to the repository:
   ```bash
   cd Bookshelf_Capstone
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. Start the backend server:
   ```bash
   cd server && npm start
   ```

5. Start the frontend development server:
   ```bash
   cd client && npm start
   ```

6. Access the application at [http://localhost:3000](http://localhost:3000).

## Development Workflow

### Branching Strategy
- **`main`**: Production-ready code.
- **`dev`**: Features under active development.
- **Feature branches**: For specific features (e.g., `feature/authentication`).

### Commit Guidelines
- Use descriptive commit messages (e.g., `Add user authentication feature`).
- Commit frequently to ensure changes are well-tracked.

### Pull Requests and Code Reviews
- Submit a pull request for merging feature branches into `dev`.
- Collaborate on code reviews to maintain code quality.

## Contributors

- **Project Owner**: [Kavinaiya](https://github.com/Kavinaiya)
- Contributions are welcomed! Follow the guidelines for submitting pull requests.

## Releases

- **v1.0.0**: Initial release with core features like book search, collection management, and authentication.
- **v2.0.0**: Enhanced dashboards and social integration features.

## Acknowledgments

- [React.js Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- Community forums and contributors for inspiration and troubleshooting.
