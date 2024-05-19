using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Backend.Data.Extensions
{
    public static class ModelBuilderExtension
    {
        public static ModelBuilder SeedData(this ModelBuilder modelBuilder)
        {
            // Adicione a entidade Job como entidade de seed
            var defaultJob = new Job
            {
                Id = Guid.NewGuid(),
                Name = "Job Default",
                Description = "Default Job Description",
                Duration = 60,
                IntervalDuration = 30,
                StartInterval = 0
            };
            modelBuilder.Entity<Job>().HasData(defaultJob);

            // Adicione a entidade User como entidade de seed
            var defaultUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "User Default",
                Email = "email@backend.com",
                Password = "GenericPassword",
                Observation = "GenericObservation",
                IsAdmin = false,
                Sex = EnumSex.Other,
                Phone = "99 999999999"
            };
            modelBuilder.Entity<User>().HasData(defaultUser);

            // Adicione a entidade Schedule como entidade de seed
            var defaultSchedule = new Schedule
            {
                Id = Guid.NewGuid(),
                ServiceDate = DateTime.Now,
                JobId = defaultJob.Id,
                UserId = defaultUser.Id
            };
            modelBuilder.Entity<Schedule>().HasData(defaultSchedule);

            return modelBuilder;
        }
    }
}
