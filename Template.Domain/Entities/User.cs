using Backend.Domain.Models;

namespace Backend.Domain.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
