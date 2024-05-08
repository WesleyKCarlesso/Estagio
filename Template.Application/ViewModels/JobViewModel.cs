namespace Backend.Application.ViewModels
{
    public class JobViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string DurationString {  get; set; }
        public int Duration { get; set; }
        public int IntervalDuration { get; set; }
        public int StartInterval { get; set; }
    }
}
