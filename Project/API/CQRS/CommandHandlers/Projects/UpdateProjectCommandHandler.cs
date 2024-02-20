using API.CQRS.Commands.Projects;
using API.Data;
using API.Entities;

namespace API.CQRS.CommandHandlers.Projects
{
    public class UpdateProjectCommandHandler
    {
        private readonly DataContext _context;

        public UpdateProjectCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Project> Handle(UpdateProjectCommand command)
        {
            var project = await _context.Projects.FindAsync(command.Id);

            if(project == null)
            {
                throw new KeyNotFoundException("Project not found.");
            }
            project.Title = command.Title;
            project.Description = command.Description;

            await _context.SaveChangesAsync();
            return project;
        }
    }
}
