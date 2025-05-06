from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from mydates import getListaFeriados
from myClasses import IntegracaoEscala
from myClientSupabase import get_credentials

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/listaFeriados")
async def get_lista_feriados(ano: int):
    lista = getListaFeriados(ano)

    if not lista:
        raise HTTPException(status_code=404, detail="Erro ao buscar lista de feriados")

    return {"listaFeriados": lista}

@app.get("/integracaoSupabase")
async def get_integracao_escala():
    return get_credentials()

static = FastAPI()

static.mount("/api", app)

static.mount("/", StaticFiles(directory="dist", html=True), name="static")