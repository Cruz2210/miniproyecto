using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace examenFinal.Api.Entidades
{
    public class usuario
    {
        [Key]
        public string idUsuario { get; set; }
        public string contraseña { get; set; }
        public string tipoUsuario { get; set; }

    }
}
