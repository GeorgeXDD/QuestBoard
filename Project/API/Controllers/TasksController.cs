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
    public class TasksController : ControllerBase
    {
        private readonly DataContext _context;
        public TasksController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppTask>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();

            return tasks;
        }
        [HttpGet("{id}")] // /api/task/1
        public async Task<ActionResult<AppTask>> GetTask(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }
        [HttpDelete("delete-task/{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            // Find the task by its ID in the database
            var taskToDelete = await _context.Tasks.FindAsync(id);

            if (taskToDelete == null)
            {
                // Task with the given ID not found
                return NotFound(new { Message = "Task not found" });
            }

            // Remove the task from the database
            _context.Tasks.Remove(taskToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Task deleted successfully" });
        }

    }
}
