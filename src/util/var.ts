import 'dotenv/config';

export const ACCESS_TOKEN_SECRET: string =
    process.env.ACCESS_TOKEN_SECRET || "";
export const REFRESH_TOKEN_SECRET: string =
    process.env.REFRESH_TOKEN_SECRET || "";
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
export const PORT = process.env.PORT || 3000;

