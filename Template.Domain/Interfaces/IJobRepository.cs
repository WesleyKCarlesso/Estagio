using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    public interface IJobRepository : IRepository<Job>
    {
        IEnumerable<Job> GetAll();
    }
}
