using Backend.Domain.Entities;
using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Extensions
{
    public static class ModelBuilderExtension
    {
        public static ModelBuilder SeedData(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasData(
                    new User { Id = Guid.NewGuid(), Name = "User Default", Email = "email@backend.com", IsDeleted = false, Password = "GenericPassword", IsAdmin = false }
                );

            return modelBuilder;
        }
    }
}
