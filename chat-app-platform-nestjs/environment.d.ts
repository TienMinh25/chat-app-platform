declare namespace NodeJS {
  export interface ProcessEnv {
    MYSQL_DB_HOST?: string;
    MYSQL_USER?: string;
    MYSQL_PASSWORD?: string;
    MYSQL_DATABASE?: string;
    MYSQL_ROOT_PASSWORD?: string;
    MYSQL_DB_PORT?: number;
  }
}
