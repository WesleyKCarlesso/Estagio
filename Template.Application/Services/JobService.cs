using AutoMapper;
using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class JobService : IJobService
    {
        private readonly IJobRepository jobRepository;
        private readonly IMapper mapper;

        public JobService(IJobRepository jobRepository, IMapper mapper)
        {
            this.jobRepository = jobRepository;
            this.mapper = mapper;
        }

        public List<JobViewModel> GetAll()
        {
            IEnumerable<Job> jobs = jobRepository.GetAll();

            var jobsViewModels = mapper.Map<List<JobViewModel>>(jobs);

            return jobsViewModels;
        }
    }
}
