using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class AppTask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string assignedUserId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public TaskState state { get; set; }
        public int projectId { get; set; }
        [JsonIgnore]
        public Project project { get; set; }

    }
}
