import {myCreateElement, myLoad} from "./default";

export function addInputPessoa(tagPessoas) {

    const newInputPessoa = myCreateElement("input", {type: "text", name: "nome", class: "input", placeholder:"Nome"});
    const newPessoaSpan = myCreateElement("span", {class: "remove"});
    newPessoaSpan.innerText = "X";
    const newPessoaHomeOffice = myCreateElement("select", {class:"input", name:"homeOffice"});
    const newSeparator = myCreateElement("div", {class: "separator"});

    const newPessoaDiv = myCreateElement("div", {name: "pessoaDiv"});

    newPessoaSpan.onclick = removeInputPessoa;

    myLoad(newPessoaHomeOffice, '/html/dias-home.html');

    newPessoaDiv.appendChild(newInputPessoa);
    newPessoaDiv.appendChild(newPessoaSpan);
    newPessoaDiv.appendChild(newPessoaHomeOffice);
    newPessoaDiv.appendChild(newSeparator);

    document.getElementById(tagPessoas).appendChild(newPessoaDiv);

};

function removeInputPessoa(evt){
    evt.srcElement.parentNode.remove();
};

export function getListaPessoas(tagListaPessoas){

    let listapessoas = [];

    const divListaPessoas = document.getElementById(tagListaPessoas).children;

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