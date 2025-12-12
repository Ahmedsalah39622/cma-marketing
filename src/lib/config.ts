export const config = {
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    defaultTo: process.env.DEFAULT_EMAIL_TO,
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
    secretKey: process.env.API_SECRET_KEY,
  },
  database: {
    url: process.env.DATABASE_URL,
  }
};