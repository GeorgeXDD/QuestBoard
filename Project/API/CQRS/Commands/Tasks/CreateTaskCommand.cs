using API.Entities;

namespace API.CQRS.Commands.Tasks
{
    public class CreateTaskCommand
    {
        public int? AssignedUserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskState State { get; set; }
        public int ProjectId { get; set; }
    }
}
