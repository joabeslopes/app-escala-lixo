FROM python:3.11

# Instala o Node.js e o npm
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY requirements.txt package.json package-lock.json* ./

# Instala dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Instala dependências Node.js
RUN npm install

# Copia o restante do código
COPY . .

# Executa o build da aplicação frontend
RUN npm run build

# Expõe a porta da API
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["python3", "main.py"]