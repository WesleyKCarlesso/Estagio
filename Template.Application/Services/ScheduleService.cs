using AutoMapper;
using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly IScheduleRepository scheduleRepository;
        private readonly IMapper mapper;

        public ScheduleService(IScheduleRepository scheduleRepository, IMapper mapper)
        {
            this.scheduleRepository = scheduleRepository;
            this.mapper = mapper;
        }

        public List<ScheduleViewModel> GetAll()
        {
            IEnumerable<Schedule> schedules = scheduleRepository.GetAll();

            var schedulesViewModels = mapper.Map<List<ScheduleViewModel>>(schedules);

            return schedulesViewModels;
        }

        public void Create(ScheduleViewModel scheduleViewModel)
        {
            Schedule schedule = mapper.Map<Schedule>(scheduleViewModel);

            scheduleRepository.Create(schedule);
        }

        public ScheduleViewModel GetById(string id)
        {
            if (!Guid.TryParse(id, out Guid scheduleId))
                throw new Exception("ScheduleId is not valid!");

            Schedule schedule = scheduleRepository.Find(x => x.Id == scheduleId && !x.IsDeleted);

            if (schedule == null)
                throw new Exception("Schedule not found!");

            return mapper.Map<ScheduleViewModel>(schedule);
        }

        public void Update(ScheduleViewModel scheduleViewModel)
        {
            Schedule schedule = scheduleRepository.Find(x => x.Id == scheduleViewModel.Id && !x.IsDeleted);

            if (schedule == null)
                throw new Exception("Usuário não encontrado.");

            schedule = mapper.Map<Schedule>(scheduleViewModel);

            scheduleRepository.Update(schedule);
        }

        public void Delete(string id)
        {
            if (!Guid.TryParse(id, out Guid scheduleId))
                throw new Exception("ScheduleId is not valid!");

            Schedule schedule = scheduleRepository.Find(x => x.Id == scheduleId && !x.IsDeleted);

            if (schedule == null)
                throw new Exception("Schedule not found!");

            scheduleRepository.Delete(schedule);
        }
    }
}
