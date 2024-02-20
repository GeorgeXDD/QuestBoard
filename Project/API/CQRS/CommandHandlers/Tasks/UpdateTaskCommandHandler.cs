using API.CQRS.Commands.Projects;
using API.CQRS.Commands.Tasks;
using API.Data;
using API.Entities;

namespace API.CQRS.CommandHandlers.Tasks
{
    public class UpdateTaskCommandHandler
    {
        private readonly DataContext _context;

        public UpdateTaskCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<AppTask> Handle(UpdateTaskCommand command)
        {
            var task = await _context.Tasks.FindAsync(command.Id);

            if (task == null)
            {
                throw new KeyNotFoundException("Project not found.");
            }
            task.Title = command.Title;
            task.Description = command.Description;
            task.AssignedUserId = command.AssignedUserId;
            task.State = command.State;

            await _context.SaveChangesAsync();
            return task;
        }
    }
}
