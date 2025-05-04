var defaultTimezone = 'T12:00:00.000-03:00';
var anoGlobal, listaFeriados;

export function getDiaPtBr(diaISO){
  const d = new Date(diaISO+defaultTimezone);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const diaString = d.toLocaleString("pt-br", options);
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

export async function gerarListaMes(diaInicial, listaExclusaoSemana){

  const objDiaInicial = new Date(diaInicial+defaultTimezone);
  const ano = objDiaInicial.getFullYear();
  const mes = objDiaInicial.getMonth();

  if (ano !== anoGlobal){
    listaFeriados = await getFeriados(ano);
    if ( typeof listaFeriados === "undefined" ){
      return undefined;
    };
    anoGlobal = ano;
  };

  let listaMes = [];

  while ( objDiaInicial.getMonth() == mes ){
    let semana = ['0','0','0','0','0','0','0'];

    // preenche os dias da semana, ate completar ela 
    while (semana[6] == '0'){
      const diaISO = objDiaInicial.toISOString().split('T')[0];
      const diaAtual = objDiaInicial.getDay();

      semana[diaAtual] = diaISO;

      // aumenta a data em 1 dia
      objDiaInicial.setDate( objDiaInicial.getDate() + 1 );

      // para de completar a semana se chegar no fim do mes
      if (objDiaInicial.getMonth() != mes){
        break;
      };
    };

    const exclusaoSemana = listaExclusaoSemana.map( (d) => getDiaIndex(d) );

    // filtra os dias da semana
    for (let i = 0; i < 7; i++ ){
      const diaAtual = semana[i];
      if (diaAtual != '0'){
        const testeDia = new Date(diaAtual+defaultTimezone);
        const diaAtualIndex = testeDia.getDay();
        if (exclusaoSemana.includes(diaAtualIndex) || listaFeriados.includes(diaAtual) ) {
          semana[i] = '0';
        };
      };
    };

    // acrescenta a semana se ela tiver dias uteis para a escala
    if ( JSON.stringify(semana) != '["0","0","0","0","0","0","0"]'  ){
      listaMes.push(semana);
    };

  };

  return listaMes;
};