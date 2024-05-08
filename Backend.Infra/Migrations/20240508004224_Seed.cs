﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Jobs",
                columns: new[] { "Id", "Description", "Duration", "IntervalDuration", "IsDeleted", "Name", "StartInterval" },
                values: new object[] { new Guid("2698a901-205b-49ef-b1f2-0b0da19e2204"), "Default Job Description", 60, 30, false, "Job Default", 0 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IsAdmin", "IsDeleted", "Name", "Password", "Phone", "Sex" },
                values: new object[] { new Guid("d12eed0f-c2a7-4cf4-82ff-2e02db4ad1d3"), "email@backend.com", false, false, "User Default", "GenericPassword", "99 999999999", 2 });

            migrationBuilder.InsertData(
                table: "Schedules",
                columns: new[] { "Id", "IsDeleted", "JobId", "ServiceDate", "UserId" },
                values: new object[] { new Guid("eb2db68d-fa7e-4bf4-a5a3-a794b2b2c9be"), false, new Guid("2698a901-205b-49ef-b1f2-0b0da19e2204"), new DateTime(2024, 5, 7, 21, 42, 23, 776, DateTimeKind.Local).AddTicks(7487), new Guid("d12eed0f-c2a7-4cf4-82ff-2e02db4ad1d3") });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Schedules",
                keyColumn: "Id",
                keyValue: new Guid("eb2db68d-fa7e-4bf4-a5a3-a794b2b2c9be"));

            migrationBuilder.DeleteData(
                table: "Jobs",
                keyColumn: "Id",
                keyValue: new Guid("2698a901-205b-49ef-b1f2-0b0da19e2204"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d12eed0f-c2a7-4cf4-82ff-2e02db4ad1d3"));
        }
    }
}
