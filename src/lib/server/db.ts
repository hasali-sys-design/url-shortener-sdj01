import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL ?? 'postgres://postgres:pg1016@127.0.0.1:5433/urldb'
const sql = postgres(connectionString)
// const sql = postgres({
//     host: process.env.DB_HOST,
//     port: 5433,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD
// })

export default sql