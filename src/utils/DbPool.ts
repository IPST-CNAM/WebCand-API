import mariadb from "mariadb";

/* this is a singleton that holds the database connector */
class DbPool {

  static pool : mariadb.Pool;
  
  static getPool() {
    if (DbPool.pool == null) {
      DbPool.pool = mariadb.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5, // Adjust as per your requirements
      });
    }

    return DbPool.pool;
  }
    
    
  
}

export default DbPool;
