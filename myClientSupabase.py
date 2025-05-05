import os
from supabase import create_client, Client
from dotenv import load_dotenv
from myClasses import IntegracaoEscala

load_dotenv()
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

def get_instance():
    try:
        supabase: Client = create_client(url, key)
        return supabase
    except Exception as e:
        print(f"Erro na conexao com supabase: {str(e)}")
        return None

def user_auth(supabase: Client, request: IntegracaoEscala):
    try:
        user = supabase.auth.sign_in_with_password({ "email": request.email, "password": request.password })
        return True
    except Exception as e:
        print(f"Erro na validaçao do usuario: {str(e)}")
        return False

def set_escala(supabase: Client, request: IntegracaoEscala):
    try:
        user = supabase.auth.get_user()
    except Exception as e:
        print(f"Erro na validaçao do usuario: {str(e)}")
        return False

    return True