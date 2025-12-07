# 🛒 Shopping Cart E-Commerce Template

A production-ready **Shopping Cart / E-Commerce Starter Template** built with modern web technologies. Perfect for developers who want to quickly set up a fully functional e-commerce application with authentication, cart management, and Firebase integration.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11.0-764ABC?logo=redux)
![Firebase](https://img.shields.io/badge/Firebase-12.6.0-FFCA28?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)

---

## ✨ Features

### 🔐 Authentication
- **Email/Password Authentication** - Secure user registration and login
- **Google OAuth** - One-click social login integration
- **Protected Routes** - Secure cart and product detail pages
- **Session Management** - Persistent authentication state

### 🛍️ Shopping Cart
- **Add to Cart** - Add products with quantity management
- **Cart Persistence** - Cart saved to localStorage and Firebase Firestore
- **User-Specific Cart** - Each user has their own cart synced across devices
- **Quantity Management** - Increase/decrease/remove items
- **Billing Summary** - Real-time price calculation with shipping

### 🎨 User Interface
- **Modern Design** - Built with TailwindCSS and DaisyUI
- **Responsive Layout** - Mobile-first, works on all devices
- **Toast Notifications** - User-friendly success/error feedback
- **Loading States** - Smooth loading indicators
- **Product Management** - Add new products dynamically

### 🚀 Performance
- **Fast Development** - Vite for lightning-fast HMR
- **Optimized Build** - Production-ready build output
- **Code Splitting** - Efficient bundle management

---

## 🛠️ Tech Stack

### Core
- **React 19.2.0** - Latest React with modern features
- **Vite 7.2.4** - Next-generation frontend tooling
- **React Router 7.9.6** - Declarative routing for React

### State Management
- **Redux Toolkit 2.11.0** - Modern Redux with simplified API
- **React Redux 9.2.0** - Official React bindings for Redux

### Backend & Authentication
- **Firebase 12.6.0** - Authentication and Firestore database
- **Firebase Auth** - Email/Password + Google OAuth
- **Cloud Firestore** - NoSQL database for cart persistence

### UI & Styling
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.5.5** - Component library for TailwindCSS
- **React Icons 5.5.0** - Popular icon library

### Forms & Notifications
- **React Hook Form 7.67.0** - Performant form library
- **React Hot Toast 2.6.0** - Beautiful toast notifications

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Firebase Account** (for authentication and database)

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <your-repo-url>
cd 2-Shopping-Cart-Project

# Install dependencies
npm install
# or
yarn install
```

### 2. Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project" and follow the setup wizard

2. **Enable Authentication**
   - Navigate to **Authentication** > **Sign-in method**
   - Enable **Email/Password** provider
   - Enable **Google** provider (optional but recommended)

3. **Create Firestore Database**
   - Go to **Firestore Database**
   - Click "Create Database"
   - Start in **test mode** (for development)
   - Choose your preferred location

4. **Get Firebase Configuration**
   - Go to **Project Settings** > **General**
   - Scroll down to "Your apps" section
   - Click the web icon (`</>`) to add a web app
   - Copy the Firebase configuration object

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env
```

Fill in your Firebase credentials:

```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your-project.firebaseapp.com
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-project.appspot.com
VITE_MESSAGINGSENDERID=123456789012
VITE_APPID=1:123456789012:web:abcdef123456
VITE_MEASUREMENTID=G-XXXXXXXXXX
```

> ⚠️ **Important**: Never commit your `.env` file to version control. The `.env.example` file is provided as a template.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

---

## 📁 Project Structure

```
2-Shopping-Cart-Project/
├── public/                 # Static assets
├── src/
│   ├── auth/              # Authentication components
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/           # React Context
│   │   └── AuthContext.jsx
│   ├── firebase/          # Firebase configuration
│   │   ├── Firebase.config.js
│   │   └── cart.js
│   ├── pages/             # Page components
│   │   ├── cart/
│   │   ├── home/
│   │   └── products/
│   ├── redux/             # Redux store and slices
│   │   ├── cart/
│   │   ├── products/
│   │   └── store.js
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
└── README.md              # This file
```

---

## 🔒 Protected Routes

The following routes require authentication:
- `/cart` - Shopping cart page
- `/product/:id` - Product details page

If a user tries to access these routes without being logged in, they will be automatically redirected to `/login`. After successful login, they will be redirected back to the original page.

---

## 🎯 Usage

### Adding Products

1. Navigate to the home page
2. Fill out the "Add New Product" form on the right side
3. Enter product details (name, category, image URL, price, date)
4. Click "Add Product" to add it to the store

### Shopping Cart

1. Browse products on the home page
2. Click "Add to Cart" on any product
3. View your cart by clicking the cart icon in the navbar
4. Adjust quantities or remove items as needed
5. Proceed to checkout (currently shows success message)

### Authentication

1. **Register**: Create a new account with email/password or Google
2. **Login**: Sign in with your credentials
3. **Logout**: Click on your profile and select logout

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎨 Customization

### Branding

1. **App Name**: Update the brand name in `src/components/Navbar.jsx`
2. **Colors**: Modify TailwindCSS classes or DaisyUI theme in `tailwind.config.js`
3. **Logo**: Replace the logo SVG in the Navbar component

### Styling

- TailwindCSS utility classes are used throughout
- DaisyUI components can be customized via theme configuration
- Global styles can be modified in `src/index.css`

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Deploy!

---

## 🔧 Troubleshooting

### Firebase Connection Issues

- Verify all environment variables are correctly set
- Check Firebase project settings
- Ensure Firestore database is created
- Verify authentication providers are enabled

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be v18+)
- Verify all dependencies are installed

---

## 📝 License

This project is available as a template. You can use it for personal or commercial projects.

---

## 🤝 Contributing

This is a template project. Feel free to fork and customize according to your needs.

---

## 📧 Support

For issues or questions:
1. Check the documentation above
2. Review Firebase setup guide
3. Check environment variables configuration

---

## 🎉 Features Roadmap

Potential enhancements for future versions:
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Order history page
- [ ] Product search and filtering
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality

---

**Made with ❤️ using React, Redux, and Firebase**
