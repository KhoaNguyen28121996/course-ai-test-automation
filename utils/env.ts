import * as dotenv from 'dotenv';

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://crm.anhtester.com',
  loginPath: process.env.LOGIN_PATH ?? '/authentication',
  validEmail: required('VALID_EMAIL'),
  validPassword: required('VALID_PASSWORD'),
  invalidEmail: process.env.INVALID_EMAIL ?? 'wrong@example.com',
  invalidPassword: process.env.INVALID_PASSWORD ?? 'wrongpassword',
};
