using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id); // Supondo que 'Id' seja a chave primária
        builder.Property(u => u.Name).IsRequired();
        builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
        builder.Property(u => u.Password).IsRequired().HasMaxLength(100);
        builder.Property(u => u.Observation).IsRequired();
        builder.Property(u => u.IsAdmin).IsRequired();
        builder.Property(u => u.Sex).IsRequired();
        builder.Property(u => u.Phone).IsRequired().HasMaxLength(15);

        // Relacionamento com Schedule
        builder.HasMany(u => u.Schedules)
             .WithOne(s => s.User)
             .HasForeignKey(s => s.UserId); // Supondo que 'UserId' seja a chave estrangeira na tabela Schedule
    }
}
