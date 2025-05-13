using MartialArtsStudioManager.Core.Entities;

namespace MartialArtsStudioManager.API.Data;

public static class DbInitializer
{
    public static async Task Initialize(ApplicationDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // Seed Belt Ranks if none exist
        if (!context.BeltRanks.Any())
        {
            var beltRanks = new List<BeltRank>
            {
                new BeltRank
                {
                    Name = "White",
                    Description = "Beginning level",
                    Order = 1,
                    CreatedAt = DateTime.UtcNow
                },
                new BeltRank
                {
                    Name = "Yellow",
                    Description = "Intermediate level",
                    Order = 2,
                    CreatedAt = DateTime.UtcNow
                },
                new BeltRank
                {
                    Name = "Green",
                    Description = "Advanced level",
                    Order = 3,
                    CreatedAt = DateTime.UtcNow
                },
                new BeltRank
                {
                    Name = "Brown",
                    Description = "Expert level",
                    Order = 4,
                    CreatedAt = DateTime.UtcNow
                },
                new BeltRank
                {
                    Name = "Black",
                    Description = "Master level",
                    Order = 5,
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.BeltRanks.AddRangeAsync(beltRanks);
            await context.SaveChangesAsync();
        }
    }
} 