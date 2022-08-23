import db from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export type Product = {
    id?: number;
    order_id: number;
    product_id: number;
}

export type Cart = {
    name: string, 
    price: number, 
    category: string, 
    quantity: number
}

export class OrdersModel {
    async createOrder(o: Order): Promise<Order> {
        try {
            const conn = await db.connect()
            const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`
            const result = await conn.query(sql, [o.user_id, o.status])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldn't create order. Error ${error}`);
        }
    }

    async addProductToOrder(order_id: number, product_id: number): Promise<Product> {
        try {
            const conn = await db.connect()
            const sql = 'INSERT INTO order_products (order_id, product_id) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [order_id, product_id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldn't add product to order. Error ${error}`);
        }
    }

    //show active order
    async showActive(user_id: number): Promise<Order>{
        try {
            const conn = await db.connect()
            const sql = `SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'`
            const result = await conn.query(sql, [user_id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldn't show active orders. Error ${error}`);
        }
    }


    //mark order complete
    async markComplete(order_id: number, user_id: number): Promise<Order>{
        try {
            const conn = await db.connect()
            const sql = `UPDATE orders SET status = 'completed' WHERE user_id = ($1) AND id = ($2) RETURNING *`
            const result = await conn.query(sql, [user_id, order_id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Couldn't mark order as complete. Error ${error}`);
        }
    }

    async showCart(user_id: number): Promise<Cart[]> {
        try {
            const conn = await db.connect()
            const sql = 
            'SELECT name, price, category, quantity From products INNER JOIN order_products ON products.id = order_products.product_id Join orders ON orders.id = order_products.order_id WHERE orders.user_id = ($1)'
            const result = await conn.query(sql, [user_id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Couldn't show order. Error ${error}`);
        }
    }
}