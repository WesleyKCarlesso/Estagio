﻿using AutoMapper;
using Backend.Application.Interfaces;
using Backend.Application.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UserService(IUserRepository userRepository, IMapper mapper) {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        public List<UserViewModel> GetAll()
        {
            IEnumerable<User> users = userRepository.GetAll();

            var usersViewModels = mapper.Map<List<UserViewModel>>(users);

            return usersViewModels;
        }

        public void Create(UserViewModel userViewModel)
        {
            User user = mapper.Map<User>(userViewModel);

            userRepository.Create(user);
        }

        public UserViewModel GetById(string id)
        {
            if (!Guid.TryParse(id, out Guid userId))
            {
                throw new Exception("UserId is not valid!");
            }

            User user = userRepository.Find(x => x.Id == userId && !x.IsDeleted);

            if (user == null)
            {
                throw new Exception("User not found!");
            }

            return mapper.Map<UserViewModel>(user);
        }

        public void Update(UserViewModel userViewModel)
        {
            User user = userRepository.Find(x => x.Id == userViewModel.Id && !x.IsDeleted);

            if (user == null)
            {
                throw new Exception("User not found!");
            }

            user = mapper.Map<User>(userViewModel);

            userRepository.Update(user);
        }
    }
}
