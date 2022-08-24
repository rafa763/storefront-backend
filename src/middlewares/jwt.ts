import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ModRequest } from "../types/jwt";

const SECRET = process.env.JWT_SECRET as string; 

// verify token middleware
function verifyToken(req: ModRequest, res: Response, next: Function) {
    const authHeader = req.headers["authorization"]
    if(!authHeader) {
        return res.status(401).json({ err: "No token provided"})
    }
    const token = authHeader.split(" ")[1] as string 
    try {
        const decoded: JwtPayload = jwt.verify(token, SECRET) as JwtPayload
        req.userId = decoded.userId
        req.role = decoded.role  
    } catch (err) {
        const e = err as Error
        return res.status(401).json({ err: e.message})
    }
    next()
}   

export default verifyToken