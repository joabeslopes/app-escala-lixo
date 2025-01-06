import { addInputPessoa, exportPessoas } from "./pessoas";

const sendForm = function(event){

    let listapessoas = exportPessoas();

    if (listapessoas.length == 0){
        alert("Preencher informação completa");
        return false;
    }

    const requestObject = { listaPessoas: listapessoas };

    const request = JSON.stringify(requestObject);

    $.ajax( {
                type: "POST",
                url: '/api/gerarEscala',
                data: request,
                contentType: "application/json",
                success: function (response) { console.log(response); 
                                                $("#meuform")[0].reset();
                                            },
                error: function(){ alert("erro na api"); }
            }
        );
}

const onFormLoad = function(){

    addInputPessoa();

    $("#addPessoa").click( addInputPessoa );

    $("#enviar").click( sendForm );

}

export { onFormLoad };