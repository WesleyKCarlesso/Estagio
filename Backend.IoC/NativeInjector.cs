using Backend.Application.Interfaces;
using Backend.Application.Services;
using Backend.Data.Repositories;
using Backend.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.IoC
{
    public static class NativeInjector
    {
        public static void RegisterServices(IServiceCollection services)
        {
            #region Services

            services.AddScoped<IUserService, UserService>();

            #endregion

            #region Repositories

            services.AddScoped<IUserRepository, UserRepository>();

            #endregion
        }
    }
}
