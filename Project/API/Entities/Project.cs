namespace API.Entities
{
    public class Project
    {
        public Guid projectId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<Task> Tasks { get; set; }
    }
}
