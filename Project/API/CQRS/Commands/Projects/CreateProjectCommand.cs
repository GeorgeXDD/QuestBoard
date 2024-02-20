using API.Entities;

namespace API.CQRS.Commands.Projects
{
    public class CreateProjectCommand
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<AppTaskDTO> Tasks { get; set; } = new List<AppTaskDTO>();
    }
}
