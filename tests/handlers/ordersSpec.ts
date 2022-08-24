import supertest from "supertest";
import app from '../../src/server'
import { JwtPayload, verify } from 'jsonwebtoken';
import { Order, Product, Cart } from '../../src/models/orders'
import { Product as P } from "../../src/models/products";
import { User } from "../../src/models/users";

const request = supertest(app)

describe('Testing Endpoint: /orders', () => {

    let token: string
    let usr: number
    let prd: number
    let ordId: number
    const SECRET = process.env.JWT_SECRET as string
    const AlteredToken: string = 'eyJhbGciOiJIUzI1NiIsanR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ1c2VybmFtZSI6InJhZmEyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEzMjk0NDJ9.5psUv625Mz00Kijrze1Tj2iRyVmCUIhxMUJLaOrjkAU'

    const u: User = {
        username: 'xxxrdaafat_11',
        first_name: 'billy',
        last_name: 'willy',
        password: '89768',
        role: 'user'
    }

    const p: P = {
        name: 'prod 1',
        price: 200,
        category: 'cars',
        quantity: 2
    }

    beforeAll(async () => {
        // create user
        await request
        .post('/api/users')
        .send(u)
        .set('Accept', 'application/json')
        .expect(200)
        .then((res) => {
            token = res.text
            const decodedJWT = verify(token as string, SECRET as string) as JwtPayload
            usr = decodedJWT.userId
        })

        // create product
        await request
        .post('/api/products')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(p)
        .expect(200)
        .then((res) => {
            prd = res.body.id
        })
    })
    
    it('Tests the create product with valid token', async () => {
        await request
            .post('/api/orders')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id: usr,
                status: 'active'
            })
            .expect(200)
            .then((res) => {
                ordId = res.body.id
            })

    })

    it('Tests the create product with invalid token', async () => {
        await request
            .post('/api/orders')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${AlteredToken}`)
            .send({
                user_id: usr,
                status: 'active'
            })
            .expect(401)

    })

    it('Tests the add product to order with valid order & token', async () => {
        await request
        .post(`/api/orders/${ordId}/products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            product_id: prd
        })
        .expect(200)
    })

    it('Tests the add product to order with altered token', async () => {
        await request
        .post(`/api/orders/${ordId}/products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${AlteredToken}`)
        .send({
            product_id: prd
        })
        .expect(401)
    })

    it('Tests the show order with valid token', async () => {
        await request
        .get(`/api/orders/${ordId}/products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })

    it('Tests the show order with invalid token', async () => {
        await request
        .get(`/api/orders/${ordId}/products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${AlteredToken}`)
        .expect(401)
    })

    it('Tests the show active order with valid token', async () => {
        await request
        .get(`/api/orders/${ordId}/active_products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })

    it('Tests the show active order with invalid token', async () => {
        await request
        .get(`/api/orders/${ordId}/active_products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${AlteredToken}`)
        .expect(401)
    })

    it('Tests the show active order with valid token', async () => {
        await request
        .get(`/api/orders/${ordId}/active_products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })

    it('Tests the show active order with invalid token', async () => {
        await request
        .get(`/api/orders/${ordId}/active_products`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${AlteredToken}`)
        .expect(401)
    })

    it('Tests the mark complete order with valid token', async () => {
        await request
        .post(`/api/orders/${ordId}/complete`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            order_id: ordId,
            user_id: usr
        })
        .expect(200)
    })

    it('Tests the mark complete order with invalid token', async () => {
        await request
        .post(`/api/orders/${ordId}/complete`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${AlteredToken}`)
        .send({
            order_id: ordId,
            user_id: usr
        })
        .expect(401)
    })
})