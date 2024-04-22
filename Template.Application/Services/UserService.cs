using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public List<UserViewModel> Get()
        {
            IEnumerable<User> users = userRepository.GetAll();

            List<UserViewModel> usersViewModel = users.Select(x => new UserViewModel() { Id = x.Id, Name = x.Name, Email = x.Email }).ToList();

            return usersViewModel;
        }
    }
}
