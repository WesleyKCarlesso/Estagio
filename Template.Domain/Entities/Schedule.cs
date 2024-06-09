using Backend.Domain.Models;

namespace Backend.Domain.Entities
{
    public class Schedule : Entity
    {
        public DateTime ServiceDate { get; set; }
        public DateTime ServiceFinish { get; set; }
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
        public Job Job { get; set; }
        public User User { get; set; }
    }
}
