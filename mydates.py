from datetime import date, timedelta
from workalendar.america import Brazil

dicionarioDias = {
    "nenhum": -1,
    "segunda": 0,
    "terça": 1,
    "quarta": 2,
    "quinta": 3,
    "sexta": 4,
}

def getDiaIndex(dia:str):
    if dia in dicionarioDias:
        return dicionarioDias[dia]
    else:
        return -1

def gerarMesLista(isoDate:str):

    if len(isoDate) < 7:
        return []

    dateSplit = isoDate.split('-')

    if len(dateSplit) < 2:
        return []

    anoString = dateSplit[0]
    mesString = dateSplit[1]

    if (len(anoString) != 4) or (len(mesString) != 2):
        return []

    mes = int(mesString)
    ano = int(anoString)
    brazilCalendar = Brazil()
    mydate = date(ano, mes, 1)
    mesLista = []
    diaCounter = 0

    while (mydate.month == mes):
        semana = ['0','0','0','0','0','0','0']

        # preenche os dias da semana, ate completar ela 
        while (semana[6] == '0'):
            diaAtual = mydate.weekday()
            semana[diaAtual] = mydate.strftime("%Y-%m-%d")
            mydate += timedelta(days=1)
            # para de completar se chegar no fim do mes
            if (mydate.month != mes):
                break

        # após completar a semana, filtra os dias uteis
        for i in range(7):
            if (semana[i] != '0' ):
                diaCounter +=1
                testeDia = date(ano, mes, diaCounter)
                if not (brazilCalendar.is_working_day(testeDia)) :
                    semana[i] = '0'

        # só acrescenta a semana se ela tiver dias uteis
        if (semana != ['0','0','0','0','0','0','0']):
            mesLista.append(semana)

    return mesLista