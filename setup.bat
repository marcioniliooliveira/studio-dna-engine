@echo off
setlocal
title Site Cloner DNA - Instalador Automático

echo ======================================================
echo    🌐 Site Cloner DNA - Instalador de Dependências
echo ======================================================
echo.

:: Verifica se o Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao foi encontrado no sistema!
    echo Por favor, instale o Node.js (v18+) em https://nodejs.org/ e tente novamente.
    echo.
    pause
    exit /b 1
)

echo [1/3] Verificando Node.js...
node -v

echo.
echo [2/3] Instalando dependencias do Node...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao rodar npm install.
    pause
    exit /b 1
)

echo.
echo [3/3] Baixando navegadores do Playwright (Chromium)...
call npx playwright install --with-deps chromium
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar navegadores do Playwright.
    pause
    exit /b 1
)

echo.
echo ======================================================
echo    INSTALACAO CONCLUIDA COM SUCESSO!
echo ======================================================
echo.
echo Para executar o projeto, voce pode rodar:
echo   npm start
echo   node bin/cli.js https://exemplo.com
echo.
pause
