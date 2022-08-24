import supertest from "supertest";
import app from '../../src/server'
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../../src/models/users'

const request = supertest(app)

describe('Testing Endpoint: /users', () => {

    let token: string
    let usr: number
    const SECRET = process.env.JWT_SECRET as string
    const AlteredToken: string = 'eyJhbGciOiJIUzI1NiIsanR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InJhZmEyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEzMjk0NDJ9.5psUv625Mz00Kijrze1Tj2iRyVmCUIhxMUJLaOrjkAU'

    const user: User = {
        username: 'xxxraafat_1',
        first_name: 'wilson',
        last_name: 'dickson',
        password: '437287'
    }

    it('Tests the create endpoint', async () => {
        await request
            .post('/api/users')
            .set('Accept', 'application/json')
            .send(user)
            .expect(200)
            .then((res) => {
                token = res.text
                const decodedJWT = verify(token as string, SECRET as string) as JwtPayload
                usr = decodedJWT.userId
            })


            // console.log(`${usr}`)
    })

    it('Tests the index endpoint with a valid token', async () => {
        await request
            .get(`/api/users`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    })

    it('Tests the index endpoint with a invalid token', async () => {
        await request
            .get(`/api/users`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${AlteredToken}`)
            .expect(401);
    })

    it('Tests the show endpoint with a valid token', async () => {
        await request
            .get(`/api/users/${usr}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    })

    it('Tests the show endpoint with a invalid token', async () => {
        await request
            .get(`/api/users/${usr}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${AlteredToken}`)
            .expect(401);
    })

    it('Tests the update endpoint with different user id', async () => {
        await request
        .put('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            id: 69420,
            first_name: 'mohamed',
            last_name: 'raafat',
            password: '4321'
        }).expect(401)
    })

    it('Tests the update endpoint with same user id', async () => {
        await request
        .put('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            id: usr,
            first_name: 'mohamed',
            last_name: 'raafat',
            password: '4321'
        }).expect(200)
    })

    it('Tests the delete endpoint', async () => {
        await request
        .delete('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: usr })
        .expect(200)
    })
})