
# PeppLearn

PeppLearn is a full-stack web application designed to provide an engaging and interactive learning platform. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, it offers users a seamless experience to explore various courses and educational content.

## 🚀 Features

- **User Authentication**: Secure login and registration system with JWT-based authentication.
- **Course Management**: Browse, enroll, and track progress in various courses.
- **Interactive UI**: Responsive and intuitive user interface for enhanced user experience.
- **Admin Dashboard**: Manage courses, users, and content through an administrative panel.
- **RESTful API**: Robust backend API to handle all application functionalities.

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Redux
- React Router
- CSS3 / SCSS

**Backend**:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## 📁 Project Structure

```bash
PeppLearn/
├── client/               # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── App.js
├── server/               # Backend Express application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Installation

### 1. **Clone the repository**:
`git clone https://github.com/The-Deepak-Pandey/PeppLearn.git
cd PeppLearn`

### 2. **Install Dependancies:**
 **Install backend dependencies**
`cd server`
`npm install`

 **Install frontend dependencies**
`cd ../client`
`npm install`

### 3. **Set Up Environment Variables**
Create a `.env` file inside the `server` folder and add the following:
```bash
PORT=5000
MONGO_URI
SECRET_KEY
# Cloudinary setup
API_KEY
API_SECRET
CLOUD_NAME
```
### 4. **Start The Application**
```bash
# Start backend server
cd server
npm start

# Start frontend React app
cd ../client
npm start
```

## 📌 Contributing

Contributions are welcome and appreciated! To contribute:

1.  Fork the repository
  
2.  Create a new branch (`git checkout -b feature/your-feature`)
   
3.  Commit your changes (`git commit -am 'Add some feature'`)
    
4.  Push to the branch (`git push origin feature/your-feature`)
    
5.  Open a pull request