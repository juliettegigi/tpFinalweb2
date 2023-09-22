import { insertarPartidaUsuarioEnDB } from "../db/partida-usuario.js";
import { insertarUsuario} from "../db/usuarios.js";
import{entroAlRanking, arregloDeUsuariosEnElRanking} from "../db/ranking.js"

export const userGetRanking = async(req, res) => {
   
    res.status(200).json({ ranking:  await arregloDeUsuariosEnElRanking() })
}

export const userPut = (req, res) => {
    const token = req.header('token');
    const {id,ej}=req.params;
    const {nombre, correo}=req.body;
    res.status(200).json({id, msg: "controlador de userGet" ,token,id,nombre,correo,ej})
}

export const userPost =async(req, res) => {
    
    const{usuario,pass}=req.body;
    const rta=await insertarUsuario({usuario,pass});
    switch( rta){
        case 1: return(res.status(200).json({ok:true,msg:"Usuario registrado."}));
        case 0: return(res.status(400).json({msg:"Usuario ingresado ya se encuentra registrado.",usuario}));
        case false: return(res.json({msg:"El usuario no ha podido ser registrado. "+ "DB no conectada."}))
        }
 
}
/* export const userDelete = (req, res) => {
    const {id}=req.params;
    res.json({id, msg: "controlador de userDelete" })
}   */


export const userPostRank=async(req,res)=>{
    const {id}=req.body;//{usuario,cantidad,tiempo}
   switch( await entroAlRanking(id,req.usuario)){
    case 0:
        return(res.json({ok:true,msg:"No has logrado entrar al ranking."}))
        
    case 1:return(res.json({ok:true,msg:"Felicitaciones!! has entrado al ranking de los 20 mejores jugadores."}))
           
    case 3:      
        return(res.status(500).json({msg:"Error sql."}))
    default: return res.json({msg:'no case'})       
                   

    }
}

export const userPostPartida= async(req,res)=>{
    const {tiempos,correctas,incorrectas,duracionTotal}=req.body; //{usuario,tiempos=[],correctas,incorrectas,duracionTotal}
    const r=await insertarPartidaUsuarioEnDB(req.usuario,tiempos,correctas,incorrectas,duracionTotal)
    return r?res.json({ok:true,id:r}):res.json({msg:"No se pudo registrar la partida."})
}