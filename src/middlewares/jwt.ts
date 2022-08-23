import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string; 

// https://www.npmjs.com/package/jsonwebtoken

function verifyToken(req: Request, res: Response, next: Function) {
    const userId = req.body.id
    const authHeader = req.headers["authorization"]
    const token = (authHeader && authHeader.split(" ")[1]) as string
    jwt.verify(token , SECRET, (_err, user: jwt.JwtPayload) => {
        console.log(decoded)
        if(userId && decoded.user.userId != userId){
            return res.status(403).json({message: "Unauthorized"})  
        }
    })
    next()
}

function signToken(req:Request, res:Response, next:Function) {
    const username = req.body.username
    const userId = req.body.id
    const user = {
        userId: userId,
        name: username
    }
    const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
    next()
}   