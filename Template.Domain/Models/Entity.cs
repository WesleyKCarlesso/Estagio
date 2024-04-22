using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Domain.Models
{
    public class Entity
    {
        public Guid Id { get; set; }

        public bool IsDeleted { get; set; }
    }
}
