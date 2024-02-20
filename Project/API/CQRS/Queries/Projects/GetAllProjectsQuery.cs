namespace API.CQRS.Queries.Projects
{
    public class GetAllProjectsQuery
    {
        public string Filter { get; set; } 
        public string SortBy { get; set; } 
        public bool IsAscending { get; set; } = true; 
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
