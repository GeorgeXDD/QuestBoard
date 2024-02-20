using API.CQRS.Commands.Tasks;
using API.Data;
using API.Entities;

namespace API.CQRS.CommandHandlers.Tasks
{
    public class CreateTaskCommandHandler
    {
        private readonly DataContext _context;

        public CreateTaskCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<AppTask> Handle(CreateTaskCommand command)
        {
            var task = new AppTask
            {
                AssignedUserId = command.AssignedUserId,
                Title = command.Title,
                Description = command.Description,
                State = command.State,
                ProjectId = command.ProjectId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }
    }
}
