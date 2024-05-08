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

        public void Create(JobViewModel jobViewModel)
        {
            Job job = mapper.Map<Job>(jobViewModel);

            jobRepository.Create(job);
        }

        public JobViewModel GetById(string id)
        {
            if (!Guid.TryParse(id, out Guid jobId))
                throw new Exception("JobId is not valid!");

            Job job = jobRepository.Find(x => x.Id == jobId && !x.IsDeleted);

            if (job == null)
                throw new Exception("Job not found!");

            return mapper.Map<JobViewModel>(job);
        }

        public void Update(JobViewModel jobViewModel)
        {
            Job job = jobRepository.Find(x => x.Id == jobViewModel.Id && !x.IsDeleted);

            if (job == null)
                throw new Exception("Usuário não encontrado.");

            job = mapper.Map<Job>(jobViewModel);

            jobRepository.Update(job);
        }

        public void Delete(string id)
        {
            if (!Guid.TryParse(id, out Guid jobId))
                throw new Exception("JobId is not valid!");

            Job job = jobRepository.Find(x => x.Id == jobId && !x.IsDeleted);

            if (job == null)
                throw new Exception("Job not found!");

            jobRepository.Delete(job);
        }
    }
}
