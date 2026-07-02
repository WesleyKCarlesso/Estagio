# Online Scheduling System

An online scheduling system for beauty salons, consisting of an Angular + Bootstrap frontend, a .NET backend with Swagger, a .NET WhatsApp messaging service integrated with the Twilio API, and a SQL Server database.

## Technologies

- **Frontend:** Angular, Bootstrap
- **Backend:** .NET
- **Database:** SQL Server
- **WhatsApp Service:** Twilio API

## Development Tools

- Visual Studio (https://visualstudio.microsoft.com/vs/community/)
- Visual Studio Code (https://code.visualstudio.com/download)
- SQL Server Management Studio (includes SQL Server installation options) (https://learn.microsoft.com/sql/ssms/sql-server-management-studio-ssms)

## Requirements

To run this project locally, make sure you have the following installed:

- Node.js (https://nodejs.org/)
- Angular CLI (https://angular.io/cli)
- .NET 8 SDK (https://dotnet.microsoft.com/download)
- SQL Server (https://www.microsoft.com/sql-server/sql-server-downloads)

---

# Environment Setup

## Backend (.NET)

### 1. Clone the repository

```bash
git clone https://github.com/WesleyKCarlesso/Estagio.git
cd Estagio/Backend
```

### 2. Open the project

Launch Visual Studio as Administrator and open the project located in:

```
Estagio/Backend
```

### 3. Configure the database connection

Update the connection string in `appsettings.json`.

Example using Windows Authentication:

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DATABASE;Trusted_Connection=True;TrustServerCertificate=True;Integrated Security=True;"
}
```

### 4. Select the startup project for migrations

Open the **Package Manager Console** and set the **Default Project** to:

```
Backend.Data
```

### 5. Apply the database migrations

Run:

```powershell
update-database
```

### 6. Start the backend

Run the application by pressing **F5** in Visual Studio or using:

```bash
dotnet run
```

### 7. Open Swagger

Navigate to:

```
https://localhost:7018/swagger/index.html
```

---

# Frontend (Angular)

### 1. Navigate to the frontend directory

```bash
cd Estagio/Frontend
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Start the Angular application

```bash
ng serve
```

### 4. Open the application

Open your browser and navigate to:

```
http://localhost:4200
```

---

# WhatsApp Messaging Service

### 1. Navigate to the project directory

```bash
cd Estagio/WhatsappSender
```

### 2. Configure the database connection

Update the `connectionString` variable in `Program.cs` using the same connection string configured for the backend.

### 3. Configure the Twilio credentials

Create or edit the `.env` file in the project root:

```env
ACCOUNT_SID=your_account_sid
AUTH_TOKEN=your_auth_token
```

### 4. Restore the project dependencies

```bash
dotnet restore
```

### 5. Start the service

You can either press **F5** in Visual Studio or run:

```bash
dotnet run
```
