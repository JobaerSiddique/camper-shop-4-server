import * as dotenv from 'dotenv'
dotenv.config()


export default{
    PORT: process.env.port,
    database_url: process.env.database_Url,
    secret: process.env.SECRET,
    ACCESS_TOKEN_SECRET: process.env.access_token,
    REFRESH_TOKEN_SECRET: process.env.refreshToken,
    SALT : process.env.salt,
    NODE_ENV: process.env.NODE_ENV

}