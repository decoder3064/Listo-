# Listo - Task Management Application

A full-stack task management application built with React, Express, and PostgreSQL. Features user authentication, CRUD operations for tasks, and a terminal-themed UI.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Installation](#installation)
  - [Option 1: Prisma Cloud (Recommended - Easier Setup)](#option-1-prisma-cloud-recommended---easier-setup)
  - [Option 2: Local PostgreSQL](#option-2-local-postgresql)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### For Both Setup Options:
- **Node.js** (v18.18 or higher)
- **npm** (v8.0 or higher)

### Additional for Local PostgreSQL Option:
- **PostgreSQL** (v12 or higher) - Only if you choose local setup

---

## 📦 Dependencies

### Backend Dependencies
- `@prisma/client` - Prisma ORM client
- `bcryptjs` - Password hashing
- `cors` - Cross-Origin Resource Sharing middleware
- `dotenv` - Environment variable management
- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `prisma` - Prisma CLI and schema management

### Backend Dev Dependencies
- `nodemon` - Auto-restart development server

### Frontend Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### Frontend Dev Dependencies
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting
- Various ESLint plugins

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Listo-
```

---

## Option 1: Prisma Cloud (Recommended - Easier Setup)

**✨ This option is simpler because you don't need to install or configure PostgreSQL locally. Prisma handles the database for you!**

### Step 1: Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables

Prisma has already auto-generated a `DATABASE_URL` for you. You just need to verify it exists and add your JWT secret.

Check if `.env` file exists in the `backend` directory. It should contain something like:
```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

Add the following to your `.env` file (keep the existing DATABASE_URL):
```env
# Keep your existing DATABASE_URL - it should look like:
# DATABASE_URL="prisma+postgres://..."

# Add these:
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
```

**Replace** `your-super-secret-jwt-key-change-this-in-production` with a secure random string.

### Step 3: Set up Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (Prisma Cloud handles the database)
npx prisma migrate dev
```

### Step 4: Set Up the Frontend

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install
```

✅ **That's it! Prisma Cloud is ready. Skip to [Running the Application](#️-running-the-application)**

---

## Option 2: Local PostgreSQL

**Use this option if you want full control over your database or need to work offline.**

### Step 1: Install and Set Up PostgreSQL

#### On macOS:
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### On Windows:
Download and install from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)

### Step 2: Create a Database

```bash
# Access PostgreSQL prompt
psql postgres

# Create a database
CREATE DATABASE listo_db;

# Create a user (optional, or use your default postgres user)
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE listo_db TO your_username;

# Exit psql
\q
```

### Step 3: Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Step 4: Configure Environment Variables

Create or update the `.env` file in the `backend` directory with your LOCAL PostgreSQL credentials:

```env
# Replace the existing DATABASE_URL with your local PostgreSQL connection:
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/listo_db"

JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
```

**Replace:**
- `your_username` with your PostgreSQL username (default is often `postgres`)
- `your_password` with your PostgreSQL password
- `listo_db` with your database name (if different)

### Step 5: Set up Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init
```

### Step 6: Set Up the Frontend

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install
```

✅ **Local PostgreSQL is ready!**

---

## ▶️ Running the Application

You'll need **two terminal windows** - one for backend and one for frontend.

### Terminal 1: Run the Backend

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

✅ The backend server will start on **http://localhost:3000**

### Terminal 2: Run the Frontend

```bash
cd frontend

# Development mode
npm run dev
```

✅ The frontend dev server will start on **http://localhost:5173**

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🗂️ Project Structure

```
Listo-/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   └── task.controller.js    # Task CRUD operations
│   ├── middleware/
│   │   └── auth.middleware.js    # JWT verification
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Database migrations
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   └── tasks.routes.js       # Task endpoints
│   ├── utils/
│   │   ├── generateToken.js      # JWT token generation
│   │   └── prisma.js             # Prisma client instance
│   ├── .env                      # Environment variables (not in git)
│   ├── .gitignore
│   ├── server.js                 # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx      # Main dashboard
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Register.jsx       # Registration page
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx    # Authentication state
    │   ├── services/
    │   │   └── api.js             # API client (Axios)
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Terminal-themed styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Tasks (Protected - Requires JWT Token)
- `GET /api/tasks` - Get all user's tasks
- `POST /api/tasks` - Create new task
  ```json
  {
    "title": "Complete project",
    "description": "Finish the Listo app"
  }
  ```
- `PUT /api/tasks/:id` - Update task
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "completed": true
  }
  ```
- `DELETE /api/tasks/:id` - Delete task

**Note:** All protected endpoints require an `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🛠️ Useful Commands

### Backend Commands

#### Prisma Commands
```bash
# Generate Prisma Client (run after schema changes)
npx prisma generate

# Create and apply new migration
npx prisma migrate dev --name migration_name

# Apply existing migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Pull database schema into Prisma
npx prisma db pull

# Push schema changes without migration
npx prisma db push
```

#### Server Commands
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### Frontend Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🎨 Features

- ✅ User authentication (register/login)
- ✅ JWT-based authorization
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Edit task title and description
- ✅ Terminal/hacker-themed UI
- ✅ Responsive design
- ✅ Protected routes
- ✅ Password hashing with bcrypt
- ✅ Form validation

---

## 🐛 Troubleshooting

### Backend Issues

#### "Cannot connect to database"

**For Prisma Cloud:**
- Verify your `DATABASE_URL` in `.env` contains the correct API key
- Check if you have internet connection (Prisma Cloud requires network access)
- Try regenerating Prisma Client: `npx prisma generate`

**For Local PostgreSQL:**
- Make sure PostgreSQL is running:
  ```bash
  # macOS
  brew services list
  
  # Linux
  sudo systemctl status postgresql
  
  # Windows - check Services app
  ```
- Verify your DATABASE_URL credentials in `.env`
- Test connection: `psql -U your_username -d listo_db`
- Ensure database exists: `psql -l` (list all databases)

#### "Prisma Client not found"
```bash
# Regenerate Prisma Client
npx prisma generate
```

#### "Migration failed"
```bash
# Reset database and migrations (WARNING: deletes data)
npx prisma migrate reset

# Then regenerate
npx prisma generate
npx prisma migrate dev
```

### Frontend Issues

#### "Cannot connect to backend"
- Ensure backend is running on port 3000
- Check `API_URL` in `frontend/src/services/api.js` (should be `http://localhost:3000/api`)
- Verify CORS is enabled in `backend/server.js`

#### "Network Error" when making requests
- Backend might not be running
- Check if you're using the correct port
- Clear browser cache and localStorage

#### "Token expired" or "Not authorized"
- Logout and login again
- Check if JWT_SECRET is set in backend `.env`
- Clear localStorage: Open browser console and run `localStorage.clear()`

### Database Issues

#### "Table does not exist"
```bash
# Run migrations
npx prisma migrate dev
```

#### "Unique constraint violation"
- Email already exists in database
- Use a different email or delete the existing user:
  ```bash
  npx prisma studio
  # Delete user from GUI
  ```

---

## 🔄 Switching Between Prisma Cloud and Local PostgreSQL

### From Prisma Cloud to Local PostgreSQL:

1. Install PostgreSQL locally (see Option 2)
2. Create a database
3. Update `DATABASE_URL` in `.env`:
   ```env
   # Change from:
   DATABASE_URL="prisma+postgres://..."
   
   # To:
   DATABASE_URL="postgresql://username:password@localhost:5432/listo_db"
   ```
4. Run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

### From Local PostgreSQL to Prisma Cloud:

1. Get Prisma Cloud connection string
2. Update `DATABASE_URL` in `.env`:
   ```env
   # Change from:
   DATABASE_URL="postgresql://username:password@localhost:5432/listo_db"
   
   # To:
   DATABASE_URL="prisma+postgres://..."
   ```
3. Run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

---

## 📝 Environment Variables Reference

### Backend `.env` File

```env
# Database Connection
# Option 1 - Prisma Cloud:
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"

# Option 2 - Local PostgreSQL:
# DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# JWT Secret (REQUIRED)
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Server Port (optional, defaults to 3000)
PORT=3000
```

---

## 🔐 Security Notes

- **Never commit `.env` files** to version control (already in `.gitignore`)
- **Change default JWT_SECRET** in production
- **Use strong passwords** for PostgreSQL
- **Enable HTTPS** in production
- **Rotate JWT secrets** periodically
- **Implement rate limiting** for production APIs

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 📄 License

ISC

---

## 👤 Author
- David Reyes

**Vitrinnea Assessment Project**

---

## 🙏 Acknowledgments

- Terminal theme inspired by hacker aesthetic
- Built as part of a technical assessment for Vitrinnea

---

## 📞 Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Ensure all dependencies are installed
3. Verify your environment variables
4. Check that all required services are running

**For Prisma Cloud issues:** Visit [Prisma Support](https://www.prisma.io/support)  
**For Local PostgreSQL issues:** Check [PostgreSQL Documentation](https://www.postgresql.org/docs/)
