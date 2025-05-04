from workalendar.america import Brazil

def getListaFeriados(ano:int):
    brazilCalendar = Brazil()
    listaFeriados = [h[0] for h in brazilCalendar.holidays(ano)]
    return listaFeriados