import {gerarListaMes, getDiaIndex, defaultTimezone} from './myDates';

export default async function gerarEscala(dados){

    const listaMes = await gerarListaMes(dados);
    if ( listaMes === null ){
        return null;
    };

    const listaPessoas = dados.listaPessoas;
    const newListaMes = [];

    let newListaPessoas = [...listaPessoas];

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
    const diaISO = d.toISOString().split('T')[0];

    for (let pessoaIdx = 0; pessoaIdx < listaPessoas.length; pessoaIdx++ ){
        const pessoa = listaPessoas[pessoaIdx];
        const pessoaListaSemanaIndex = pessoa.listaSemana.map( (diaSemana) => getDiaIndex(diaSemana) );
        // se o dia do mes e da semana não estiver nas listas, coloca a pessoa na escala e tira ela da fila
        if (!pessoaListaSemanaIndex.includes(diaIdx) && !pessoa.listaMes.includes(diaISO)){
            escalaDia = {   "dia": dia,
                            "nome": pessoa.nome
            };
            listaPessoas.splice(pessoaIdx, 1);
            break;
        };
    };

    return escalaDia;
};