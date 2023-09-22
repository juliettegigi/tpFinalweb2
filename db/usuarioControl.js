import jwt from 'jsonwebtoken';
import { buscarUsuario} from './usuarios.js';





export class UsuarioControl { 




  static async generarJWT(usuario) {

    return new Promise((resolve, reject) => {
      const payload = { usuario };
      jwt.sign(payload,
        process.env.SECRETORPRIVATEKEY,
        //{expiresIn:'4h'},
        (err, token) => {
          if (err)
            reject('No se pudo generar el token.')
          else resolve(token)

        })
    })
  }



static pertenece=async(usuario)=>{
  return ( (await buscarUsuario({usuario,pass:2})) !==1)
}
  



}


