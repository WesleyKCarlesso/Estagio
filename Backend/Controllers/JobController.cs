using Backend.Application.Interfaces;
using Backend.Application.Services;
using Backend.Application.ViewModels;
using Estagio.Auth.Packages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpPost("Create")]
        public IActionResult Create(JobViewModel JobViewModel)
        {
            var Jobs = GetAll();

            if (Jobs != null && Jobs.Any(x => x.Description.ToLower() == JobViewModel.Description.ToLower()))
            {
                return BadRequest("Este serviço já está cadastrado no sistema.");
            }

            jobService.Create(JobViewModel);
            return Ok();
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(string id)
        {
            var Job = jobService.GetById(id);

            return Ok(Job);
        }

        [HttpPut("Update")]
        public IActionResult Update(JobViewModel JobViewModel)
        {
            try
            {
                jobService.Update(JobViewModel);
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
            jobService.Delete(id);
        }
    }
}
