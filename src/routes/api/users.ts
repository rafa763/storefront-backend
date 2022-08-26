import express, { Request, Response } from 'express'
import { User, UserModel } from '../../models/users'
import  verifyToken  from '../../middlewares/jwt'
import { sign } from 'jsonwebtoken'
import { ModRequest } from '../../types/jwt'

const user = express.Router()
const usr = new UserModel()
const secret = process.env.JWT_SECRET as string

// index handler
user.get('/', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        if(!req.userId) {
            res.status(401).json({error: 'No token provided'})
        }
        const users = await usr.index()
        res.status(200).json(users)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// show handler
user.get('/:id', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (!id) {
            res.status(400).json({ error: 'id required' });
        }
        if(!req.userId) {
            res.status(401).json({ error: 'No token provided'})
        }
        const user = await usr.show(id)
        res.status(200).json(user)
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// create handler
user.post('/', async (req: Request, res: Response) => {
    try {
        const { username, first_name, last_name, password} = req.body
        if(!username || !first_name || !last_name || !password) {
            return res.status(400).json({ error: 'username, first_name, last_name and password are required'})
        }
        const newUsr: User = { username, first_name, last_name, password}
        const newUser = await usr.create(newUsr)
        const token = sign({
            userId: newUser.id, 
            username: newUser.username, 
            role: newUser.role
        }, secret)
        res.status(200).send(token)
    } catch (err) {
        const e = err as Error
        res.status(500).json(e.message)
    }
})

// update handler
user.put('/:id', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (!id) {
            res.status(400).json({ error: 'id required' });
        }
        if(!req.body) {
            res.status(400).json({ error: 'body is required'})
        }
        const { username, first_name, last_name, password, role } = req.body
        console.log(id, req.userId)
        console.log(req.body)
        if(id !== req.userId) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        const updatedUsr: User = { id, username, first_name, last_name, password, role }
        const user = await usr.update(updatedUsr)
        const token = sign({
            userId: user.id, 
            username: user.username, 
            role: user.role
        }, secret)
        res.status(200).json({updated_User:user, new_tkn: token})
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

// delete handler
user.delete('/:id', verifyToken, async (req: ModRequest, res: Response) => {
    try {
        const id = Number(req.params.id)
        if(!id) {
            return res.status(400).json({ error: 'id required'})
        }
        console.log(id, req.role)
        if(id === req.userId || req.role === 'admin') {
            const delUser = await usr.delete(id)
            res.status(200).json(delUser)
        } else {
            return res.status(401).json({ error: 'You are not authorized to delete this user'})
        }
    } catch (err) {
        const e = err as Error
        res.status(500).json({Error: e.message})
    }
})

export default user