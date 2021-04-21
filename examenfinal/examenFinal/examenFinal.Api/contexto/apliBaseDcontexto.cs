using examenFinal.Api.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examenFinal.Api.contexto
{
    public class apliBaseDcontexto: DbContext
    {
        public apliBaseDcontexto(DbContextOptions<apliBaseDcontexto> opciones):base(opciones)
        {

        }

        public DbSet<producto>producto { get; set; }
        public DbSet<pedido> pedido { get; set; }

        public DbSet<usuario> usuario { get; set; }
    }
}
