## App escala lixo

Web App em python que recebe a lista das pessoas com seu dia de home office, e retorna a escala.

É um app simples e objetivo.

Para rodar ele, primeiro deve instalar o Python, e depois abrir o terminal na pasta do projeto.

Com o python instalado, é recomendavel criar um ambiente virtual na pasta do projeto pra instalar as dependencias, pra esse projeto o nome padrao é .venv/ :

> python -m venv .venv

Depois ativar o ambiente, no caso do Windows (powershell):

> & .venv\Scripts\Activate.ps1

No caso de uma distro linux:

> source .venv/bin/activate

Agora instala as dependencias:

> pip install -r requirements.txt

Feito isso, só rodar:

> python main.py

Vai por padrao rodar na porta 5000, só acessar http://localhost:5000

Se quiser me ajudar a desenvolver o frontend, só instalar o node e rodar npm install, assim ele instala o React que foi o que usei pra gerar o javascript final.