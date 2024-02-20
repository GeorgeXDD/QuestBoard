namespace API.CQRS.Commands.Tasks
{
    public class DeleteTaskCommand
    {
        public int Id { get; set; }

        public DeleteTaskCommand(int id)
        {
            Id = id;
        }
    }
}
