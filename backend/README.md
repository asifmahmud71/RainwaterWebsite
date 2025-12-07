# Rainwater Convention Backend API (MongoDB)

Backend server for Rainwater Convention website with MongoDB database.

## Prerequisites

- Node.js 14+
- MongoDB installed and running

## Setup

1. **Install MongoDB:**
   - Windows: https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt install mongodb`

2. **Start MongoDB:**
```bash
   # Windows
   net start MongoDB

   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
```

3. **Install dependencies:**
```bash
   npm install
```

4. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI if needed

5. **Seed database:**
```bash
   node seed.js
```

6. **Start server:**
```bash
   npm run dev
```

## API Endpoints

- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Create registration
- `DELETE /api/registrations/:id` - Delete registration
- `POST /api/admin/login` - Admin login
- `GET /api/health` - Health check

## Default Admin Credentials

- Username: admin
- Password: admin123

## MongoDB Commands
```bash
# Connect to MongoDB shell
mongosh

# Use database
use rainwater_convention

# View collections
show collections

# View registrations
db.registrations.find().pretty()

# View admins
db.admins.find().pretty()
```
```

---

## 📁 **Final MongoDB Backend Structure:**
```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Registration.js      # Registration schema
│   └── Admin.js             # Admin schema
├── node_modules/
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── server.js                # Main server file
├── seed.js                  # Database seeder
└── README.md