public class Game
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public required string Genre { get; set; }
    public ICollection<User> Users { get; set; } = new List<User>();
}