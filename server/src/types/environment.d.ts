export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESS_SECRET: string;
      NODE_ENV: string;
      SESS_NAME:string;
      PORT: Number;
      MONGODB_URL: string;
      MONGODB_PASSWORD: string;
      JWT_ACCESS_KEY: string;
    }
  }
}