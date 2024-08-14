declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_DB_HOST?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;
    POSTGRES_DB?: string;
    POSTGRES_DB_PORT?: number;
    PORT?: number;
    CLIENT_BASE_URL?: string;
  }
}
