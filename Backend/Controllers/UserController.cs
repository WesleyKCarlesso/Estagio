using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var users = userService.GetAll();

            return Ok(users);
        }

        [HttpPost("Create")]
        public void Create(UserViewModel userViewModel)
        {
            userService.Create(userViewModel);
        }
    }
}
