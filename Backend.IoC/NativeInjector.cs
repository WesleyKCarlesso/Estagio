using Backend.Application.Interfaces;
using Backend.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.IoC
{
    public static class NativeInjector
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
        }
    }
}
