using Backend.Application.ViewModels;

namespace Backend.Application.Interfaces
{
    public interface IJobService
    {
        List<JobViewModel> GetAll();
    }
}
