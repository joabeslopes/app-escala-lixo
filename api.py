from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel
from typing import List


app = FastAPI()

static = FastAPI()

static.mount("/api", app)

static.mount("/", StaticFiles(directory="dist", html=True), name="static")


class Pessoa(BaseModel):
    nome: str
    homeOffice: str

class myRequest(BaseModel):
    listaPessoas: List[Pessoa]

@app.post("/listaPessoas")
async def lista_pessoas(request: myRequest):

    listaFiltrada = [x for x in request.listaPessoas if not x.nome == ""]

    if not listaFiltrada:
        raise HTTPException(status_code=400, detail="Preencher as pessoas")

    return {"recebido": listaFiltrada}