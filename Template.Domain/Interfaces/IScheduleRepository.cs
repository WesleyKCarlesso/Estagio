using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    public interface IScheduleRepository : IRepository<Schedule>
    {
        IEnumerable<Schedule> GetAll();
    }
}
