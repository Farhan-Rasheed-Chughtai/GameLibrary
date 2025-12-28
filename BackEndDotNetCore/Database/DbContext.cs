using Microsoft.EntityFrameworkCore;

namespace GameLibrary.BackEndDotNetCore.Database
{
    public class GameLibraryDbContext : DbContext
    {
        public GameLibraryDbContext(DbContextOptions<GameLibraryDbContext> options)
            : base(options)
        {
        }

        // Example DbSet properties
        public DbSet<Game> Games { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)   // Creates an index on Email
            .IsUnique();              // Makes the index enforce uniqueness

        }
    }
}