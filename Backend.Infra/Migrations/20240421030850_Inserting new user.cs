using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class Insertingnewuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name" },
                values: new object[] { new Guid("de2eb6d0-6329-4a42-bb97-b50cfecd2c7d"), "email@backend.com", "User Default" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("de2eb6d0-6329-4a42-bb97-b50cfecd2c7d"));
        }
    }
}
