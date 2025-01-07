import { addInputPessoa, getListaPessoas } from "./pessoas";
import { getInputDate, addInputDate } from "./date";


const sendForm = function(event){

    const listapessoas = getListaPessoas("#listaPessoas");

    if (listapessoas.length == 0){
        alert("Preencher informação completa");
        return false;
    }

    const ISODate = getInputDate("#dateSelector");

    const requestObject = { listaPessoas: listapessoas,
                            ISODate: ISODate
                        };

    const request = JSON.stringify(requestObject);

    $.ajax( {
                type: "POST",
                url: '/api/gerarEscala',
                data: request,
                contentType: "application/json",
                success: showEscala,
                error: function(){ alert("erro na api"); }
            }
        );
};


const showEscala = function(response){

    $("#escalaMes").remove();

    const escala = response["escala"];
    const diaOutput = $("<p>", {class: "output"});
    const br = $("<br>");
    let escalaString = "";
    const output = $("<div>", {class: "output-container", id:"escalaMes"});

    escala.forEach( (semana) => {
        semana.forEach( (dia) => {

            escalaString = dia["dia"] + " - " + dia["nome"];
            const diaAtual = diaOutput.clone();
            $(diaAtual).text(escalaString);
            $(output).append(diaAtual);

        });

        $(output).append(br.clone());
    });
    
    $("#app").append(output);

    // $("#meuform")[0].reset();

};


const onFormLoad = function(){

    addInputPessoa( { data: {tagListaPessoas: "#listaPessoas"} } );
    addInputDate("#dateSelector");

    $("#addPessoa").click({tagListaPessoas: "#listaPessoas"}, addInputPessoa );

    $("#enviar").click( sendForm );

};

export { onFormLoad };