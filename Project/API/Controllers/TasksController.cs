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

        [HttpPost]
        public async Task<ActionResult<AppTask>> CreateTask(AppTask task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, AppTask updatedTask)
        {
            var existingTask = await _context.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                return NotFound(new { Message = "Task not found" });
            }

            existingTask.AssignedUserId = updatedTask.AssignedUserId;
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.State = updatedTask.State;

            await _context.SaveChangesAsync();

            return NoContent();
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
