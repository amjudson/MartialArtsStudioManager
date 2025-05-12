using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MartialArtsStudioManager.Core.Entities;

public class BeltRank
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public int Order { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public ICollection<Student> Students { get; set; } = new List<Student>();
} 