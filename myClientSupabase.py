import os
from supabase import create_client, Client
from dotenv import load_dotenv
from myClasses import IntegracaoEscala

load_dotenv()

def get_instance():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    
    try:
        supabase: Client = create_client(url, key)
        return supabase
    except Exception as e:
        print(f"Erro na conexao com supabase: {str(e)}")
        return None

def user_auth(supabase: Client, request: IntegracaoEscala):
    try:
        supabase.auth.sign_in_with_password({ "email": request.email, "password": request.password })
        return True
    except Exception as e:
        print(f"Erro na validaçao do usuario: {str(e)}")
        return False

def set_escala(supabase: Client, request: IntegracaoEscala):
    
    tabela_escala = os.environ.get("SUPABASE_TABELA_ESCALA")

    request_escala = [ {"dia": dia.dia, "nome": dia.nome} for dia in request.escala ]
    
    try:
        supabase.table(tabela_escala).upsert(request_escala).execute()
    except Exception as e:
        print(f"Erro ao modificar escala: {str(e)}")
        return False

    return True