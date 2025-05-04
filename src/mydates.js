export var defaultTimezone = 'T12:00:00.000-03:00';
var anoGlobal, listaFeriados;

function getLocaleString(diaISO, options){
  const d = new Date(diaISO+defaultTimezone);
  const diaString = d.toLocaleString("pt-br", options);
  return diaString;
}

export function getDiaPtBr(diaISO){
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const diaString = getLocaleString(diaISO, options);
  return diaString;
}

export function getMesPtBr(diaISO){
  const options = { month: 'long' };
  const diaString = getLocaleString(diaISO, options);
  return diaString;
}

export function getDiaAtual(){
  const diaUser = new Date();
  // atualiza com o Timezone do usuario para pegar a string ISO no dia correto
  diaUser.setMinutes( diaUser.getMinutes() - diaUser.getTimezoneOffset() );

  const diaAtual = diaUser.toISOString().split('T')[0];
  return diaAtual;
}

export function getDiaIndex(diaString){
  const dicionarioDias = {
    "nenhum": -1,
    "domingo": 0,
    "segunda": 1,
    "terça": 2,
    "quarta": 3,
    "quinta": 4,
    "sexta": 5,
    "sabado": 6
  };

  if ( dicionarioDias.hasOwnProperty(diaString) ){
    return dicionarioDias[diaString];
  }
  else {
    return -1;
  };

};

async function getFeriados(ano){

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const apiUrl = protocol + '//' + hostname + ':5000' + '/api';
  let lista = await fetch(apiUrl + "/listaFeriados?ano="+ano,
                    ).then(response => response.json()
                    ).then(response => response["listaFeriados"]
                    ).catch(error => undefined);
  return lista;
};

export async function gerarListaMes(diaInicial, exclusaoSemana){

  const objDiaInicial = new Date(diaInicial+defaultTimezone);
  const ano = objDiaInicial.getFullYear();
  const mes = objDiaInicial.getMonth();
  const listaExclusaoSemana = exclusaoSemana.map( (d) => getDiaIndex(d) );
  const listaMes = [];

  if (ano !== anoGlobal){
    listaFeriados = await getFeriados(ano);
    if ( typeof listaFeriados === "undefined" ){
      return undefined;
    };
    anoGlobal = ano;
  };

  while ( objDiaInicial.getMonth() == mes ){

    const diaISO = objDiaInicial.toISOString().split('T')[0];
    const diaAtual = objDiaInicial.getDay();
    
    // o dia nao é feriado e não está na exclusao da semana
    if (!listaFeriados.includes(diaISO) && !listaExclusaoSemana.includes(diaAtual) ){
      listaMes.push(diaISO);
    };

    // aumenta a data em 1 dia
    objDiaInicial.setDate( objDiaInicial.getDate() + 1 );
  };

  return listaMes;
};