using Backend.Data.Extensions;
using Backend.Data.Mappings;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Context
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> option)
            : base(option) { }

        #region "DBSets"

        public DbSet<User> Users { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMap());

            modelBuilder.SeedData();

            base.OnModelCreating(modelBuilder);
        }
    }
}
