import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL ?? 'postgres://postgres:pg1016@127.0.0.1:5433/urldb'

const sql = postgres(connectionString)

export default sql