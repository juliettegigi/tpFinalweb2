import mysql from'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const crearConexion= async()=>{
     try {   const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'web2tp',
        password:'',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      });

      const connection =  await pool.getConnection();
connection.release();
return pool
    }
      catch(err){
        return false;
      }
}

export default crearConexion;


   
