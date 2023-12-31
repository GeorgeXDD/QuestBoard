﻿using API.Data;
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
            var users = await _context.Users.ToListAsync();

            return users;
        }

        [HttpGet("{id}")] // /api/users/1
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
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


    }
}
