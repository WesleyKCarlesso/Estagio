namespace Backend.Application.ViewModels
{
    public class ScheduleViewModel
    {
        public DateTime ServiceDate { get; set; }
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
        public UserViewModel User { get; set; }
        public JobViewModel Job { get; set; }
    }
}
