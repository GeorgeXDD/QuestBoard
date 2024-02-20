using API.CQRS.CommandHandlers.Projects;
using API.CQRS.Commands.Projects;
using API.CQRS.Queries.Projects;
using API.CQRS.QueryHandlers.Projects;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly GetAllProjectsQueryHandler _getAllProjectsHandler;
        private readonly CreateProjectCommandHandler _createProjectHandler;
        private readonly UpdateProjectCommandHandler _updateProjectHandler;
        private readonly DeleteProjectCommandHandler _deleteProjectHandler;

        public ProjectsController(DataContext context, CreateProjectCommandHandler createProjectHandler, GetAllProjectsQueryHandler getAllProjectsHandler, 
            UpdateProjectCommandHandler updateProjectHandler, DeleteProjectCommandHandler deleteProjectHandler)
        {
            _context = context;
            _getAllProjectsHandler = getAllProjectsHandler;
            _createProjectHandler = createProjectHandler;
            _updateProjectHandler = updateProjectHandler;
            _deleteProjectHandler = deleteProjectHandler;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var query = new GetAllProjectsQuery();
            var projects = await _getAllProjectsHandler.Handle(query);

            return Ok(projects);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            return await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(CreateProjectCommand command)
        {
            var project = await _createProjectHandler.Handle(command);

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, UpdateProjectCommand command)
        {
            command.Id = id;

            if (id != command.Id)
            {
                return BadRequest(new { Message = "ID mismatch" });
            }

            var success = await _updateProjectHandler.Handle(command);

            return NoContent();

        }

        [HttpDelete("delete-project/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var command = new DeleteProjectCommand(id);
            var success = await _deleteProjectHandler.Handle(command);

            if (!success)
            {
                return NotFound(new { Message = "Project does not exist" });
            }

            return Ok(new { Message = "Project deleted successfully" });
        }



        // OLD IMPLEMENTATION WITHOUT CQRS

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        //{
        //    var projects = await _context.Projects
        //        .Include(p => p.Tasks)
        //        .ToListAsync();

        //    return projects;
        //}


        //[HttpPost]
        //public async Task<ActionResult<Project>> CreateProject(Project project)
        //{
        //    _context.Projects.Add(project);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProject", new { id = project.Id }, project);
        //}


        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateProject(int id, Project updatedProject)
        //{
        //    var existingProject = await _context.Projects.FindAsync(id);

        //    if (existingProject == null)
        //    {
        //        return NotFound(new { Message = "Project not found" });
        //    }

        //    existingProject.Title = updatedProject.Title;
        //    existingProject.Description = updatedProject.Description;
        //    existingProject.Tasks = updatedProject.Tasks;

        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //[HttpDelete("delete-project/{id}")]
        //public async Task<IActionResult> DeleteProject(int id)
        //{
        //    var projectToDelete = await _context.Projects.FindAsync(id);

        //    if (projectToDelete == null)
        //    {
        //        return NotFound(new { Message = "Project does not exist" });
        //    }

        //    _context.Projects.Remove(projectToDelete);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { Message = "Project deleted successfully" });
        //}
    }
}
