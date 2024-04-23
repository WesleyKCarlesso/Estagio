using Backend.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Interfaces
{
    public interface IUserService
    {
        List<UserViewModel> GetAll();
        void Create(UserViewModel userViewModel);
        UserViewModel GetById(string id);
        void Update(UserViewModel userViewModel);
        void Delete(string id);
        UserAuthenticateResponseViewModel Authenticate(UserAuthenticateRequestViewModel user);
    }
}
