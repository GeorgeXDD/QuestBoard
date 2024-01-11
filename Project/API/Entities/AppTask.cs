using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Security.Principal;

namespace API.Entities
{
    public class AppTask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey(nameof(AssignedUser))]
        public int? AssignedUserId { get; set; }
        [JsonIgnore]
        public AppUser AssignedUser { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskState State { get; set; }
        [ForeignKey(nameof(Project))]
        public int ProjectId { get; set; }
        [JsonIgnore]
        public Project Project { get; set; }

    }
}
