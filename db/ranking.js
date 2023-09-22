import crearConexion from './connection.js'

 /**
   * @return{int} retorna 0 si "el user no ingresa al rank"
   * 1 el user ingresa al rank
   * 2 por algún error sql
   */
export const entroAlRanking=async(id)=>{    
    const pool=await crearConexion();
    if(!pool) return false;
    let result;
    try{
        
        result=await pool.query(`SELECT * FROM (SELECT p1.id, p1.usuario, p1.correctas, p1.duracionTotal,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10
                                                FROM partida_usuario p1
                                                WHERE NOT EXISTS (
                                                    SELECT 1
                                                    FROM partida_usuario p2
                                                    WHERE p2.usuario = p1.usuario
                                                    AND (p2.correctas > p1.correctas OR (p2.correctas = p1.correctas AND p2.duracionTotal < p1.duracionTotal))
                                                )
                                                ORDER BY p1.correctas DESC, p1.duracionTotal)AS ranking
                                            WHERE id=?`,[id]);
        return (result[0].length===0)?0:1; 
            
    }
    catch(error){
        console.log(error);
       return 2;
    }
    finally{
        await pool.end();
    }


}


export const arregloDeUsuariosEnElRanking=async()=>{
    const pool=await crearConexion();
    if(!pool) return false;

    try{
        let result=await pool.query(`SELECT p1.id, p1.usuario, p1.correctas, p1.duracionTotal,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,(p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + p10) / 10 AS promedio
                                     FROM partida_usuario p1
                                     WHERE NOT EXISTS (
                                         SELECT 1
                                         FROM partida_usuario p2
                                         WHERE p2.usuario = p1.usuario
                                         AND (p2.correctas > p1.correctas OR (p2.correctas = p1.correctas AND p2.duracionTotal < p1.duracionTotal))
                                     )
                                     ORDER BY p1.correctas DESC, p1.duracionTotal
                                     LIMIT 20;`);
        return result[0];
    }
    catch(error){
        console.log(error);
       return 3;
    }
    finally{
        await pool.end();
    }
}


