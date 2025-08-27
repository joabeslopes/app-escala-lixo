import {gerarListaMes, defaultTimezone} from './myDates';

export default async function gerarEscala(dados){

    const listaMes = await gerarListaMes(dados);
    if ( listaMes === null ){
        return null;
    };

    const listaPessoas = dados.listaPessoas;
    const newListaMes = [];
    const pessoasDia = dados.pessoasDia;
    const diasOptions = dados.diasOptions;

    let newListaPessoas = [...listaPessoas];

    listaMes.forEach( (dia) => {

        const escalaDia = {
            dia: dia,
            nome: []
        };

        for (let i = 0; i < pessoasDia; i++){

            if (newListaPessoas.length == 0){
                newListaPessoas = [...listaPessoas];
            };

            let newEscalaDia = geraEscalaDia(dia, newListaPessoas, diasOptions);

            // caso nao funcione, extende a lista e tenta de novo
            if (newEscalaDia === null){
    
                newListaPessoas = [
                    ...newListaPessoas,
                    ...listaPessoas
                ];
                newEscalaDia = geraEscalaDia(dia, newListaPessoas, diasOptions);
            };

            // só acrescenta se achar alguem disponivel e ainda nao incluido no dia
            if (newEscalaDia !== null && !escalaDia.nome.includes(newEscalaDia.nome)){
                escalaDia.nome.push( newEscalaDia.nome );
            };
        };

        if (escalaDia.nome.length > 0) {
            newListaMes.push(escalaDia)
        };

    });

    return newListaMes;
};

function geraEscalaDia(dia, listaPessoas, diasOptions){

    let escalaDia = null;
    const d = new Date(dia+defaultTimezone);
    const diaIdx = d.getDay();

    for (let pessoaIdx = 0; pessoaIdx < listaPessoas.length; pessoaIdx++ ){
        const pessoa = listaPessoas[pessoaIdx];
        const pessoaListaSemanaIndex = pessoa.listaSemana.map( (diaSemana) => diasOptions[diaSemana] );
        // se o dia do mes e da semana não estiver nas listas, coloca a pessoa na escala e tira ela da fila
        if (!pessoaListaSemanaIndex.includes(diaIdx) && !pessoa.listaMes.includes(dia)){
            escalaDia = {   "dia": dia,
                            "nome": pessoa.nome
            };
            listaPessoas.splice(pessoaIdx, 1);
            break;
        };
    };

    return escalaDia;
};