import  pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()
let db_name
const {
    DB_HOST,
    DB_NAME,
    TEST_DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    ENV
} = process.env

if (!DB_HOST || !DB_NAME || !DB_USERNAME || !DB_PASSWORD || !TEST_DB_NAME) {
    throw new Error('Missing db configuration')
} else if (!ENV) {
    throw new Error('Missing db Env')
}

if (ENV === 'dev') {
    db_name = DB_NAME
}else {
    db_name = TEST_DB_NAME
}

const db = new pg.Pool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: db_name
})

export default db;  