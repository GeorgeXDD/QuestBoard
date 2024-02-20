namespace API.CQRS.Commands.Projects
{
    public class DeleteProjectCommand
    {
        public int Id { get; set; }

        public DeleteProjectCommand(int id)
        {
            Id = id;
        }
    }
}
