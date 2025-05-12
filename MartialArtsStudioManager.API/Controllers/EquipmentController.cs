using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MartialArtsStudioManager.API.Data;
using MartialArtsStudioManager.Core.Entities;

namespace MartialArtsStudioManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EquipmentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EquipmentController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Equipment
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Equipment>>> GetEquipment()
    {
        return await _context.Equipment.ToListAsync();
    }

    // GET: api/Equipment/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Equipment>> GetEquipmentItem(Guid id)
    {
        var equipment = await _context.Equipment.FindAsync(id);

        if (equipment == null)
        {
            return NotFound();
        }

        return equipment;
    }

    // POST: api/Equipment
    [HttpPost]
    public async Task<ActionResult<Equipment>> CreateEquipment(Equipment equipment)
    {
        equipment.Id = Guid.NewGuid();
        equipment.CreatedAt = DateTime.UtcNow;
        
        _context.Equipment.Add(equipment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEquipmentItem), new { id = equipment.Id }, equipment);
    }

    // PUT: api/Equipment/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEquipment(Guid id, Equipment equipment)
    {
        if (id != equipment.Id)
        {
            return BadRequest();
        }

        equipment.UpdatedAt = DateTime.UtcNow;
        _context.Entry(equipment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EquipmentExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/Equipment/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEquipment(Guid id)
    {
        var equipment = await _context.Equipment.FindAsync(id);
        if (equipment == null)
        {
            return NotFound();
        }

        _context.Equipment.Remove(equipment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EquipmentExists(Guid id)
    {
        return _context.Equipment.Any(e => e.Id == id);
    }
} 