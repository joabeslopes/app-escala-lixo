import mydates as mydates
from collections import deque

def criarFilaPessoas(listaPessoas):
    return deque(listaPessoas)

def gerarEscala(isoDate, listaPessoas):

    mesLista = mydates.gerarMesLista(isoDate)

    newMes = []
    filaPessoas = criarFilaPessoas(listaPessoas)
    for semana in mesLista:
        newSemana = []
        for dia in range(7):
            if semana[dia] != '0':
                escalaDia = {}
                while (escalaDia == {}):
                    if not filaPessoas:
                        filaPessoas = criarFilaPessoas(listaPessoas)

                    pessoa = filaPessoas.popleft()
                    diaHome = mydates.getDiaIndex(pessoa.homeOffice)
                    if diaHome != dia:
                        escalaDia = {semana[dia]: pessoa.nome }

                newSemana.append(escalaDia)

        newMes.append(newSemana)

    return newMes

# class Pessoa():
#     nome: str
#     homeOffice: str

# joabe = Pessoa()
# joabe.nome = "Joabe"
# joabe.homeOffice = "sexta"

# milena = Pessoa()
# milena.nome = "Milena"
# milena.homeOffice = "segunda"

# roger = Pessoa()
# roger.nome = "Roger"
# roger.homeOffice = "sexta"

# listaPessoas = [joabe, milena, roger]

# mes = mydates.getListaSemanas('2025-01')

# print( gerarEscala(mes, listaPessoas) )