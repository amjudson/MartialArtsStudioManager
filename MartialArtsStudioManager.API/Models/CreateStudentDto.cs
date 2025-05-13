using System.ComponentModel.DataAnnotations;

namespace MartialArtsStudioManager.API.Models;

public class CreateStudentDto
{
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public DateTime JoinDate { get; set; }

    [Required]
    public int BeltRankId { get; set; }

    [Required]
    public bool IsActive { get; set; }
} 