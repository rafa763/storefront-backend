import db from '../database'

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
    quantity: number;
}

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Couldn't show products. Error ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM products WHERE id=$1'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Couldn't show product. Error ${err}`);
        }
    }

    async showByCategory(category: string): Promise<Product[]> {

        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM products WHERE category=$1'
            const result = await conn.query(sql, [category])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Couldn't show products. Error ${err}`)
        }
    } 

    async create(p: Product): Promise<Product> {
        try {
            const conn = await db.connect()
            const sql = 'INSERT INTO products (name, price, category, quantity) Values ($1, $2, $3, $4) Returning *'
            const result = await conn.query(sql, [p.name, p.price, p.category, p.quantity])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Couldn't Create product. Error ${err}`);
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            let queryParams = '';
            let passedCount = 1;
            let passedData = [];
            if(p.name && p.name !== undefined) {
                passedCount++;
                queryParams += `name=${passedCount},`;
                passedData.push(p.name);
            }
            if(p.price && p.price !== undefined) {
                passedCount++;
                queryParams += `price=${passedCount},`;
                passedData.push(p.price);
            }
            if(p.category && p.category !== undefined) {
                passedCount++;
                queryParams += `category=${passedCount},`;
                passedData.push(p.category);
            }
            if(p.quantity && p.quantity !== undefined) {
                passedCount++;
                queryParams += `quantity=${passedCount},`;
                passedData.push(p.quantity);
            }
            const conn = await db.connect()
            const params = String(queryParams).slice(0, -1)
            const sql = `UPDATE products SET ${params} WHERE id=$1 RETURNING *`
            const updatedProduct = await conn.query(sql, passedData)
            return updatedProduct.rows[0]
        } catch (err) {
            throw new Error(`Couldn't update product. Error ${err}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const conn = await db.connect()
            const sql = 'DELETE FROM products WHERE id=$1 RETURNING *'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Couldn't delete product with id ${id}. Error ${err}`);
        }
    }
}