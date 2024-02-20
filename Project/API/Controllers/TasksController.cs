using API.CQRS.CommandHandlers.Tasks;
using API.CQRS.Commands.Projects;
using API.CQRS.Commands.Tasks;
using API.CQRS.Queries.Projects;
using API.CQRS.Queries.Tasks;
using API.CQRS.QueryHandlers.Projects;
using API.CQRS.QueryHandlers.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly GetAllTasksQueryHandler _getAllTasksHandler;
        private readonly CreateTaskCommandHandler _createTaskHandler;
        private readonly UpdateTaskCommandHandler _updateTaskHandler;
        private readonly DeleteTaskCommandHandler _deleteTaskHandler;
        public TasksController(DataContext context, GetAllTasksQueryHandler getAllTasksQueryHandler, CreateTaskCommandHandler createTaskHandler, 
            UpdateTaskCommandHandler updateTaskHandler, DeleteTaskCommandHandler deleteTaskHandler)
        {
            _context = context;
            _getAllTasksHandler = getAllTasksQueryHandler;
            _createTaskHandler = createTaskHandler;
            _updateTaskHandler = updateTaskHandler;
            _deleteTaskHandler = deleteTaskHandler;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppTask>>> GetTasks()
        {
            var query = new GetAllTasksQuery();
            var tasks = await _getAllTasksHandler.Handle(query);

            return Ok(tasks);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<AppTask>> GetTask(int id)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<AppTask>> CreateTask(CreateTaskCommand command)
        {
            var task = await _createTaskHandler.Handle(command);

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskCommand command)
        {
            command.Id = id;

            if (id != command.Id)
            {
                return BadRequest(new { Message = "ID mismatch" });
            }

            var success = await _updateTaskHandler.Handle(command);

            return NoContent();
        }

        [HttpDelete("delete-task/{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var command = new DeleteTaskCommand(id);
            var success = await _deleteTaskHandler.Handle(command);

            if (!success)
            {
                return NotFound(new { Message = "Project does not exist" });
            }

            return Ok(new { Message = "Project deleted successfully" });
        }


        // OLD IMPLEMENTATION WITHOUT CQRS


        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<AppTask>>> GetTasks()
        //{
        //    var tasks = await _context.Tasks.ToListAsync();

        //    return tasks;
        //}


        //[HttpGet("{id}")]
        //public async Task<ActionResult<AppTask>> GetTask(int id)
        //{
        //    return await _context.Tasks.FindAsync(id);
        //}

        //[HttpPost]
        //public async Task<ActionResult<AppTask>> CreateTask(AppTask task)
        //{
        //    _context.Tasks.Add(task);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTask", new { id = task.Id }, task);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateTask(int id, AppTask updatedTask)
        //{
        //    var existingTask = await _context.Tasks.FindAsync(id);

        //    if (existingTask == null)
        //    {
        //        return NotFound(new { Message = "Task not found" });
        //    }

        //    existingTask.AssignedUserId = updatedTask.AssignedUserId;
        //    existingTask.Title = updatedTask.Title;
        //    existingTask.Description = updatedTask.Description;
        //    existingTask.State = updatedTask.State;

        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}


        //[HttpDelete("delete-task/{id}")]
        //public async Task<IActionResult> DeleteTask(int id)
        //{
        //    var taskToDelete = await _context.Tasks.FindAsync(id);

        //    if (taskToDelete == null)
        //    {
        //        return NotFound(new { Message = "Task not found" });
        //    }

        //    _context.Tasks.Remove(taskToDelete);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { Message = "Task deleted successfully" });
        //}

    }
}
