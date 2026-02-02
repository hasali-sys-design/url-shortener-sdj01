import postgres from 'postgres'
const sql = postgres('postgres://username:password@host:port/database',{
    host: '127.0.0.1' ,
    port: 5433,
    database: 'urldb',
    username: 'postgres',
    password: 'pg1016'


})

export default sql