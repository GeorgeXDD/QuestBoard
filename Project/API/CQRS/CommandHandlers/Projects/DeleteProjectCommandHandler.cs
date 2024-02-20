using API.CQRS.Commands.Projects;
using API.Data;

namespace API.CQRS.CommandHandlers.Projects
{
    public class DeleteProjectCommandHandler
    {
        private readonly DataContext _context;

        public DeleteProjectCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteProjectCommand command)
        {
            var project = await _context.Projects.FindAsync(command.Id);
            if (project == null)
            {
                return false;
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
