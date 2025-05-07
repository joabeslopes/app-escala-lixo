import {gerarListaMes, getDiaIndex, defaultTimezone} from './myDates';

export default async function gerarEscala(diaInicial, exclusaoSemana, listaPessoas){

    const listaMes = await gerarListaMes(diaInicial, exclusaoSemana);
    if ( typeof listaMes === "undefined" ){
        return undefined;
    };

    let newListaPessoas = [...listaPessoas];
    const newListaMes = [];

    listaMes.forEach( (dia) => {

        if (newListaPessoas.length == 0){
            newListaPessoas = [...listaPessoas];
        };

        let escalaDia = geraEscalaDia(dia, newListaPessoas);

        // caso nao funcione, extende a lista e tenta de novo
        if (typeof escalaDia === "undefined"){

            newListaPessoas = [
                ...newListaPessoas,
                ...listaPessoas
            ];
            escalaDia = geraEscalaDia(dia, newListaPessoas);
        };

        // se funcionar faz o push, se nao ignora e vai para o proximo dia
        if (typeof escalaDia !== "undefined"){
            newListaMes.push(escalaDia);
        };

    });

    return newListaMes;
};

function geraEscalaDia(dia, listaPessoas){

    let escalaDia;
    const d = new Date(dia+defaultTimezone);
    const diaIdx = d.getDay();

    for (let pessoaIdx = 0; pessoaIdx < listaPessoas.length; pessoaIdx++ ){
        const pessoa = listaPessoas[pessoaIdx];
        const diaHomeIndex = getDiaIndex(pessoa.homeOffice);
        // se a pessoa nao estiver de home office, coloca ela na escala e tira ela da fila
        if (diaHomeIndex != diaIdx){
            escalaDia = {   "dia": dia,
                            "nome": pessoa.nome
            };
            listaPessoas.splice(pessoaIdx, 1);
            break;
        };
    };

    return escalaDia;
};