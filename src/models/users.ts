import db from '../database'
import bcrypt from 'bcrypt'

const {
    SALT_ROUNDS,
    PEPPER
} = process.env

export type User = {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    role?: string;
}

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch(err) {
            throw new Error(`Couldn't get users. Error ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM users WHERE id=$1'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't get user. Error ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            
            const conn = await db.connect()
            const hash = bcrypt.hashSync(u.password+PEPPER, Number(SALT_ROUNDS))
            const sql = 'INSERT INTO users (username, first_name, last_name, hash) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [u.username, u.first_name, u.last_name, hash])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't create user. Error ${err}`);
        }
    }

    async update(u: User): Promise<User> {
        try {
            let queryParams = '';
            let passedCount = 1;
            let passedData = [];
            passedData.push(u.id);
            if(u.username && u.username !== undefined){
                passedCount++; 
                queryParams += `username=$${passedCount},`; 
                passedData.push(u.username)
            }
            if(u.first_name && u.first_name !== undefined){
                passedCount++; 
                queryParams += `first_name=$${passedCount},`; 
                passedData.push(u.first_name)
            }
            if(u.last_name && u.last_name !== undefined){
                passedCount++; 
                queryParams += `last_name=$${passedCount},`; 
                passedData.push(u.last_name)
            }
            if(u.password && u.password !== undefined){
                passedCount++; 
                queryParams += `hash=$${passedCount},`; 
                passedData.push(bcrypt.hashSync(u.password+PEPPER, Number(SALT_ROUNDS)))
            }
            if(u.role && u.role !== undefined){
                passedCount++;
                queryParams += `role=$${passedCount},`;
                passedData.push(u.role)
            }
            const conn = await db.connect()
            const params = String(queryParams).slice(0, -1)
            const sql = `UPDATE users SET ${params} WHERE id=$1 RETURNING *`
            console.log(passedCount, passedData, sql)
            const updatedUser = await conn.query(sql, passedData)
            return updatedUser.rows[0]
        } catch(err) {
            throw new Error(`Couldn't update user. Error ${err}`);
        }
    }

    async updateRole(id: number, role: string, master_id: number): Promise<User> {
        try {
            const conn = await db.connect()
            const master_sql = `SELECT role FROM users WHERE id=${master_id} RETURNING role`
            const master_result = await conn.query(master_sql) as unknown as String
            if(master_result === 'admin'){
                const sql = 'UPDATE users SET role=$1 WHERE id=$2 RETURNING *'
                const result = await conn.query(sql, [role, id])
                conn.release()
                return result.rows[0]
            }else{
                throw new Error(`You are not an admin.`)
            }   
        } catch(err) {
            throw new Error(`Couldn't update user role. Error ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await db.connect()
            const sql = 'DELETE FROM users WHERE id=$1 RETURNING *'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't delete user. Error ${err}`);
        }
    }
}