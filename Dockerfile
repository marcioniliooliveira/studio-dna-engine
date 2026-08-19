# Utiliza a imagem oficial do Playwright com todos os navegadores e dependências de sistema
FROM mcr.microsoft.com/playwright:v1.49.0-noble

WORKDIR /app

# Copia dependências do projeto
COPY package*.json ./

# Instala dependências do Node e garante Chromium
RUN npm install --omit=dev && npx playwright install chromium

# Copia código-fonte
COPY . .

# Cria pasta de saída de cópias
RUN mkdir -p copias

# Volume para exportar cópias geradas para a máquina hospedeira
VOLUME ["/app/copias"]

# Ponto de entrada padrão
ENTRYPOINT ["node", "bin/cli.js"]
CMD ["--help"]
