using Backend.Domain.Enums;
using Backend.Domain.Models;

namespace Backend.Domain.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public EnumSex Sex { get; set; }
        public string Phone { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
