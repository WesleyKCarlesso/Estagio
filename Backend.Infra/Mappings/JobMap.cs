using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class JobMap : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        builder.HasKey(j => j.Id); // Supondo que 'Id' seja a chave primária
        builder.Property(j => j.Name).IsRequired();
        builder.Property(j => j.Description).IsRequired();
        builder.Property(j => j.Duration).IsRequired();
        builder.Property(j => j.IntervalDuration).IsRequired();
        builder.Property(j => j.StartInterval).IsRequired();

        // Relacionamento com Schedule
        builder.HasMany(j => j.Schedules)
             .WithOne(s => s.Job)
             .HasForeignKey(s => s.JobId); // Supondo que 'JobId' seja a chave estrangeira na tabela Schedule
    }
}
