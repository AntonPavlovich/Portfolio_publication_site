import { getTimeInMilliseconds, Units } from './helper';

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRING_UNIT,
  REFRESH_TOKEN_EXPIRING_UNIT,
  ACCESS_TOKEN_EXPIRING_AMOUNT,
  REFRESH_TOKEN_EXPIRING_AMOUNT
} = process.env;

export interface TokenInterface {
  expiresIn: number
  secret: string
  cacheKey: string
}

export interface TokenPayload {
  id: number
  email: string
}

export const config = {
  accessToken: {
    secret: ACCESS_TOKEN_SECRET,
    expiresIn: getTimeInMilliseconds(
      <keyof typeof Units>ACCESS_TOKEN_EXPIRING_UNIT,
      parseInt(ACCESS_TOKEN_EXPIRING_AMOUNT, 10)),
    cacheKey: 'accessT'
  },
  refreshToken: {
    secret: REFRESH_TOKEN_SECRET,
    expiresIn: getTimeInMilliseconds(
      <keyof typeof Units>REFRESH_TOKEN_EXPIRING_UNIT,
      parseInt(REFRESH_TOKEN_EXPIRING_AMOUNT, 10)),
    cacheKey: 'refreshT'
  }
}