namespace API.Entities
{
    public class AppTaskDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskState State { get; set; } 
        public int? AssignedUserId { get; set; }
    }
}
