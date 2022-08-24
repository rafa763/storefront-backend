import supertest from "supertest";
import app from '../../src/server'
import { JwtPayload, verify } from 'jsonwebtoken';
import { Product } from '../../src/models/products'
import { User } from "../../src/models/users";

const request = supertest(app)

describe('Testing endpoint: /products', () => {

    let token: string
    let usr: number
    let prd: number
    let cat: string
    let prodd: number
    const SECRET = process.env.JWT_SECRET

    const product: Product = {
        name: 'prod1',
        price: 20,
        category: 'cat1',
        quantity: 3
    }

    const u: User = {
        username: 'xxxraafat_11',
        first_name: 'james',
        last_name: 'adam',
        password: '1234'
    }

    const AlteredToken: string = 'eyJhbGciOiJIUzI1NiIsanR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InJhZmEyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEzMjk0NDJ9.5psUv625Mz00Kijrze1Tj2iRyVmCUIhxMUJLaOrjkAU'
    beforeAll(async () => {
        await request.post('/api/users')
            .send(u)
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                token = res.text
                const decodedJWT = verify(token as string, SECRET as string) as JwtPayload
                usr = decodedJWT.userId
                // console.log(`${usr}`)
            })
    })


    it('Tests the create endpoint with valid token', async () => {
        await request
            .post('/api/products')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: u.id,
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity
            })
            .expect(200)
            .then((res) => {
                // console.log(`${JSON.stringify(res)}`)
                prd = res.body.id as number
                cat = res.body.category
                prodd = res.body.id
                // console.log(`${JSON.stringify(prd)}`)
            })
    })

    it('Tests the create endpoint with invalid token', async () => {
        await request
            .post('/api/products')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${AlteredToken}`)
            .send({
                id: u.id,
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity
            })
            .expect(401)
    })

    it('Tests the index endpoint', async () => {

        await request
            .get('/api/products')
            .set('Accept', 'application/json')
            .expect(200)
    })


    it('Tests the show endpoint ', async () => {
        await request
            .get(`/api/products/${prd}`)
            .set('Accept', 'application/json')
            .expect(200);
    })

    it('Tests the showByCategory endpoint ', async () => {
        await request
        .get(`/api/products/category/${cat}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })


    it('Tests the update endpoint', async () => {
        await request
            .put(`/api/products`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity
            })
            .expect(200)
    })

    it('Tests the delete endpoint', async () => {
        await request
            .delete(`/api/products`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: prodd
            })
            .expect(200)
    })

})