import mydates as mydates
from collections import deque

def gerarEscala(isoDate, listaPessoas):

    mesLista = mydates.gerarMesLista(isoDate)

    newMes = []
    filaPessoas = deque(listaPessoas)
    for semana in mesLista:
        newSemana = []
        for dia in range(7):
            if semana[dia] != '0':
                escalaDia = {}
                while (escalaDia == {}):
                    if len(filaPessoas) < 2:
                        filaPessoas.extend(listaPessoas)

                    pessoa = filaPessoas.popleft()
                    diaHome = mydates.getDiaIndex(pessoa.homeOffice)
                    if diaHome != dia:
                        escalaDia = {semana[dia]: pessoa.nome }
                    else:
                        filaPessoas.append(pessoa)

                newSemana.append(escalaDia)

        newMes.append(newSemana)

    return newMes