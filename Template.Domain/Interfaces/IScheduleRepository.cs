using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    public interface IScheduleRepository
    {
        IEnumerable<Schedule> GetAll();
    }
}
