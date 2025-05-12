using System;
using System.ComponentModel.DataAnnotations;

namespace MartialArtsStudioManager.Core.Entities;

public class Equipment
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public int Quantity { get; set; }

    [Required]
    [MaxLength(50)]
    public string Condition { get; set; } = string.Empty;

    public bool IsAvailable { get; set; }

    [Required]
    [Range(0, double.MaxValue)]
    public decimal PurchasePrice { get; set; }

    public DateTime PurchaseDate { get; set; }
    public DateTime? LastMaintenanceDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
} 