using System;
using System.ComponentModel.DataAnnotations;

namespace MartialArtsStudioManager.Core.Entities;

public class Sale
{
    public Guid Id { get; set; }

    [Required]
    public Guid ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public Guid? StudentId { get; set; }
    public Student? Student { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public decimal UnitPrice { get; set; }

    [Required]
    public decimal TotalPrice { get; set; }

    [Required]
    public DateTime SaleDate { get; set; }

    [MaxLength(500)]
    public string Notes { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
} 