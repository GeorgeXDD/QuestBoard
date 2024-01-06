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
    public class ProjectsController : ControllerBase
    {
        private readonly DataContext _context;
        public ProjectsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();

            return projects;
        }
        [HttpGet("{id}")] // /api/users/1
        public async Task<ActionResult<AppUser>> GetProject(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
