import bcrypt from "bcryptjs";
import prisma  from "../utils/prisma.js";
import { generateToken } from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body 
    
    try {

         if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({message: "All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({message: "Name must be 2-50 characters and contain only letters"});
        }

         if (password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters"});
        }

          if (password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }

        const userExists = await prisma.user.findUnique({where: { email }});
        if (userExists){
            return res.status(400).json({message: "User already exists"});
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: {name, email, password: hashedPassword}});
        const token = generateToken(user.id);
        const {password: _, ... userWithoutPassword} = user
        res.status(201).json({ ...userWithoutPassword, token});
    }catch (error){
        res.status(500).json({message:"Server error"});
    }
};


export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }

        const user = await prisma.user.findUnique({where: { email }}); 

        if (user && (await bcrypt.compare(password, user.password ))){
            const token = generateToken(user.id);
            const {password: _, ... userWithoutPassword} = user
            res.json({...userWithoutPassword, token})
        }else {
            res.status(401).json({message: "Invalid email or password"})};
    }
    catch(error){
        res.status(500).json({message: "Server error"});
    }
}