using System.Text.Json.Serialization;

namespace Backend.Application.ViewModels
{
    public class ScheduleViewModel
    {
        public Guid Id { get; set; }
        public DateTime ServiceDate { get; set; }
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
        [JsonIgnore]
        public UserViewModel User { get; set; }
        [JsonIgnore]
        public JobViewModel Job { get; set; }
    }
}
