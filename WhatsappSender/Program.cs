﻿using System;
using System.Data;
using System.Threading;
using Dapper;
using DotNetEnv;
using Microsoft.Data.SqlClient;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Iniciando a aplicação...");

        var connectionString = "Server=Wesley; Database=Estagio; Trusted_Connection=True;  TrustServerCertificate=True; Integrated Security=True;";

        Env.Load();

        var accountSid = Environment.GetEnvironmentVariable("ACCOUNT_SID");
        var authToken = Environment.GetEnvironmentVariable("AUTH_TOKEN");

        if (string.IsNullOrEmpty(accountSid) || string.IsNullOrEmpty(authToken))
        {
            Console.WriteLine("Erro: ACCOUNT_SID ou AUTH_TOKEN não está configurado.");
            return;
        }

        TwilioClient.Init(accountSid, authToken);

        while (true)
        {
            Console.WriteLine("Verificando agendamentos...");
            CheckSchedules(connectionString);
            Console.WriteLine("Verificação completa. Aguardando 60 segundos...");
            Thread.Sleep(60000);
        }
    }

    static void CheckSchedules(string connectionString)
    {
        using (IDbConnection db = new SqlConnection(connectionString))
        {
            var tomorrow = DateTime.Now.AddDays(1).Date;
            var schedules = db.Query("SELECT U.Name, U.Phone, FORMAT(S.ServiceDate, 'dd/MM/yyyy HH:mm:ss') Date, J.Name FROM Schedules S INNER JOIN Users U ON U.Id = S.UserId INNER JOIN Jobs J on J.Id = S.JobId WHERE CAST(S.ServiceDate AS DATE) = @Tomorrow", new { Tomorrow = tomorrow.ToString("MM/dd/yyyy") });

            foreach (var schedule in schedules)
            {
                var phoneNumber = "whatsapp:+55" + schedule.Phone;
                var message = $"Olá, só lembrando que você tem um horário agendado para amanhã na Peluqueria: {schedule.Date}. Serviço: {schedule.Name}";
                Console.WriteLine($"Enviando mensagem para {phoneNumber}: {message}");
                SendMessage(phoneNumber, message);
            }
        }
    }

    static void SendMessage(string to, string message)
    {
        var from = new PhoneNumber("whatsapp:+14155238886");
        var toPhoneNumber = new PhoneNumber(to);
        var msg = MessageResource.Create(
            from: from,
            to: toPhoneNumber,
            body: message);

        Console.WriteLine($"Mensagem enviada com sucesso para {to}: SID {msg.Sid}");
    }
}
