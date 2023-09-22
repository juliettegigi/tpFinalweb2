import { Router } from "express";
import pug from 'pug';
import { peticionRanking } from "../public/src/js/main2.js";

import { getRanking } from "../public/src/variables/juego.js";

const router= Router();



router.get('/login',(req,res)=>{
    res.render("login",{})
})

router.get('/juego',async(req,res)=>{
    await peticionRanking();
    const arrRank=getRanking();
    res.render("juego",{ranking:pug.renderFile("views/ranking.pug",{arrRank})})

})
export default router;