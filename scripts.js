const qtCont=document.getElementById('qt-cont')
const qtTextt=document.getElementById('qt')
const aut=document.getElementById('Aut')
const twBtn=document.getElementById('twitter')
const newQuBtn=document.getElementById('new-quote')
const loader=document.getElementById('loader')





const compose=(f,g)=>async (...lnum)=>f(await g(...lnum));

function GoNewQuote(...fns){
 return fns.reduce(compose)
}

let apiQuote = [];

function loading(){ 
 loader.hidden=false;
 qtCont.hidden=true;
}

function complete(){

    qtCont.hidden=false;
    loader.hidden=true;
}


const LessThan=function(lnum){
    return (qtNum)=>{
        if(qtNum>lnum){
             qtTextt.classList.add('long-qtt');
         }else{
            qtTextt.classList.remove('long-qtt');
         }
      }
}

const LessThan50=LessThan(50);

function newQuote(data){
   
    let qtObj = Object.assign([],data);
    let Quote = qtObj[Math.floor(Math.random() * qtObj.length)] 
     aut.textContent=Quote.author||'UnKnow';
     qtTextt.textContent=Quote.text;
     return Quote.text.length;
}

async function getQuotr(){
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {        
     const Response = await fetch(apiUrl)
     apiQuote = await Response.json();  
    } catch (erro) {
        
    }
}

function sentData(){
 return apiQuote;
}


function tweetQuote(){
    const url=`https://twitter.com/intent/tweet?text=${qtTextt.textContent} - ${aut.textContent}`;
    window.open(url,'_blank');
}



function setBtnClick(){
  newQuBtn.addEventListener('click',GoNewQuote(complete,LessThan50,newQuote,sentData,loading))
  twBtn.addEventListener('click',tweetQuote)
}


GoNewQuote(setBtnClick,complete,LessThan50,newQuote,sentData,getQuotr,loading)(0)



async function getQuotr0(){
    loading()
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {      
     const Response = await fetch(apiUrl)
     apiQuote = await Response.json();
     newQuote()
    } catch (erro) {
        
    }
}

function newQuote0(){
 
    let Quote = apiQuote[Math.floor(Math.random() * apiQuote.length)]
    
     aut.textContent=Quote.author||'UnKnow';
    
    if(Quote.text.length>50){
        qtTextt.classList.add('long-qtt');
    }else{
        qtTextt.classList.remove('long-qtt');
    }
     qtTextt.textContent=Quote.text;
   


}