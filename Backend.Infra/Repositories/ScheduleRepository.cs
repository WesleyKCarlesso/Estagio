using Backend.Data.Context;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repositories
{
    public class ScheduleRepository : Repository<Schedule>, IScheduleRepository
    {
        public ScheduleRepository(BackendContext context)
            : base(context) { }

        public IEnumerable<Schedule> GetAll()
        {
            return Query(x => !x.IsDeleted)
                .Include(x => x.Job)
                .Include(x => x.User);
        }
    }
}
