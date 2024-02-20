using API.CQRS.Commands.Projects;
using API.CQRS.Commands.Tasks;
using API.Data;

namespace API.CQRS.CommandHandlers.Tasks
{
    public class DeleteTaskCommandHandler
    {
        private readonly DataContext _context;

        public DeleteTaskCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteTaskCommand command)
        {
            var task = await _context.Tasks.FindAsync(command.Id);
            if (task == null)
            {
                return false;
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
