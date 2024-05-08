using Backend.Application.ViewModels;

namespace Backend.Application.Interfaces
{
    public interface IJobService
    {
        List<JobViewModel> GetAll();
        void Create(JobViewModel jobViewModel);
        JobViewModel GetById(string id);
        void Update(JobViewModel jobViewModel);
        void Delete(string id);
    }
}
