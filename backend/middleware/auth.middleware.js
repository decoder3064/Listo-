import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";

export const protect = async (req, res, next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await prisma.user.findUnique({
                where: {id: decoded.id},
                select: {id: true, email: true, name: true},
            });
            next();
        } catch(error){
            console.error(error)
            res.status(401).json({message: "Not authorized, invalid token"});
        }
    }
    else {
        res.status(401).json({message: "No token provided"});
    }
};