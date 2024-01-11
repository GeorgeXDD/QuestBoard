using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //test api commit

    [Route("api/[controller]")] // /api/user
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Tasks)
                .ToListAsync();

            return users;
        }

        [HttpGet("{id}")] // /api/users/1
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Tasks)
                .SingleOrDefaultAsync(p => p.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Use your DbContext to query the Users table
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == request.Username && u.Password == request.Password);

            if (user != null)
            {
                return Ok(user);
            }
            return Unauthorized(new { Message = "Invalid credentials" });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {   
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.Username);
            if (existingUser != null)
            {
                return BadRequest(new { Message = "Username already exists" });
            }


            var newUser = new AppUser
            {
                UserName = request.Username,
                Password = request.Password,
                Email=request.Email
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }


    }
}
