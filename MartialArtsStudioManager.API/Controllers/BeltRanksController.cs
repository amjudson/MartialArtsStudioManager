using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MartialArtsStudioManager.API.Data;
using MartialArtsStudioManager.Core.Entities;

namespace MartialArtsStudioManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BeltRanksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BeltRanksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BeltRank>>> GetBeltRanks()
    {
        return await _context.BeltRanks
            .OrderBy(b => b.Order)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BeltRank>> GetBeltRank(int id)
    {
        var beltRank = await _context.BeltRanks.FindAsync(id);

        if (beltRank == null)
        {
            return NotFound();
        }

        return beltRank;
    }

    [HttpPost]
    public async Task<ActionResult<BeltRank>> CreateBeltRank(BeltRank beltRank)
    {
        beltRank.CreatedAt = DateTime.UtcNow;
        _context.BeltRanks.Add(beltRank);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBeltRank), new { id = beltRank.Id }, beltRank);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBeltRank(int id, BeltRank beltRank)
    {
        if (id != beltRank.Id)
        {
            return BadRequest();
        }

        beltRank.UpdatedAt = DateTime.UtcNow;
        _context.Entry(beltRank).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BeltRankExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBeltRank(int id)
    {
        var beltRank = await _context.BeltRanks.FindAsync(id);
        if (beltRank == null)
        {
            return NotFound();
        }

        _context.BeltRanks.Remove(beltRank);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BeltRankExists(int id)
    {
        return _context.BeltRanks.Any(e => e.Id == id);
    }
} 