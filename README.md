# 🍽️ ChefCorner - Marketplace for Local Home-Cooked Meals

[![React](https://img.shields.io/badge/Frontend-React.js-61DBFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Server-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Auth-Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Stripe](https://img.shields.io/badge/Payment-Stripe-008CDD?logo=stripe&logoColor=white)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-2EA043?logo=google-chrome&logoColor=white)](https://your-live-link.com)
[![GitHub](https://img.shields.io/badge/Source_Code-GitHub-181717?logo=github&logoColor=white)](https://github.com/your-username/localchefbazaar)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# 📋 Project Overview
chefCorner is a modern full-stack web platform that connects home cooks with customers looking for fresh, homemade meals. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this marketplace enables home chefs to monetize their culinary skills while providing customers with access to healthy, affordable homemade meals.

# 🔗 Project Links
Live Demo Client Repository Server Repository MIT License

Server Repository: https://github.com/alifhossinsajjad/Chef-Bazzer-Server

# ✨ Key Features
# 🔐 Authentication & Security
- JWT-based authentication with HTTP-only cookies

- Firebase Authentication for user registration/login

- Role-based access control (Admin, Chef, Customer)

- Environment variables for sensitive credentials

- Protected routes with token validation

# 👥 User Roles & Permissions

- Admin - Full system access, user management, platform statistics
- Chef - Create/manage menus, handle orders, view order requests
- 
- Customer - Browse meals, place orders, leave reviews, track orders

# 🍳 Core Functionalities
- Meal Browsing & Ordering - Browse daily menus with sorting options
- 
- Real-time Order Tracking - Live status updates for orders
- 
- Review System - Rate and review meals with star ratings
- 
- Favorites Management - Save favorite meals for quick access
- 
- Secure Payments - Stripe integration for payment processing
- 
- Dynamic Dashboard - Personalized dashboards for each role
- 
- Request System - Users can request chef/admin roles
- 
- Fraud Detection - Admin can flag suspicious users

# 📱 Responsive Design
- Mobile-first responsive design
- 
- Eye-pleasing color scheme with proper contrast
- 
- Clean layout with proper spacing and alignment
- 
- Accessible navigation and interactions

# 🛠️ Tech Stack
- Frontend
- React - UI library
- 
- React Router - Client-side routing
- 
- TanStack Query - Data fetching and state management
- 
- React Hook Form - Form handling with validation
- 
- Tailwind CSS - Utility-first styling
- 
- Framer Motion - Animations and transitions
- 
- Recharts - Data visualization
- 
- sAxios - HTTP client
- 
- SweetAlert2 - Beautiful alerts and modals
- 
- React Toastify - Toast notifications
- 
# Frontend
React TypeScript TailwindCSS React Router React Hook Form TanStack Query

# Backend
- Node.js - Runtime environment
- 
- Express.js - Web framework
- 
- MongoDB - NoSQL database
- 
- Mongoose - ODM for MongoDB
- 
- JWT - Authentication tokens
- 
- CORS - Cross-origin resource sharing
- 
- Dotenv - Environment variables
- 
- Node.js Express.js MongoDB JWT

# External Services
- Firebase - User authentication
- 
- Stripe - Payment processing
- 
- Vercel/Netlify - Frontend deployment
- 
- Render/Railway - Backend deployment
- 
- Firebase Stripe Vercel Git NPM

# 📦 Installation & Setup
- Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project
- 
- Stripe account (for payments)

# Backend Setup
```
cd server
npm run test
npm install 
```

# Create a .env file in the server directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
Start the server:
```
```
bash

npm start
```
# or for development
```
npm run dev
Frontend Setup
bash
cd client
npm install
```

# Create a .env file in the client directory:
```
.env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```
# Start the development server:
```
bash
npm run dev
```

# 📁 Project Structure
```
text
chefcorner/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       ├── layouts/        # Layout components
│       ├── pages/          # Page components
│       ├── routes/         # Route definitions
│       ├── services/       # API services
│       └── utils/          # Utility functions
│
└── server/                 # Express backend
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    └── utils/              # Server utilities
```


# 🔒 Security Features
- JWT tokens stored in HTTP-only cookies
- 
- Password hashing with bcrypt
- 
- Input validation and sanitization
- 
- CORS configuration for production
- 
- Environment variables for sensitive data
- 
- Rate limiting on authentication endpoints
- 
- XSS protection headers

# 🎨 UI/UX Features
- Framer Motion Animations - Smooth page transitions
- 
- Responsive Carousel - Featured meals showcase
- 
- Interactive Maps - Delivery area visualization (Leaflet)
- 
- Dark/Light Theme - Optional theme toggle
- 
- Loading States - Skeleton loaders and spinners
- 
- Error Boundaries - Graceful error handling
- 
- Toast Notifications - User feedback system

# 📊 Database Collections
- users - User profiles and authentication
- 
- meals - Meal listings with chef information
- 
- orders - Order transactions and status
- 
- reviews - User reviews and ratings
- 
- favorites - User favorite meals
- 
- requests - Role change requests
- 
- payments - Payment history and status

# 🚀 Deployment Guidelines
- Client Deployment (Vercel/Netlify)
- 
- Connect your GitHub repository
- 
- Add environment variables
- 
- Set build command: npm run build
- 
- Set output directory: dist
- 
- Add Firebase authorized domains
- 
- Server Deployment (Render/Railway)
- 
- Create a new web service

# Connect your GitHub repository

- Add environment variables
- 
- Set start command: npm start
- 
- Configure CORS for your client domain

# Important Notes
- Ensure MongoDB connection string is correctly set
- 
- Configure Firebase authorized domains
- 
- Set proper CORS origins
- 
- Test all API endpoints in production
- 
- Verify Stripe webhook URLs

# 🧪 Testing
- Manual testing for all user flows
- 
- Cross-browser compatibility testing
- 
- Mobile responsiveness testing
- 
- API endpoint testing with Postman
- 
- Form validation testing
- 
- Payment flow testing (Stripe test mode)

# 📈 Performance Optimizations
- Code splitting with React.lazy()
- 
- Image optimization with lazy loading
- 
- API response caching with TanStack Query
- 
- Bundle size optimization
- 
- Database indexing for frequent queries
- 
- Server-side pagination

# 🐛 Troubleshooting Common Issues
- CORS Errors
- 
- Ensure CORS middleware is properly configured
- 
- Check allowed origins in server configuration
- 
- Verify client URL in environment variables
- 
- Authentication Issues
- 
- Check JWT token expiration
- 
- Verify Firebase configuration
- 
- Ensure HTTP-only cookies are enabled

# Database Connection

- Verify MongoDB Atlas IP whitelist
- 
- Check connection string in environment variables
- 
- Ensure proper network access
- 
- Payment Issues
- 
- Verify Stripe keys in environment variables
- 
- Check webhook endpoint configuration
- 
- Test with Stripe test cards

# 👥 Contributing
- Fork the repository
- 
- Create a feature branch
- 
- Commit changes with descriptive messages
- 
- Push to the branch
- 
- Open a pull request

# 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments
Firebase for authentication services

Stripe for payment processing

MongoDB Atlas for database hosting

All open-source libraries used in this project

# 📞 Contact & Support
For support or questions:
Email: alifhossinsajjad123456@gmail.com

GitHub Issues: https://github.com/alifhossinsajjad/Chef-Bazzer-Client

it is my project can you total overview write for me in shorly i use this description in the linked in add project section
