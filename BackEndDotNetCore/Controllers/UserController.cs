using GameLibrary.BackEndDotNetCore.DataModels;
using GameLibrary.BackEndDotNetCore.Database;
using GameLibrary.BackEndDotNetCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly GameLibraryDbContext _dbContext;
    private readonly IJwtService _jwtService;

    public UserController(
        ILogger<UserController> logger,
        GameLibraryDbContext dbContext,
        IJwtService jwtService)
    {
        _logger = logger;
        _dbContext = dbContext;
        _jwtService = jwtService;
    }

    private IActionResult ValidationProblemResponse()
    {
        var errors = ModelState
            .Where(kvp => kvp.Value != null && kvp.Value.Errors != null && kvp.Value.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
            );

        return BadRequest(new { message = "Validation failed", errors });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        if (!ModelState.IsValid)
            return ValidationProblemResponse();

        // Find user by email
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == req.Email);

        if (user == null)
            return Unauthorized(new { message = "Invalid credentials" });

        // Verify password using BCrypt
        var validPassword = BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash);
        if (!validPassword)
            return Unauthorized(new { message = "Invalid credentials" });

        // Generate JWT token
        var token = _jwtService.GenerateToken(user.Id, user.Email, user.Name);

        return Ok(new
        {
            token,
            user = new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email
            }
        });
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] SignUpRequest req)
    {
        if (!ModelState.IsValid)
            return ValidationProblemResponse();

        // Validate password length
        if (req.Password == null || req.Password.Length < 6)
        {
            ModelState.AddModelError("Password", "Password must be at least 6 characters");
            return ValidationProblemResponse();
        }

        // Check if email already exists
        var emailExists = await _dbContext.Users.AnyAsync(u => u.Email == req.Email);
        if (emailExists)
            return Conflict(new { message = "Email already in use", field = "Email" });

        // Hash password with BCrypt
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(req.Password);

        // Create new user
        var user = new User
        {
            Name = req.Name!,
            Email = req.Email!,
            PasswordHash = passwordHash
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        // Generate JWT token
        var token = _jwtService.GenerateToken(user.Id, user.Email, user.Name);

        // Return token immediately (auto-login after registration)
        return Created($"/user/{user.Id}", new
        {
            token,
            user = new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email
            }
        });
    }
}
