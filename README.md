# YouTube Clone Project

## Project Overview
This is a full-stack YouTube-like application built with React for the frontend and Express for the backend, featuring video authentication, user management, and search functionality.

## 🚀 Features
- User Authentication
  - Signup
  - Login
  - Logout (Currently experiencing issues)
- Video Viewing
- Search Functionality
- Google Cloud API Key Integration for Video Uploads

## 🛠 Tech Stack
### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios for API requests
- React Router DOM

### Backend
- Express.js
- Mongoose
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing
- Multer for file uploads

## 📦 Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database
- Google Cloud API credentials

## 🔧 Installation

### Project Setup
1. Clone the repository
```bash
git clone https://github.com/goyal1510/youtube-clone.git
cd youtube-clone
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```

4. Start the backend server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd frontend
npm install
```

2. Start the development server
```bash
npm run dev
```

## 🚧 Current Limitations
- Logout functionality is not fully implemented
- Potential improvements needed in authentication flow

## 🔒 Security Notes
- Implemented password hashing with bcrypt
- JWT used for authentication
- Use environment variables for sensitive credentials

## 📝 Future Improvements
- Fix logout functionality
- Enhance error handling
- Implement more robust video upload process
- Add user profile management

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🛠 Troubleshooting
- Ensure all environment variables are correctly set
- Check MongoDB connection
- Verify Google Cloud API key permissions

## 📞 Contact
Your Name - goyal151002@gmail.com