using API.CQRS.Commands.Projects;
using API.Data;
using API.Entities;

namespace API.CQRS.CommandHandlers.Projects
{
    public class CreateProjectCommandHandler
    {
        private readonly DataContext _context;

        public CreateProjectCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Project> Handle(CreateProjectCommand command)
        {
            var project = new Project
            {
                Title = command.Title,
                Description = command.Description,
                Tasks = command.Tasks.Select(taskDto => new AppTask
                {
                    Title = taskDto.Title,
                    Description = taskDto.Description,
                    State = taskDto.State,
                    AssignedUserId = taskDto.AssignedUserId,
                }).ToList()
            };


            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }
    }
}
