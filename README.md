# Sistema de Gerenciamento de Cursos - IBMEC

Este projeto é um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de cursos, desenvolvido como parte da disciplina de PROJETO DE CLOUD do IBMEC. O sistema é composto por um frontend em React e um backend em FastAPI, utilizando SQLite como banco de dados.

## Estrutura do Projeto

```
projeto_crud/
├── backend/           # API FastAPI
│   ├── database.py    # Lógica do banco de dados SQLite
│   ├── main.py        # Endpoints da API
│   ├── models.py      # Modelos de dados
│   └── requirements.txt  # Dependências Python
└── frontend/          # Interface React
    ├── public/        # Arquivos estáticos
    ├── src/           # Código-fonte React
    │   ├── components/  # Componentes reutilizáveis
    │   ├── pages/     # Páginas da aplicação
    │   └── App.js     # Componente principal
    └── package.json   # Dependências JavaScript
```

## Requisitos

- Python 3.8 ou superior
- Node.js 14 ou superior
- npm (gerenciador de pacotes do Node.js)
- Visual Studio Code (recomendado)

## Configuração e Execução

### Backend (FastAPI)

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Crie um ambiente virtual Python:
   ```bash
   python -m venv venv
   ```

3. Ative o ambiente virtual:
   - **Windows PowerShell**: `.\venv\Scripts\Activate.ps1`
   - **Windows CMD**: `venv\Scripts\activate.bat`
   - **Linux/macOS**: `source venv/bin/activate`

4. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

5. Inicie o servidor:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

O backend estará disponível em http://localhost:8000
Documentação interativa da API: http://localhost:8000/docs

### Frontend (React)

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

O frontend estará disponível em http://localhost:3000

## Configuração no VS Code

### Extensões recomendadas

Para o backend (Python/FastAPI):
- Python (Microsoft)
- Pylance
- Python Docstring Generator
- Python Indent

Para o frontend (React):
- ESLint
- Prettier - Code formatter
- JavaScript and TypeScript Nightly
- ES7+ React/Redux/React-Native snippets

### Configuração para Depuração

1. Crie uma pasta `.vscode` na raiz do projeto

2. Crie um arquivo `.vscode/launch.json` com o seguinte conteúdo:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
      "jinja": true,
      "justMyCode": true,
      "cwd": "${workspaceFolder}/backend"
    },
    {
      "name": "Launch Chrome against React App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/frontend"
    }
  ],
  "compounds": [
    {
      "name": "Full Stack: FastAPI+React",
      "configurations": ["Python: FastAPI", "Launch Chrome against React App"]
    }
  ]
}
```

3. (Opcional) Crie um arquivo `.vscode/settings.json` para melhorar a experiência de desenvolvimento:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "autopep8",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Funcionalidades

- Listagem de cursos
- Cadastro de novos cursos
- Edição de cursos existentes
- Exclusão de cursos

## Problemas Comuns e Soluções

### Node.js não instalado ou não encontrado no PATH

Se você receber um erro "npm: The term 'npm' is not recognized..." ao tentar executar comandos npm, significa que o Node.js não está instalado ou não está no PATH do sistema.

**Solução**: Instale o Node.js manualmente do site oficial [nodejs.org](https://nodejs.org/), certificando-se de marcar a opção para adicionar ao PATH durante a instalação.

### Política de execução do PowerShell

Se você receber um erro ao tentar executar scripts PowerShell, pode ser devido à política de execução.

**Solução**: Execute o seguinte comando no PowerShell aberto como administrador:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Backend não se conecta com Frontend

Se o frontend não conseguir se comunicar com o backend, verifique:
1. Se o backend está rodando na porta 8000
2. Se o CORS está configurado corretamente (já está no código)
3. Se os endpoints estão corretos nos arquivos do frontend

## Contribuição

Este projeto foi desenvolvido para fins educacionais. Sugestões e melhorias são bem-vindas através de pull requests.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
