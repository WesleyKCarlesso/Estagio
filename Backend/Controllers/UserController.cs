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
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetAll")]
        public List<UserViewModel> GetAll()
        {
            var users = userService.GetAll();

            return users;
        }

        [HttpPost("Create"), AllowAnonymous]
        public IActionResult Create(UserViewModel userViewModel)
        {
            var users = GetAll();

            if (users != null && users.Any(x => x.Email.ToLower() == userViewModel.Email.ToLower())) {
                return BadRequest("Este email já está cadastrado no sistema.");
            }

            userService.Create(userViewModel);
            return Ok();
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(string id)
        {
            var user = userService.GetById(id);

            return Ok(user);
        }

        [HttpPut("Update")]
        public IActionResult Update(UserViewModel userViewModel)
        {
            try
            {
                string id = TokenService.GetValueFromClaim(HttpContext.User.Identity, ClaimTypes.NameIdentifier);

                userViewModel.Id = new Guid(id);

                userService.Update(userViewModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete")]
        public void Delete()
        {
            string id = TokenService.GetValueFromClaim(HttpContext.User.Identity, ClaimTypes.NameIdentifier);
            userService.Delete(id);
        }

        [HttpPut("UpdateObservation")]
        public IActionResult UpdateObservation(string userId, string observation)
        {
            var user = userService.GetById(userId);
            
            user.Observation = observation;

            userService.Update(user);
            return Ok();
        }

        [HttpPost("Authenticate"), AllowAnonymous]
        public IActionResult Authenticate(UserAuthenticateRequestViewModel userViewModel)
        {
            try
            {
                var response = userService.Authenticate(userViewModel);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
