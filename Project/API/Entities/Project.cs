using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<AppTask> Tasks { get; set; }
    }
}
