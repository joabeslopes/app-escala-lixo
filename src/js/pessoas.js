const addInputPessoa = function(evt){

    const newInputPessoa = $("<input>", {type: "text", name: "nome", class: "input", placeholder:"Nome"});
    const newPessoaSpan = $("<span>", {class: "remove"}).text("X");
    const newPessoaHomeOffice = $("<select>", {class:"input", name:"homeOffice"});
    const newSeparator = $("<div>", {class: "separator"});

    const newPessoaDiv = $("<div>", {name: "pessoaDiv"});

    $(newPessoaSpan).click( removeInputPessoa );

    $(newPessoaHomeOffice).load('/html/dias-home.html');

    $(newPessoaDiv).append(newInputPessoa);
    $(newPessoaDiv).append(newPessoaSpan);
    $(newPessoaDiv).append(newSeparator.clone());
    $(newPessoaDiv).append(newPessoaHomeOffice);
    $(newPessoaDiv).append(newSeparator.clone());

    $(evt.data.tagListaPessoas).append(newPessoaDiv);

};

const removeInputPessoa = function(evt){
    $(this).parent().remove();
};

const getListaPessoas = function (tagListaPessoas){

    let listapessoas = [];
    
    $(tagListaPessoas).children().each( function(){

        let nome = $(this).children('input[name="nome"]').val();
        nome = nome.trim();
        let homeOffice = $(this).children('select[name="homeOffice"]').val();

        if (nome.length != 0 && homeOffice.length != 0){
            const pessoa = {
                nome: nome,
                homeOffice: homeOffice,
            };

            listapessoas.push(pessoa);
        } 
        else {
            listapessoas = [];
            return false;
        };

    });

    return listapessoas;

};

export { addInputPessoa, getListaPessoas };