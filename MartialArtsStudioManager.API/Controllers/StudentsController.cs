using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MartialArtsStudioManager.API.Data;
using MartialArtsStudioManager.Core.Entities;
using MartialArtsStudioManager.API.Models;

namespace MartialArtsStudioManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly ApplicationDbContext context;
    private readonly ILogger<StudentsController> logger;

    public StudentsController(ApplicationDbContext context, ILogger<StudentsController> logger)
    {
        this.context = context;
        this.logger = logger;
    }

    // GET: api/Students
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        try
        {
            return await context.Students
                .Include(s => s.BeltRank)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving students");
            return StatusCode(500, "An error occurred while retrieving students");
        }
    }

    // GET: api/Students/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(Guid id)
    {
        try
        {
            var student = await context.Students
                .Include(s => s.BeltRank)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving student {StudentId}", id);
            return StatusCode(500, "An error occurred while retrieving the student");
        }
    }

    // POST: api/Students
    [HttpPost]
    public async Task<ActionResult<Student>> CreateStudent(CreateStudentDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var beltRank = await context.BeltRanks.FindAsync(dto.BeltRankId);
            if (beltRank == null)
            {
                return BadRequest("Invalid belt rank ID");
            }

            var student = new Student
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                DateOfBirth = dto.DateOfBirth,
                JoinDate = dto.JoinDate,
                BeltRankId = dto.BeltRankId,
                BeltRank = beltRank,
                IsActive = dto.IsActive,
                CreatedAt = DateTime.UtcNow
            };
            
            context.Students.Add(student);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating student");
            return StatusCode(500, "An error occurred while creating the student");
        }
    }

    // PUT: api/Students/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(Guid id, Student student)
    {
        try
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            student.UpdatedAt = DateTime.UtcNow;
            context.Entry(student).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating student {StudentId}", id);
            return StatusCode(500, "An error occurred while updating the student");
        }
    }

    // DELETE: api/Students/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(Guid id)
    {
        try
        {
            var student = await context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            context.Students.Remove(student);
            await context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting student {StudentId}", id);
            return StatusCode(500, "An error occurred while deleting the student");
        }
    }

    private bool StudentExists(Guid id)
    {
        return context.Students.Any(e => e.Id == id);
    }
} 