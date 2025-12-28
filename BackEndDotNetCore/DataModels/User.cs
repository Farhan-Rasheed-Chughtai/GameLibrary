public class User
{
    public long Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string PasswordHash { get; set; }

    public ICollection<Game> Games { get; set; } = new List<Game>();
}