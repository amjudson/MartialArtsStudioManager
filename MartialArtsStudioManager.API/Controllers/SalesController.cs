using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MartialArtsStudioManager.API.Data;
using MartialArtsStudioManager.Core.Entities;

namespace MartialArtsStudioManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SalesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Sales
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
    {
        return await _context.Sales
            .Include(s => s.Item)
            .Include(s => s.Student)
            .ToListAsync();
    }

    // GET: api/Sales/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Sale>> GetSale(Guid id)
    {
        var sale = await _context.Sales
            .Include(s => s.Item)
            .Include(s => s.Student)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (sale == null)
        {
            return NotFound();
        }

        return sale;
    }

    // GET: api/Sales/student/5
    [HttpGet("student/{studentId}")]
    public async Task<ActionResult<IEnumerable<Sale>>> GetStudentSales(Guid studentId)
    {
        return await _context.Sales
            .Include(s => s.Item)
            .Where(s => s.StudentId == studentId)
            .ToListAsync();
    }

    // POST: api/Sales
    [HttpPost]
    public async Task<ActionResult<Sale>> CreateSale(Sale sale)
    {
        var item = await _context.Items.FindAsync(sale.ItemId);
        if (item == null)
        {
            return BadRequest("Item not found");
        }

        if (item.StockQuantity < sale.Quantity)
        {
            return BadRequest("Insufficient stock");
        }

        if (sale.StudentId.HasValue)
        {
            var student = await _context.Students.FindAsync(sale.StudentId.Value);
            if (student == null)
            {
                return BadRequest("Student not found");
            }
        }

        sale.Id = Guid.NewGuid();
        sale.SaleDate = DateTime.UtcNow;
        sale.UnitPrice = item.Price;
        sale.TotalPrice = item.Price * sale.Quantity;
        sale.CreatedAt = DateTime.UtcNow;

        // Update item stock
        item.StockQuantity -= sale.Quantity;
        _context.Entry(item).State = EntityState.Modified;

        _context.Sales.Add(sale);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSale), new { id = sale.Id }, sale);
    }

    // PUT: api/Sales/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSale(Guid id, Sale sale)
    {
        if (id != sale.Id)
        {
            return BadRequest();
        }

        var existingSale = await _context.Sales
            .Include(s => s.Item)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (existingSale == null)
        {
            return NotFound();
        }

        // If quantity changed, update stock
        if (existingSale.Quantity != sale.Quantity)
        {
            var item = existingSale.Item;
            var quantityDifference = existingSale.Quantity - sale.Quantity;
            item.StockQuantity += quantityDifference;

            if (item.StockQuantity < 0)
            {
                return BadRequest("Insufficient stock for this update");
            }

            _context.Entry(item).State = EntityState.Modified;
        }

        sale.UpdatedAt = DateTime.UtcNow;
        _context.Entry(sale).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SaleExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/Sales/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSale(Guid id)
    {
        var sale = await _context.Sales
            .Include(s => s.Item)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (sale == null)
        {
            return NotFound();
        }

        // Restore item stock
        var item = sale.Item;
        item.StockQuantity += sale.Quantity;
        _context.Entry(item).State = EntityState.Modified;

        _context.Sales.Remove(sale);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SaleExists(Guid id)
    {
        return _context.Sales.Any(e => e.Id == id);
    }
} 