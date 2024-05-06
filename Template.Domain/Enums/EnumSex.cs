using System.ComponentModel;

namespace Backend.Domain.Enums
{
    public enum EnumSex
    {
        [Description("Masculino")]
        Male,
        [Description("Feminino")]
        Female,
        [Description("Outro")]
        Other
    }
}
