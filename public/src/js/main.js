const btnLogin = document.getElementById('login');
const btnSignUp = document.getElementById("signUp");
const pRtaSignUp=document.getElementById("respuestaSignUp")

var url ='http://localhost:8080'


const validar=(usuario,pass)=>{
    let error=false;
    if (pass.length<6){
        document.getElementById("errorPass").style.display="block"
        error=true;
    } 
    else{
        document.getElementById("errorPass").style.display="none"
        
    }
    if(usuario.trim().length<2){
            document.getElementById("errorUsuario").style.display="block"
            error=true;
        }
    else document.getElementById("errorUsuario").style.display="none"
    if(error)return;
}   

btnLogin.addEventListener('click', e => {
    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('pass').value;
   validar(usuario,pass);
   pRtaSignUp.innerHTML="";
    fetch(url+"/login", {
        method: 'post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({usuario,pass}),
    }).then(res => res.json())
        .then((rta)=>{
           if(rta.ok){ 
            if(rta.token){
              localStorage.setItem('token',rta.token)
            window.location="/juego"
            }}
            else{
                if(rta.msg==='El nombre de usuario no pertenece a nuestro registro.'){
                   const errorDiv=document.getElementById('errorUsuario');
                   errorDiv.innerHTML="👆 "+rta.msg;
                   errorDiv.style.display="block"
                }
                else if(rta.msg==='La password no coincide con el usuario.'){
                    const errorDiv=document.getElementById('errorPass')
                    errorDiv.innerHTML="👆 "+rta.msg;
                   errorDiv.style.display="block"
                }else{
                pRtaSignUp.classList.remove('col');
                pRtaSignUp.classList.add('col-12');
                pRtaSignUp.innerHTML=`<p >👆</p>
                <p class="text-success">${rta.msg}</p> `
            }
            }
            
        })
        .catch(err=>{
            console.log(err);
         })  
    


})


btnSignUp.addEventListener('click', e => {
        const usuario = document.getElementById('usuario').value;
        const pass = document.getElementById('pass').value;
        validar(usuario,pass); pRtaSignUp.innerHTML="";
        fetch(url+'/api/user', {
            method: 'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({usuario,pass}),
        }).then(res => res.json())
            .then((rta)=>{
                if(rta.ok){
                    pRtaSignUp.classList.remove('col-12');
                    pRtaSignUp.classList.add('col');
                    pRtaSignUp.innerHTML=`<p >👆</p>
                    <p class="text-success">Gracias por registrarte! Ahora puedes loguearte</p> `
                  
                }
                else{
                    pRtaSignUp.classList.remove('col');
                    pRtaSignUp.classList.add('col-12');
                pRtaSignUp.innerHTML=`<p >👆</p>
                <p class="text-success">${rta.msg}</p> `
                }
               
            })
    
         .catch(err=>{
            console.log(err);
         })  
    
    })

