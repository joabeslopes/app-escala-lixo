from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from mydates import getListaFeriados
from myConfigSupabase import getConfig

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
        raise HTTPException(status_code=503, detail="Erro ao buscar lista de feriados")

    return {"listaFeriados": lista}

@app.get("/configSupabase")
async def get_config_supabase():
    return getConfig()

static = FastAPI()

static.mount("/api", app)

static.mount("/", StaticFiles(directory="dist", html=True), name="static")