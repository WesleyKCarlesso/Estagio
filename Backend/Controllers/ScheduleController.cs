using Backend.Application.Interfaces;
using Backend.Application.Services;
using Backend.Application.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class ScheduleController
    {
        private readonly IScheduleService scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            this.scheduleService = scheduleService;
        }

        [HttpGet("GetAll")]
        public List<ScheduleViewModel> GetAll()
        {
            var schedules = scheduleService.GetAll();

            return schedules;
        }
    }
}
