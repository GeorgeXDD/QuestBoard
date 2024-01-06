namespace API.Entities
{
    public class Task
    {
        public Guid taskId { get; set; }
        public string assignedUserId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public TaskState state { get; set; }

    }
}
