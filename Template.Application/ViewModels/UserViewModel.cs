using Backend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Application.ViewModels
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public EnumSex Sex { get; set; }
        public string Phone { get; set; }
        public bool IsAdmin { get; set; }
        public List<ScheduleViewModel> Schedules { get; set; }
    }
}
