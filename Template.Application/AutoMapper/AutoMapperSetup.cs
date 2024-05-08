using AutoMapper;
using Backend.Application.ViewModels;
using Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.AutoMapper
{
    public class AutoMapperSetup : Profile
    {
        public AutoMapperSetup() {
            #region ViewModelToDomain

            CreateMap<UserViewModel, User>();
            CreateMap<ScheduleViewModel, Schedule>();
            CreateMap<JobViewModel, Job>();

            #endregion

            #region DomainToViewModel

            CreateMap<User, UserViewModel>();
            CreateMap<Schedule, ScheduleViewModel>();
            CreateMap<Job, JobViewModel>();

            #endregion
        }
    }
}
