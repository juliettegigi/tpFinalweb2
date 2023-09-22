import crearConexion from './connection.js'


  /**
 * @param {Object} { usuario: usuarioNombre, pass: password }
 * @return {number} Retorna:
 *   - 1 si "El usuario no pertenece a la DB".
 *   - 3 si "usuario pertenece y pass incorrecta".
 *   - 2 user y pass correcta.
 */

export const buscarUsuario = async (usuario) => {
    const connection = await crearConexion();
    if(!connection)
       return false;
    try {
        let rows = await connection.query('SELECT * FROM user WHERE usuario = ? ', [usuario.usuario]);
        if(rows[0].length===0)return 1;
        else{
            rows = await connection.query('SELECT * FROM user WHERE usuario=? and pass = ? ', [usuario.usuario,usuario.pass]);
            if(rows[0].length===0)return 3;
            else return 2
        }


    } catch (error) {
      console.error('Error en la consulta:', error);
    }
    finally{
        await connection.end();
    }
  };
  

 
  
  

/**
 * @param {Object} { usuario: usuarioNombre, pass: password }
 * @return {number} Retorna:
 *   - 0 si "El usuario ya existe en la DB".
 *   - 1 si "El usuario se insertó".
 *   - 2 si "no se insertó porque no hubo filas afectadas".
 *   - 3 si "error SQL".
 */
export const insertarUsuario=async(usuario)=>{    
    const pool=await crearConexion();
    if(!pool) return false;

    try{
        let result=await pool.query('select * from user where usuario=?;',[usuario.usuario]);
        if(result[0].length!==0)
          return 0 // "El usuario ya existe en la DB"
        result= await pool.query('insert into user set usuario=?, pass=?;',[usuario.usuario,usuario.pass])
        
        if(result[0].affectedRows!==0)
          return 1;
        
          
        else return 2;
    }
    catch(error){
        console.log(error);
       return 3;
    }
    finally{
        await pool.end();
    }


}



