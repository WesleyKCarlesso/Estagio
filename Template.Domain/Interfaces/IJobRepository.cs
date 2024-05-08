using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    public interface IJobRepository
    {
        IEnumerable<Job> GetAll();
    }
}
