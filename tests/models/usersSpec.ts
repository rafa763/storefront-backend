import { User, UserModel } from '../../src/models/users';
import db from '../../src/database'

const newUser = new UserModel();
const user: User = {
    username: 'xxxraafat',
    first_name: 'tfname',
    last_name: 'tlname',
    password: 'tpassword',
    role: 'user'
}

let usr: User;

describe('Testing the users model', () => {
    
    it('Should have a create method', () => {
        expect(newUser.create).toBeDefined();
    })
    
    it('Test the create method', async () => {
        usr = await newUser.create(user);
        expect({ username: usr.username, first_name: usr.first_name, last_name: usr.last_name, role: user.role }).toEqual({ 
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
        })
    })

    it('Should have an index method', () => {
        expect(newUser.index).toBeDefined()
    })

    it('Index method should have the new user', async () => {
        const users = await newUser.index();
        expect(users).toContain(usr)
    })
    
    it('Should have show method', () => {
        expect(newUser.show).toBeDefined()
    })

    it('Testing the show method', async () => {
        const foundUsr = await newUser.show(Number(usr.id));
        expect(foundUsr).toEqual(usr)
    })

    it('Should have an update method', () => {
        expect(newUser.update).toBeDefined()
    })

    it('Should update a user', async () => {
        const updatedUsr = await newUser.update({
            id: usr.id ,
            username: 'xxxraafat',
            first_name: 'mohamed',
            last_name: 'raafat',
            password: '123',
            role: 'admin'

        })
        expect({ id: usr.id, username: 'xxxraafat', first_name: 'mohamed', last_name: 'raafat', role: 'admin'}).toEqual({
            id: updatedUsr.id,
            username: updatedUsr.username,
            first_name: updatedUsr.first_name,
            last_name: updatedUsr.last_name,
            role: updatedUsr.role as string
        })
    })

    it('Should have a delete method', () => {
        expect(newUser.delete).toBeDefined()
    })

    it('Should delete a user', async () => {
        const deletedLead = await newUser.delete(usr.id as number)
        expect(deletedLead.id).toEqual(usr.id)
    })


    // Reset the users table
    afterAll(async () => {
        const connection = await db.connect()
        const sql = 
        'TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;'
        await connection.query(sql)
        connection.release()
    })
    
})
