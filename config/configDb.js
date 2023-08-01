require('dotenv').config()

// SET NODE_ENV=development
// for the env 
// const env = process.env.NODE_ENV; // 'dev' or 'test'

const config = {
    app: {
        port: process.env.PORT || 4040,
        secret_key: process.env.SECRET_KEY || 'crash',
        expireIn: '5h',
        DB_Name: process.env.DB_NAME || '',
        DB_Username: process.env.DB_USERNAME || '',
        DB_Password: process.env.DB_PASSWORD || '',
        DB_Host: process.env.DB_HOST || '',
    }
}

module.exports = config