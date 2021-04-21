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
    public class productosController : ControllerBase
    {
        private readonly apliBaseDcontexto _context;

        public productosController(apliBaseDcontexto context)
        {
            _context = context;
        }

        // GET: api/productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<producto>>> Getproducto()
        {
            return await _context.producto.ToListAsync();
        }

        

       

        // POST: api/productos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<producto>> Postproducto(producto producto)
        {
            _context.producto.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getproducto", new { id = producto.codigo }, producto);
        }

       

        private bool productoExists(int id)
        {
            return _context.producto.Any(e => e.codigo == id);
        }
    }
}
