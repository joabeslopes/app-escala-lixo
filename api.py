from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List

from escala import gerarEscala


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class Pessoa(BaseModel):
    nome: str
    homeOffice: str

class myRequest(BaseModel):
    listaPessoas: List[Pessoa]
    ISODate: str

@app.post("/gerarEscala")
async def lista_pessoas(request: myRequest):

    escala = gerarEscala(request.ISODate, request.listaPessoas)

    if not escala:
        raise HTTPException(status_code=400, detail="Erro nos dados, preencha novamente")

    return {"escala": escala}



# static = FastAPI()

# static.mount("/api", app)

# static.mount("/", StaticFiles(directory="dist", html=True), name="static")