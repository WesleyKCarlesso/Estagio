using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddServiceFinish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Schedules",
                keyColumn: "Id",
                keyValue: new Guid("6aac5a8a-804c-4320-8864-c6cb6037d8a4"));

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: new Guid("c1d9d236-5b4b-45b1-b32f-afabd4380b41"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("dca886ee-0e60-4825-8022-e8645aefb0d7"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ServiceFinish",
                table: "Schedules",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "Id", "Description", "Duration", "IntervalDuration", "IsDeleted", "Name", "StartInterval" },
                values: new object[] { new Guid("eba30dae-de63-4c1d-a181-0c151c7b6b3d"), "Default Job Description", 60, 30, false, "Job Default", 0 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IsAdmin", "IsDeleted", "Name", "Observation", "Password", "Phone", "Sex" },
                values: new object[] { new Guid("7b7a7dcd-6602-4a22-9b2c-114e329b8f57"), "email@backend.com", false, false, "User Default", "GenericObservation", "GenericPassword", "99 999999999", 2 });

            migrationBuilder.InsertData(
                table: "Schedules",
                columns: new[] { "Id", "IsDeleted", "JobId", "ServiceDate", "ServiceFinish", "UserId" },
                values: new object[] { new Guid("efd9ed17-e11e-43c1-b1de-818f1fafea25"), false, new Guid("eba30dae-de63-4c1d-a181-0c151c7b6b3d"), new DateTime(2024, 6, 7, 22, 58, 33, 65, DateTimeKind.Local).AddTicks(3103), new DateTime(2024, 6, 7, 23, 28, 33, 65, DateTimeKind.Local).AddTicks(3117), new Guid("7b7a7dcd-6602-4a22-9b2c-114e329b8f57") });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Schedules",
                keyColumn: "Id",
                keyValue: new Guid("efd9ed17-e11e-43c1-b1de-818f1fafea25"));

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: new Guid("eba30dae-de63-4c1d-a181-0c151c7b6b3d"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7b7a7dcd-6602-4a22-9b2c-114e329b8f57"));

            migrationBuilder.DropColumn(
                name: "ServiceFinish",
                table: "Schedules");

            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "Id", "Description", "Duration", "IntervalDuration", "IsDeleted", "Name", "StartInterval" },
                values: new object[] { new Guid("c1d9d236-5b4b-45b1-b32f-afabd4380b41"), "Default Job Description", 60, 30, false, "Job Default", 0 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IsAdmin", "IsDeleted", "Name", "Observation", "Password", "Phone", "Sex" },
                values: new object[] { new Guid("dca886ee-0e60-4825-8022-e8645aefb0d7"), "email@backend.com", false, false, "User Default", "GenericObservation", "GenericPassword", "99 999999999", 2 });

            migrationBuilder.InsertData(
                table: "Schedules",
                columns: new[] { "Id", "IsDeleted", "JobId", "ServiceDate", "UserId" },
                values: new object[] { new Guid("6aac5a8a-804c-4320-8864-c6cb6037d8a4"), false, new Guid("c1d9d236-5b4b-45b1-b32f-afabd4380b41"), new DateTime(2024, 5, 18, 13, 10, 32, 183, DateTimeKind.Local).AddTicks(8944), new Guid("dca886ee-0e60-4825-8022-e8645aefb0d7") });
        }
    }
}
