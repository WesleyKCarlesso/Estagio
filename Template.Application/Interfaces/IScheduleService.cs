using Backend.Application.ViewModels;

namespace Backend.Application.Interfaces
{
    public interface IScheduleService
    {
        List<ScheduleViewModel> GetAll();
        void Create(ScheduleViewModel scheduleViewModel);
        ScheduleViewModel GetById(string id);
        void Update(ScheduleViewModel scheduleViewModel);
        void Delete(string id);
    }
}
