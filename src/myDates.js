export const defaultTimezone = 'T12:00:00.000-03:00';
const defaultTimezoneOffset = 180;
var anoGlobal, listaFeriados;

export const diasIndex = {
  "": "",
  "segunda": 1,
  "terça": 2,
  "quarta": 3,
  "quinta": 4,
  "sexta": 5,
  "sabado": 6,
  "domingo": 0
};

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
  // atualiza com o timezone default para pegar a string ISO no dia correto
  diaUser.setMinutes( diaUser.getMinutes() - defaultTimezoneOffset );

  const diaAtual = diaUser.toISOString().split('T')[0];
  return diaAtual;
}

async function getFeriados(ano){

  const response = await fetch('https://brasilapi.com.br/api/feriados/v1/'+ano,
  ).then(r => r.json()
  ).catch(error => false);

  if (!response){
    return null;
  } else {
    const newListaFeriados = response.map( feriado => feriado.date )
    return newListaFeriados;
  };

};

export async function gerarListaMes(dados){

  const diaInicial = dados.diaInicial;
  const exclusaoSemana = dados.exclusaoSemana;
  const exclusaoMes = dados.exclusaoMes;
  const ignoraFeriados = dados.ignoraFeriados;
  const diasOptions = dados.diasOptions;

  const objDiaInicial = new Date(diaInicial+defaultTimezone);
  const ano = objDiaInicial.getFullYear();
  const mes = objDiaInicial.getMonth();
  const listaDiasSemana = Object.values(diasOptions);
  const listaExclusaoSemana = exclusaoSemana.map( (d) => diasOptions[d] );
  const listaMes = [];

  // Não buscar se o usuario marcar o checkbox
  if (!ignoraFeriados){

    if (ano !== anoGlobal){
      listaFeriados = await getFeriados(ano);
      if ( listaFeriados === null ){
        return null;
      };
      anoGlobal = ano;
    };

  } else {
    listaFeriados = [];
    anoGlobal = '';
  };

  while ( objDiaInicial.getMonth() == mes ){

    const diaISO = objDiaInicial.toISOString().split('T')[0];
    const diaSemana = objDiaInicial.getDay();

    // o dia nao é feriado, não está na exclusao da semana e nem do mes
    if (listaDiasSemana.includes(diaSemana) && !listaFeriados.includes(diaISO) && !listaExclusaoSemana.includes(diaSemana) && !exclusaoMes.includes(diaISO) ){
      listaMes.push(diaISO);
    };

    // aumenta a data em 1 dia
    objDiaInicial.setDate( objDiaInicial.getDate() + 1 );
  };

  return listaMes;
};