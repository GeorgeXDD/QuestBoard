using API.Entities;

namespace API.CQRS.Commands.Tasks
{
    public class UpdateTaskCommand
    {
        public int? Id { get; set; }
        public int? AssignedUserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskState State { get; set; }
    }
}
