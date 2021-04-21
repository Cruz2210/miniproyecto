using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using examenFinal.Api.Entidades;
using examenFinal.Api.contexto;

namespace examenFinal.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class usuariosController : ControllerBase
    {
        private readonly apliBaseDcontexto _context;

        public usuariosController(apliBaseDcontexto context)
        {
            _context = context;
        }

        // GET: api/usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<usuario>>> Getusuario()
        {
            return await _context.usuario.ToListAsync();
        }



       

        // POST: api/usuarios
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<usuario>> Postusuario(usuario usuario)
        {
            _context.usuario.Add(usuario);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (usuarioExists(usuario.idUsuario))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Getusuario", new { id = usuario.idUsuario }, usuario);
        }

       

        private bool usuarioExists(string id)
        {
            return _context.usuario.Any(e => e.idUsuario == id);
        }
    }
}
