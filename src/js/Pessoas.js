import {myCreateElement, myLoad} from "./default";

export class Pessoas {

    constructor(tagListaPessoas){

        this.tagListaPessoas = tagListaPessoas;
        this.addInputPessoa();

    }

    addInputPessoa() {

        const newInputPessoa = myCreateElement("input", {type: "text", name: "nome", class: "input", placeholder:"Nome"});
        const newPessoaSpan = myCreateElement("span", {class: "remove"});
        newPessoaSpan.innerText = "X";
        const newPessoaHomeOffice = myCreateElement("select", {class:"input", name:"homeOffice"});
        const newSeparator = myCreateElement("div", {class: "separator"});
    
        const newPessoaDiv = myCreateElement("div", {name: "pessoaDiv"});
    
        newPessoaSpan.onclick = this.removeInputPessoa;
    
        myLoad(newPessoaHomeOffice, '/html/dias-home.html');
    
        newPessoaDiv.appendChild(newInputPessoa);
        newPessoaDiv.appendChild(newPessoaSpan);
        newPessoaDiv.appendChild(newPessoaHomeOffice);
        newPessoaDiv.appendChild(newSeparator);
    
        document.getElementById(this.tagListaPessoas).appendChild(newPessoaDiv);
    
    };
    
    removeInputPessoa(evt){
        evt.srcElement.parentNode.remove();
    };

    getListaPessoas(){

        let listapessoas = [];
    
        const divListaPessoas = document.getElementById(this.tagListaPessoas).children;
    
        for (let i=0; i<divListaPessoas.length; i++){
    
            const child = divListaPessoas[i];
    
            let nome = child.querySelector('input[name="nome"]').value;
            nome = nome.trim();
            let homeOffice = child.querySelector('select[name="homeOffice"]').value;
    
            if (nome.length != 0 && homeOffice.length != 0){
                const pessoa = {
                    nome: nome,
                    homeOffice: homeOffice,
                };
    
                listapessoas.push(pessoa);
            } 
            else {
                return [];
            };
        }
    
        return listapessoas;
    
    };

}
