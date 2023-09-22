import crearConexion from './connection.js'


  /**
 * @param {Object} { usuario: usuarioNombre, pass: password }
 * @return {number} Retorna:
 * false si no se inserta
 * el id de la  inserción 
 */

export const insertarPartidaUsuarioEnDB = async (usuario,tiempos=[],correctas,incorrectas,duracionTotal) => {
    const connection=await crearConexion();
    if(!connection) return false;
    try {
        const result= await connection.query('insert into partida_usuario set usuario=?, p1=?,p2=?,p3=?,p4=?,p5=?,p6=?,p7=?,p8=?,p9=?,p10=?,correctas=?,incorrectas=?,duracionTotal=?;',[usuario,String(tiempos[0]),String(tiempos[1]),(tiempos[2]),tiempos[3],tiempos[4],tiempos[5],tiempos[6],tiempos[7],tiempos[8],tiempos[9],correctas,incorrectas,duracionTotal]);
        if(result.affectedRows===0)
          return false;
        
        else return result[0].insertId;


    } catch (error) {
      console.error('Error en la consulta:', error);
      return false;
    }
    finally{
        await connection.end();
    }
  };
  

 
  
  



