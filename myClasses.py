from pydantic import BaseModel
from typing import List

class Dia(BaseModel):
    dia: str
    nome: str

class IntegracaoEscala(BaseModel):
    email: str
    password: str
    escala: List[Dia]