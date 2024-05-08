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
    }
}
