# Sistema de Agendamento Online

Um sistema de agendamento online para salão de beleza, dividido em Frontend com Angular e Bootstrap, Backend em .Net com Swagger, Serviço de envio de mensagens whatsapp também em .Net, com integração com a API do Twilio e banco de dados em SQL Server.

## Tecnologias Utilizadas

- **Frontend:** Angular, Bootstrap
- **Backend:** .NET
- **Banco de Dados:** SQL Server
- **WhatsappSender:** Twilio API

## IDEs Utilizadas:

- Visual Studio (https://visualstudio.microsoft.com/vs/community/)
- Visual Studio Code (https://code.visualstudio.com/download)
- SQL Server Management Studio, podendo instalar o SQL Server a partir dele (https://learn.microsoft.com/pt-br/sql/ssms/sql-server-management-studio-ssms)

## Requisitos

Para rodar o projeto localmente, você precisará ter os seguintes softwares instalados:

- Node.js (https://nodejs.org/)
- Angular CLI (https://angular.io/cli)
- .NET 8 SDK (https://dotnet.microsoft.com/download)
- SQL Server (https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Configuração do Ambiente

### Backend (.NET)

1. Clone o repositório do projeto:
    ```sh
    git clone https://github.com/WesleyKCarlesso/Estagio.git
    cd Estagio/Backend
    ```

2. Abra o Visual Studio como administrador e abra o projeto no caminho Estagio/Backend.

3. Configure a string de conexão com o SQL Server no arquivo `appsettings.json` (neste caso o login é feito com autenticação do windows):
    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=SEU_SERVIDOR;Database=SEU_BANCO;Trusted_Connection=True;TrustServerCertificate=True;Integrated Security=True;"
    }
    ```

4. Abra o Package Manager Console, no Default project, selecione:
    ```sh
    Backend.Data
    ```

5. Execute o comando na janela do Package Manager Console:
    ```sh
    update-database
    ```

6. Inicie a aplicação backend com o comando abaixo no CMD ou apertando `F5` no Visual Studio:
    ```sh
    dotnet run
    ```

7. Para abrir a aplicação com o swagger:
    ```
    https://localhost:7018/swagger/index.html
    ```

### Frontend (Angular)

1. Navegue até o diretório do frontend:
    ```sh
    cd Estagio/Frontend
    ```

2. Instale as dependências do projeto:
    ```sh
    npm install
    ```

3. Inicie a aplicação frontend:
    ```sh
    ng serve
    ```

4. Abra seu navegador e acesse:
    ```
    http://localhost:4200
    ```

### Serviço de Envio de Mensagens no Whatsapp

1. Vá até o diretório do projeto:
    ```sh
    cd Estagio/WhatsappSender
    ```

2. Configure a conexão com o banco no Program.cs, na varíavel `connectionString` exatamente como foi feito no Backend.

3. Configure as chaves da API do Twilio no arquivo `.env` na raiz do projeto:
    ```json
    ACCOUNT_SID=sua_account_sid
    AUTH_TOKEN=seu_auth_token
    ```

4. No prompt de comando, restaure as dependências do projeto:
    ```sh
    dotnet restore
    ```

5. Inicie o serviço de envio de mensagens, se preferir, abra a aplicação no Visual Studio e aperte a tecla `F5`:
    ```sh
    dotnet run
    ```