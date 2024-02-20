using API.Entities;

namespace API.CQRS.Commands.Projects
{
    public class UpdateProjectCommand
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
