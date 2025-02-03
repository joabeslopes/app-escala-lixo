import mydates as mydates

def gerarEscala(isoDate, listaPessoas):

    mesLista = mydates.gerarMesLista(isoDate)
    if not mesLista:
        return []
    newPessoasLista = listaPessoas.copy()
    newMes = []
    for semana in mesLista:
        newSemana = []
        for dia in range(7):
            if len(newPessoasLista) == 0:
                newPessoasLista = listaPessoas.copy()

            if semana[dia] != '0':
                # tenta gerar uma vez
                escalaDia = geraEscalaDia(dia, semana[dia], newPessoasLista)
                # caso nao funcione, extende a lista e tenta de novo
                if (escalaDia == {}):
                    newPessoasLista.extend(listaPessoas.copy())
                    escalaDia = geraEscalaDia(dia, semana[dia], newPessoasLista)
                # caso funcione faz o append, se nao ignora e vai para o proximo
                if (escalaDia != {}):
                    newSemana.append(escalaDia)

        newMes.append(newSemana)

    return newMes


def geraEscalaDia(diaIdx, diaString, listaPessoas):
    escalaDia = {}
    for pessoaIdx in range(len(listaPessoas)):
        pessoa = listaPessoas[pessoaIdx]
        diaHome = mydates.getDiaIndex(pessoa.homeOffice)
        if diaHome != diaIdx:
            escalaDia = { "dia": diaString,
                          "nome": pessoa.nome
                        }
            del listaPessoas[pessoaIdx]
            break
    return escalaDia