/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

// In questa funzione sto dando ad ogni box della griglia un suo event listener
function setListeners(){
    for(const box of boxes){
        box.addEventListener('click',changeToCheck);
    }
}
// In questa funzione sto riportando la pagina all'aspetto iniziale, cancellando le scelte che erano state prese e riportando l'user all'inizio della pagina a fine funzione
function restart(){
    const risultato = document.getElementById("restart");
    
    for(let x in scelte){
        delete scelte[x];
    }
    ResetStile();// questa funzione stava dando problemi quando arrivava il momento di rimuovere le classi, ho provato tramite un try e catch a vedere quale errore dava
    // ma con scarsi risultati quindi ho optato per far ricaricare la pagina a fine funzione
    setListeners();
    risultato.classList.add("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
    location.reload();
}

// In questa funzione tramite la risposta trovata in checkboxes, assegno sia il titolo che il contenuto al risultato che verrà visualizzato a pié di pagina
function TrovaRisposta(risposta){
    const risultato = document.getElementById("restart");
    risultato.querySelector("h1").innerHTML =  RESULTS_MAP[risposta].title;
    risultato.querySelector("p").innerHTML = RESULTS_MAP[risposta].contents;
    risultato.classList.remove("hidden");
    console.log(risultato);
}

// Questa funzione verifica che siano state date tre risposte dai diversi questionID e se la verifica dà 
//esito positivo allora rimuove gli event listener per poi fornire la risposta reset dello stile della pagina rimuovendo opacità e colore di background
function checkBoxes(){
    if(Object.keys(scelte).length===3){
        for(const box of boxes){
            box.removeEventListener('click',changeToCheck);
        }
        let risposta;
        risposta = scelte.two === scelte.three ? scelte.two : scelte.one;
        TrovaRisposta(risposta);
        window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
    }
}

// Funzione che effettua un reset dello stile della pagina rimuovendo opacità e colore di background
function ResetStile(){
    for(const box of boxes){
        try{
        box.classList.remove("chosen-box");
        box.classList.remove("nchosen-box");
        }catch(err){mess.innerHTML="L'errore è: "+ err;}
        box.querySelector(".checkbox").src="images/unchecked.png";
    }
}


function CambiaStile(scelta,numscelta){
    for(const box of boxes){
        if(box.dataset.questionId===numscelta){
            for(const box of boxes){
                if(box.dataset.questionId===numscelta){
                box.querySelector(".checkbox").src="images/unchecked.png";
                box.classList.add("nchosenBox");
                }
            }
            scelta.querySelector(".checkbox").src="images/checked.png";
            scelta.classList.add("chosenBox");
            scelta.classList.remove("nchosenBox");
        }
    }
}


function changeToCheck(event){

    const scelta = event.currentTarget; // tramite current target prendo la box selezionata 
    const numscelta = scelta.dataset.questionId; // assegno a numscelta la questionID corrispondente alla box selezionata
    CambiaStile(scelta,numscelta);
    scelte[scelta.dataset.questionId]=scelta.dataset.choiceId;
    checkBoxes();
    console.log(scelte);
}

const scelte={};// array che contiene le scelte effettuate 
const boxes = document.querySelectorAll(".choice-grid div");
setListeners();
const reset = document.getElementById("restart");
reset.addEventListener('click',restart);
