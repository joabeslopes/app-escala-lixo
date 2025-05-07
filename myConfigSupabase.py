import os
from dotenv import load_dotenv

load_dotenv()

def getConfig():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    tabela_escala = os.environ.get("SUPABASE_TABELA_ESCALA")

    return {'url':url, 'key':key, 'tabela_escala':tabela_escala}