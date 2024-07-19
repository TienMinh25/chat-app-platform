import * as dotenv from 'dotenv';
dotenv.config();

export const VERIFY_REGISTER_TIME: number = +process.env.VERIFY_REGISTER_TIME;
export const RESET_PASSWORD_TIME: number = +process.env.RESET_PASSWORD_TIME;
