import os
from supabase import create_client, Client
from dotenv import load_dotenv
from myClasses import IntegracaoEscala

load_dotenv()

def set_escala(supabase: Client, request: IntegracaoEscala):
    
    tabela_escala = os.environ.get("SUPABASE_TABELA_ESCALA")

    request_escala = [ {"dia": dia.dia, "nome": dia.nome} for dia in request.escala ]
    
    try:
        supabase.table(tabela_escala).upsert(request_escala).execute()
    except Exception as e:
        print(f"Erro ao modificar escala: {str(e)}")
        return False

    return True

def get_credentials():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")

    return {'url': url, 'key': key}