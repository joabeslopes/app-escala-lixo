import { addInputPessoa, getListaPessoas } from "./pessoas";
import { getInputDate, addInputDate } from "./date";
import {myCreateElement} from "./default";

function sendForm(event){

    const listapessoas = getListaPessoas("listaPessoas");

    if (listapessoas.length == 0){
        alert("Preencher informação completa");
        return false;
    }

    const ISODate = getInputDate("#dateSelector");

    const requestObject = { listaPessoas: listapessoas,
                            ISODate: ISODate
                        };

    const request = JSON.stringify(requestObject);

    fetch("/api/gerarEscala", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: request,
        }
    ).then( response => response.json() )
    .then( showEscala )
    .catch( function(){ alert("erro na api"); } );

};


function showEscala(response) {

    const escalaMes = document.getElementById("escalaMes");

    if (escalaMes){
        escalaMes.remove();
    }

    const escala = response["escala"];
    const diaOutput = myCreateElement("p", {class: "output"});
    const br = myCreateElement("br");
    let escalaString = "";
    const output = myCreateElement("div", {class: "output-container", id:"escalaMes"});

    escala.forEach( (semana) => {
        semana.forEach( (dia) => {

            escalaString = dia["dia"] + " - " + dia["nome"];
            const diaAtual = diaOutput.cloneNode(true);
            diaAtual.innerText = escalaString;
            output.appendChild(diaAtual);

        });

        output.appendChild(br.cloneNode(true));
    });
    
    document.getElementById("app").appendChild(output);

};


export default function onFormLoad(){

    addInputPessoa("listaPessoas");
    addInputDate("dateSelector");

    document.getElementById("addPessoa").onclick = (evt) => {addInputPessoa("listaPessoas") };

    document.getElementById("enviar").onclick = sendForm;

};