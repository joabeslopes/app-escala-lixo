import { Pessoas } from "./Pessoas";
import { MyDate } from "./MyDate";
import {myCreateElement} from "./default";


export class MyForm {

    constructor(){

        this.pessoas = new Pessoas("listaPessoas");
        this.mydate = new MyDate("dateSelector");

        document.getElementById("addPessoa").onclick = (evt) => this.pessoas.addInputPessoa();
    
        document.getElementById("enviar").onclick = (evt) => this.sendForm();
        
    }

    sendForm(){

        const listapessoas = this.pessoas.getListaPessoas();
    
        if (listapessoas.length == 0){
            alert("Preencher informação completa");
            return false;
        }
    
        const ISODate = this.mydate.getInputDate();
    
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
        .then( this.showEscala )
        .catch( () => { alert("erro na api"); } );
    
    };

    showEscala(response) {

        const escalaMes = document.getElementById("escalaMes");
    
        if (escalaMes){
            escalaMes.remove();
        }
    
        const escala = response["escala"];
        const diaOutput = myCreateElement("p", {class: "output"});
        let escalaString = "";
        const output = myCreateElement("div", {class: "output-container", id:"escalaMes"});
    
        escala.forEach( (semana) => {
            semana.forEach( (dia) => {
    
                escalaString += dia["dia"] + " - " + dia["nome"] + '\n';
    
            });
    
            escalaString += '\n';
        });
    
        diaOutput.innerText = escalaString;
        output.appendChild(diaOutput);
        
        document.getElementById("app").appendChild(output);
    
    };

}