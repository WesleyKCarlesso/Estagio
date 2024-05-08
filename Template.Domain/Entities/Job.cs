using Backend.Domain.Models;

namespace Backend.Domain.Entities
{
    public class Job : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string DurationString
        {
            get
            {
                TimeSpan durationTimeSpan = TimeSpan.FromMinutes(Duration);
                return $"{(int)durationTimeSpan.TotalHours:D2}:{durationTimeSpan.Minutes:D2}:{durationTimeSpan.Seconds:D2}";
            }
        }
        public int Duration { get; set; } // minutos
        public int IntervalDuration { get; set; }
        public int StartInterval { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
