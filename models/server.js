import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import path from 'path'; 
import express from'express';
import cors from 'cors';
import 'dotenv/config';
import rutasUsuario from '../routes/user.js';
import rutasLogin from '../routes/login.js';
import rutasQuestions from '../routes/questions.js';
import rutasView from '../routes/views.js'
import open, {openApp, apps} from 'open';
const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(currentDir, '..');



export default class Server{
    constructor(){
    
        this.app=express();
        this.port=process.env.PORT;
        this.middlewares();
        this.usuariosPath='/api/usuarios';
        this.routes();
        this.listen();
       }

    middlewares(){
        this.app.use(cors());
       this.app.use(express.json());
        this.app.use(express.static(path.join(rootDir, 'public')));
        this.app.set("view engine", "pug");
        this.app.set("views", "./views");
    }

    routes(){
        this.app.use(this.usuariosPath,rutasUsuario)
        this.app.use('/login',rutasLogin)
        this.app.use('/api/questions',rutasQuestions)
        this.app.use('/api/user',rutasUsuario)
        this.app.use('/',rutasView)
    }

   async listen(){
        this.app.listen(this.port,()=>{console.log("app en puerto "+this.port);})
        await open('http://localhost:8080/login');
    }
}