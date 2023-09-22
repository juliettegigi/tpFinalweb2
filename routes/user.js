import express from 'express';
import { userPost,userPostRank, userGetRanking,userPostPartida} from '../controllers/user.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarBodyLoginPost, validarBodyId,validarBodyPartidaPost,validarToken } from '../schemas/schemas.js';

 const router=express.Router();

router.get('/',userGetRanking);
router.post('/',[validarBodyLoginPost,userPost]);
router.post('/ranking',[
    validarToken,
    validarJWT,
    validarBodyId,
    userPostRank])

router.post('/partida',[
    validarToken,
    validarJWT,
    validarBodyPartidaPost,
    userPostPartida])   
/* router.put('/:id/:ej',userPut);
router.delete('/:id',userDelete); */


export default router;


