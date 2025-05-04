import {gerarListaMes, getDiaIndex} from './mydates';

export default async function gerarEscala(diaInicial, listaPessoas, listaExclusaoSemana){

    const listaMes = await gerarListaMes(diaInicial, listaExclusaoSemana);
    if ( typeof listaMes === "undefined" ){
        return undefined;
    };

    let newListaPessoas = [...listaPessoas];
    let newListaMes = [];

    listaMes.forEach( (semana) => {

        let newSemana = [];
        for (let dia = 0; dia < 7; dia++){
            // renova a lista de pessoas
            if (newListaPessoas.length == 0){
                newListaPessoas = [...listaPessoas];
            };

            if (semana[dia] != '0' ){
                // tenta gerar a escala uma vez
                let escalaDia = geraEscalaDia(dia, semana, newListaPessoas);

                // caso nao funcione, extende a lista e tenta de novo
                if (typeof escalaDia === "undefined"){

                    newListaPessoas = [
                        ...newListaPessoas,
                        ...listaPessoas
                    ];
                    escalaDia = geraEscalaDia(dia, semana, newListaPessoas);
                };

                // se funcionar faz o push, se nao ignora e vai para o proximo dia
                if (typeof escalaDia !== "undefined"){
                    newSemana.push(escalaDia);
                };
            };
        };

        if (JSON.stringify(newSemana) !== '[]' ){
            newListaMes.push(newSemana);
        };

    });

    return newListaMes;
};


function geraEscalaDia(diaIdx, semana, listaPessoas){

    let escalaDia;
    const diaString = semana[diaIdx];

    for (let pessoaIdx = 0; pessoaIdx < listaPessoas.length; pessoaIdx++ ){
        const pessoa = listaPessoas[pessoaIdx];
        const diaHomeIndex = getDiaIndex(pessoa.homeOffice);
        // se a pessoa nao estiver de home office, coloca ela na escala e tira ela da fila
        if (diaHomeIndex != diaIdx){
            escalaDia = {   "dia": diaString,
                            "nome": pessoa.nome
            };
            listaPessoas.splice(pessoaIdx, 1);
            break;
        };
    };

    return escalaDia;
};