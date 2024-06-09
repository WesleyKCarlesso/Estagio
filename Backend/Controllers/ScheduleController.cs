using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Estagio.Auth.Packages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService scheduleService;
        private readonly IJobService jobService;

        public ScheduleController(IScheduleService scheduleService, IJobService jobService)
        {
            this.scheduleService = scheduleService;
            this.jobService = jobService;
        }

        [HttpGet("GetAll")]
        public List<ScheduleViewModel> GetAll()
        {
            var schedules = scheduleService.GetAll();

            var jobs = jobService.GetAll();

            schedules.ForEach(x =>
            {
                var job = jobs.Where(y => y.Id == x.JobId).FirstOrDefault();

                x.ServiceFinish = x.ServiceDate.AddMinutes(job.Duration);
            });

            return schedules;
        }

        [HttpPost("Create"), AllowAnonymous]
        public IActionResult Create(ScheduleViewModel scheduleViewModel)
        {
            var schedules = GetAll();

            var job = jobService.GetById(scheduleViewModel.JobId.ToString());

            scheduleViewModel.ServiceDate = scheduleViewModel.ServiceDate.ToLocalTime();
            scheduleViewModel.ServiceFinish = scheduleViewModel.ServiceFinish.ToLocalTime().AddMinutes(job.Duration);

            scheduleService.Create(scheduleViewModel);
            return Ok();
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(string id)
        {
            var schedule = scheduleService.GetById(id);

            return Ok(schedule);
        }

        [HttpPut("Update")]
        public IActionResult Update(ScheduleViewModel scheduleViewModel)
        {
            scheduleViewModel.ServiceDate = scheduleViewModel.ServiceDate.ToLocalTime();
            scheduleViewModel.ServiceFinish = scheduleViewModel.ServiceFinish.ToLocalTime();

            try
            {
                scheduleService.Update(scheduleViewModel);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("HasTimeConflict")]
        public bool HasTimeConflict(ScheduleViewModel scheduleViewModel)
        {
            return scheduleService.HasTimeConflict(scheduleViewModel);
        }

        [HttpDelete("Delete/{id}")]
        public void Delete(string id)
        {
            scheduleService.Delete(id);
        }
    }
}
