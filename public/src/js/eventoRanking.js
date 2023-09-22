const eventoClick=()=>{
  let b=true;
  return (e)=>{
  if(b){
   for(let subfila of  document.getElementsByClassName(e.target.innerHTML) ) 
   subfila.style.display='table-row'
   b=!b;
  }
  else{
   for(let subfila of  document.getElementsByClassName(e.target.innerHTML) ) 
   subfila.style.display='none';
   b=!b; 
  }
  }
};     


for(let fila of document.getElementsByClassName("fila")){
    const eventoClickk=eventoClick(); 
    fila.addEventListener('click',eventoClickk)
  
}