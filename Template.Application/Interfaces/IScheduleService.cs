using Backend.Application.ViewModels;

namespace Backend.Application.Interfaces
{
    public interface IScheduleService
    {
        List<ScheduleViewModel> GetAll();
    }
}
