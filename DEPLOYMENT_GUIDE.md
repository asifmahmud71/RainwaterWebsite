
Rainwater Convention Website
Local Deployment Guide


==================================================

Technology Stack
- Frontend: Vite + React
- Backend: Express.js
- Database: MongoDB (Local)
- Programming Language: JavaScript

==================================================

System Requirements
- Node.js (v18 or later)
- MongoDB Community Edition
- Git (optional)
- Any modern web browser

==================================================

Project Structure

rainwater-convention/
│
├── frontend/    → Vite + React Client
├── backend/     → Express.js API Server
└── README.md

==================================================

Backend Setup (Local)

1. Navigate to backend
cd backend

2. Install dependencies
npm install

3. Create .env file in backend

PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rainwater_convention
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_super_secret_key

4. Start MongoDB
mongod

5. Start Backend
npm run dev

Backend URL:
http://localhost:5000

==================================================

Frontend Setup (Local)

1. Navigate to frontend
cd frontend

2. Install dependencies
npm install

3. Create frontend .env

VITE_API_URL=http://localhost:5000/api

4. Start frontend
npm run dev

Frontend URL:
http://localhost:5173

==================================================

Website Pages
Home        → /
FAQs        → /faqs
Register    → /register
Admin Panel → /admin

==================================================

Admin Features
- View registrations
- Delete users
- Monitor timestamps

==================================================

Form Validation
- Required fields
- Email format validation
- Error messages shown

==================================================

Architecture Flow

Browser (5173)
   ↓
Vite + React
   ↓
Express API (5000)
   ↓
MongoDB (27017)

==================================================

Cloud Mode (Optional)

Change in frontend .env:

VITE_API_URL=https://assignment1-rainwaterwebsite-backend.onrender.com/api

Restart frontend after change:
npm run dev

==================================================

Conclusion

This project can now be executed fully on a local machine without dependency on cloud services.
