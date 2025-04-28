from datetime import date, timedelta
from workalendar.america import Brazil

dicionarioDias = {
    "nenhum": -1,
    "segunda": 0,
    "terça": 1,
    "quarta": 2,
    "quinta": 3,
    "sexta": 4,
    "sabado": 5,
    "domingo": 6
}

def getDiaIndex(dia:str):
    if dia in dicionarioDias:
        return dicionarioDias[dia]
    else:
        return -1

def gerarMesLista(diaInicial:str, listaExclusaoSemana: list):

    if len(diaInicial) < 10:
        return []

    dateSplit = diaInicial.split('-')

    if len(dateSplit) < 3:
        return []

    anoString = dateSplit[0]
    mesString = dateSplit[1]
    diaString = dateSplit[2]

    if (len(anoString) != 4) or (len(mesString) != 2) or (len(diaString) != 2):
        return []

    ano = int(anoString)
    mes = int(mesString)
    dia = int(diaString)
    brazilCalendar = Brazil()
    mydate = date(ano, mes, dia)
    mesLista = []
    diaCounter = dia - 1

    listaFeriados = [h[0] for h in brazilCalendar.holidays(ano)]

    exclusaoSemana = [getDiaIndex(diaExcluido) for diaExcluido in listaExclusaoSemana]

    while (mydate.month == mes):
        semana = ['0','0','0','0','0','0','0']

        # preenche os dias da semana, ate completar ela 
        while (semana[6] == '0'):
            diaAtual = mydate.weekday()
            semana[diaAtual] = mydate.strftime("%d/%m/%Y")
            mydate += timedelta(days=1)
            # para de completar se chegar no fim do mes
            if (mydate.month != mes):
                break

        # após completar a semana, filtra os dias uteis
        for i in range(7):
            if (semana[i] != '0' ):
                diaCounter +=1
                testeDia = date(ano, mes, diaCounter)
                if (testeDia in listaFeriados) or (testeDia.weekday() in exclusaoSemana):
                    semana[i] = '0'

        # só acrescenta a semana se ela tiver dias uteis
        if (semana != ['0','0','0','0','0','0','0']):
            mesLista.append(semana)

    return mesLista