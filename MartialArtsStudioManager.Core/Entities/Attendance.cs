using System;
using System.ComponentModel.DataAnnotations;

namespace MartialArtsStudioManager.Core.Entities;

public class Attendance
{
    public Guid Id { get; set; }

    [Required]
    public Guid StudentId { get; set; }
    public Student Student { get; set; } = null!;

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [MaxLength(50)]
    public string ClassType { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Notes { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
} 