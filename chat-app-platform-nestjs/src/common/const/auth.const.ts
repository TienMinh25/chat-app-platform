import * as dotenv from 'dotenv';
dotenv.config();

export const ACCESS_TOKEN_EXPIRED_TIME = process.env.ACCESS_TOKEN_EXPIRED;
export const REFRESH_TOKEN_EXPIRED_TIME = process.env.REFRESH_TOKEN_EXPIRED;
