# 🏡 Wanderlust - Vacation Rental Platform

A full-stack web application built with Node.js and Express that allows users to list, discover, and review vacation rental properties. Think Airbnb but with a wanderlust spirit! 🌍

## 🚀 Live Demo

Check out the live application: [https://wanderlust-i665.onrender.com](https://wanderlust-i665.onrender.com)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🏠 Property Management
- **Create Listings**: Add new vacation rental properties with images and descriptions
- **Edit Listings**: Update property information and images
- **Delete Listings**: Remove properties from the platform
- **Image Upload**: Upload and manage property photos with Cloudinary integration

### 🗺️ Location & Maps
- **Interactive Maps**: View property locations using Leaflet maps
- **Geocoding**: Automatic address to coordinates conversion using OpenStreetMap
- **Location-based Search**: Find properties by location

### 👥 User Authentication & Authorization
- **User Registration**: Sign up with email and username
- **Secure Login/Logout**: Passport.js authentication with local strategy
- **Session Management**: Secure session handling with MongoDB store
- **Authorization**: Owner-based permissions for listing management

### ⭐ Reviews & Ratings
- **Review System**: Users can leave reviews and ratings for properties
- **Review Management**: Edit and delete reviews with proper authorization
- **Review Display**: View all reviews with author information

### 🔒 Security Features
- **Flash Messages**: User feedback for actions and errors
- **Error Handling**: Comprehensive error handling with custom error pages
- **Session Security**: HTTP-only cookies and secure session configuration
- **Input Validation**: Server-side validation for all user inputs

### 📱 User Experience
- **Responsive Design**: Mobile-friendly interface
- **Flash Notifications**: Success and error message system
- **Image Optimization**: Automatic image resizing and optimization
- **404 Error Page**: Custom error handling for non-existent routes

## 🛠️ Tech Stack

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **Passport.js** - Authentication middleware
- **Express-Session** - Session management
- **Connect-Flash** - Flash message middleware
- **Connect-Mongo** - MongoDB session store

### File Upload & Storage
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image storage and optimization

### Maps & Geocoding
- **Leaflet** - Interactive maps
- **Node-Geocoder** - Address to coordinates conversion
- **OpenStreetMap** - Map tile provider

### Template Engine & Styling
- **EJS** - Embedded JavaScript templating
- **EJS-Mate** - Layout support for EJS
- **Bootstrap** - CSS framework (assumed from typical setup)

### Development Tools
- **Method-Override** - HTTP method override
- **Dotenv** - Environment variable management
- **Nodemon** - Development server auto-restart

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** (for image storage)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the application**
   ```
   http://localhost:8080
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
ATLASDB_URL=your_mongodb_connection_string

# Session Secret
SECRET_KEY=your_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Environment
NODE_ENV=development
```

## 🎯 Usage

### For Property Owners
1. **Sign up** for a new account
2. **Login** to your account
3. **Create a new listing** with property details and images
4. **Manage your listings** - edit or delete as needed
5. **View reviews** left by guests

### For Travelers
1. **Browse listings** on the homepage
2. **View detailed property information** with maps and photos
3. **Leave reviews** for properties you've experienced
4. **Sign up/Login** to access full features

## 🛣️ API Routes

### Authentication Routes
- `GET /signup` - Render signup form
- `POST /signup` - Create new user account
- `GET /login` - Render login form
- `POST /login` - Authenticate user
- `POST /logout` - Logout user

### Listing Routes
- `GET /listings` - Display all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - Show specific listing with map
- `GET /listings/:id/edit` - Show edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Review Routes
- `POST /listings/:id/reviews` - Create new review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### Listing Model
```javascript
{
  title: String,
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [ObjectId],
  owner: ObjectId
}
```

### Review Model
```javascript
{
  comment: String,
  rating: Number,
  author: ObjectId,
  createdAt: Date
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📸 Screenshots

[Add screenshots of your application here]

## 🐛 Known Issues

- Add any known issues or limitations here

## 🔮 Future Enhancements

- [ ] Advanced search and filtering
- [ ] Booking system with calendar integration
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Social media login
- [ ] Multi-language support
- [ ] Mobile application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [Rohith-Kumar314](https://github.com/Rohith-Kumar314)
- LinkedIn: [Rohith Kumar Asarelly](https://www.linkedin.com/in/rohith-kumar-asarelly-54ab052b7/)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspiration from Airbnb and other rental platforms
- OpenStreetMap for providing free map services
- The Node.js and Express.js communities

---

⭐ **If you found this project helpful, please give it a star!** ⭐