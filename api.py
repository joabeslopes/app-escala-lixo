from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from mydates import getListaFeriados
from myClasses import IntegracaoEscala
from myClientSupabase import get_instance, user_auth, set_escala

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

@app.post("/integracaoSupabase")
async def post_integracao_escala(request: IntegracaoEscala):
    supabase = get_instance()
    if not supabase:
        raise HTTPException(status_code=503, detail="Erro na conexão com o Supabase")

    success = user_auth(supabase, request)
    if not success:
        raise HTTPException(status_code=401, detail="Usuário inválido")

    success = set_escala(supabase, request)
    if not success:
        raise HTTPException(status_code=400, detail="Escala inválida")
    
    return {"success": True}

static = FastAPI()

static.mount("/api", app)

static.mount("/", StaticFiles(directory="dist", html=True), name="static")