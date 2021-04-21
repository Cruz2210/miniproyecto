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
    public class pedidosController : ControllerBase
    {
        private readonly apliBaseDcontexto _context;

        public pedidosController(apliBaseDcontexto context)
        {
            _context = context;
        }

        // GET: api/pedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<pedido>>> Getpedido()
        {
            return await _context.pedido.ToListAsync();
        }

        



        // POST: api/pedidos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<pedido>> Postpedido(pedido pedido)
        {
            _context.pedido.Add(pedido);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getpedido", new { id = pedido.numero }, pedido);
        }

       

        private bool pedidoExists(int id)
        {
            return _context.pedido.Any(e => e.numero == id);
        }
    }
}
