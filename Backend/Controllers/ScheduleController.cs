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

        [HttpPost("Create"), AllowAnonymous]
        public IActionResult Create(ScheduleViewModel scheduleViewModel)
        {
            var schedules = GetAll();

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

        [HttpDelete("Delete")]
        public void Delete(string id)
        {
            scheduleService.Delete(id);
        }
    }
}
