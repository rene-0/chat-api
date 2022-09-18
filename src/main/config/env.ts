export default {
  dbName: process.env.DB_NAME || 'chat',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  port: process.env.PORT || 5050
}
