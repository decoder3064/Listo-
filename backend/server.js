import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";  


dotenv.config();
const app = express();


//Middleware 
app.use(express.json()); 
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fabulous-presence-production-45db.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});
