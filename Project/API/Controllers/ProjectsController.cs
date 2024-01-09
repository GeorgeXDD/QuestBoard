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

        [HttpGet("{id}")] // /api/project/1
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project updatedProject)
        {
            var existingProject = await _context.Projects.FindAsync(id);

            if (existingProject == null)
            {
                return NotFound(new { Message = "Project not found" });
            }

            existingProject.title = updatedProject.title;
            existingProject.description = updatedProject.description;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("delete-project/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            // Find the task by its ID in the database
            var projectToDelete = await _context.Projects.FindAsync(id);

            if (projectToDelete == null)
            {
                // Task with the given ID not found
                return NotFound(new { Message = "Project does not exist" });
            }

            // Remove the task from the database
            _context.Projects.Remove(projectToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Project deleted successfully" });
        }
    }
}
