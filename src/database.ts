import  pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const {
    DB_HOST,
    DB_NAME,
    TEST_DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    ENV
} = process.env

if (!DB_HOST || !DB_NAME || !DB_USERNAME || !DB_PASSWORD) {
    throw new Error('Missing db configuration')
} else if (!ENV) {
    throw new Error('Missing db Env')
}

const db = new pg.Pool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: ENV === 'dev'? DB_NAME: TEST_DB_NAME
})

export default db;  