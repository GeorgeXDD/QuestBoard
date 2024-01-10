using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<AppTask> Tasks { get; set; }
    }
}
