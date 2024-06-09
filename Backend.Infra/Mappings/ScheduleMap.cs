using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ScheduleMap : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.HasKey(s => s.Id); // Supondo que 'Id' seja a chave primária
        builder.Property(s => s.ServiceDate).IsRequired();
        builder.Property(s => s.ServiceFinish).IsRequired();

        // Relacionamento com User e Job
        builder.HasOne(s => s.User)
             .WithMany(u => u.Schedules)
             .HasForeignKey(s => s.UserId); // Supondo que 'UserId' seja a chave estrangeira na tabela Schedule

        builder.HasOne(s => s.Job)
             .WithMany(j => j.Schedules)
             .HasForeignKey(s => s.JobId); // Supondo que 'JobId' seja a chave estrangeira na tabela Schedule
    }
}
