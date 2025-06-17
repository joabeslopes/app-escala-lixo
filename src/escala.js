import {gerarListaMes, getDiaIndex, defaultTimezone} from './myDates';

export default async function gerarEscala(dados){

    const listaMes = await gerarListaMes(dados);
    if ( listaMes === null ){
        return null;
    };

    const newListaMes = [];

    let newListaPessoas = [...dados.listaPessoas];
    let newListaGrupos = [...dados.listaGrupos];
    let addGrupo = true;

    listaMes.forEach( (dia) => {

        if (addGrupo && dados.listaGrupos.length > 0){
            geraEscalaGrupos(dia, newListaGrupos, newListaMes, dados);
        } else {
            geraEscalaPessoas(dia, newListaPessoas, newListaMes, dados);
        };

        addGrupo = !addGrupo;
    });

    return newListaMes;
};


function geraEscalaGrupos(dia, newListaGrupos, newListaMes, dados){

    const listaGrupos = dados.listaGrupos;

    const escalaDia = {
        dia: dia,
        nome: []
    };

    if (newListaGrupos.length == 0){
        newListaGrupos = [...listaGrupos];
    };

    let newEscalaDia = geraEscalaDia(dia, newListaGrupos);

    // caso nao funcione, extende a lista e tenta de novo
    if (newEscalaDia === null){

        newListaGrupos = [
            ...newListaGrupos,
            ...listaGrupos
        ];
        newEscalaDia = geraEscalaDia(dia, newListaGrupos);
    };

    // só acrescenta se achar alguem disponivel e ainda nao incluido no dia
    if (newEscalaDia !== null && !escalaDia.nome.includes(newEscalaDia.nome)){
        escalaDia.nome.push( newEscalaDia.nome );
    };

    if (escalaDia.nome.length > 0) {
        newListaMes.push(escalaDia)
    };

};


function geraEscalaPessoas(dia, newListaPessoas, newListaMes, dados){

    const pessoasDia = dados.pessoasDia;
    const listaPessoas = dados.listaPessoas;

    const escalaDia = {
        dia: dia,
        nome: []
    };

    for (let i = 0; i < pessoasDia; i++){

        if (newListaPessoas.length == 0){
            newListaPessoas = [...listaPessoas];
        };

        let newEscalaDia = geraEscalaDia(dia, newListaPessoas);

        // caso nao funcione, extende a lista e tenta de novo
        if (newEscalaDia === null){

            newListaPessoas = [
                ...newListaPessoas,
                ...listaPessoas
            ];
            newEscalaDia = geraEscalaDia(dia, newListaPessoas);
        };

        // só acrescenta se achar alguem disponivel e ainda nao incluido no dia
        if (newEscalaDia !== null && !escalaDia.nome.includes(newEscalaDia.nome)){
            escalaDia.nome.push( newEscalaDia.nome );
        };
    };

    if (escalaDia.nome.length > 0) {
        newListaMes.push(escalaDia)
    };
};

function geraEscalaDia(dia, listaPessoas){

    let escalaDia = null;
    const d = new Date(dia+defaultTimezone);
    const diaIdx = d.getDay();

    for (let pessoaIdx = 0; pessoaIdx < listaPessoas.length; pessoaIdx++ ){
        const pessoa = listaPessoas[pessoaIdx];
        const pessoaListaSemanaIndex = pessoa.listaSemana.map( (diaSemana) => getDiaIndex(diaSemana) );
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