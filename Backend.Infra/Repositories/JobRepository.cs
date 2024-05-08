using Backend.Data.Context;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Data.Repositories
{
    public class JobRepository : Repository<Job>, IJobRepository
    {
        public JobRepository(BackendContext context)
            : base(context) { }

        public IEnumerable<Job> GetAll()
        {
            return Query(x => !x.IsDeleted);
        }
    }
}
