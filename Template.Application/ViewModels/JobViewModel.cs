using System.Text.Json.Serialization;

namespace Backend.Application.ViewModels
{
    public class JobViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public int IntervalDuration { get; set; }
        public int StartInterval { get; set; }
    }
}
