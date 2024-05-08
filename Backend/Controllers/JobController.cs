using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class JobController : ControllerBase
    {
        private readonly IJobService jobService;

        public JobController(IJobService jobService)
        {
            this.jobService = jobService;
        }

        [HttpGet("GetAll")]
        public List<JobViewModel> GetAll()
        {
            var jobs = jobService.GetAll();

            return jobs;
        }
    }
}
