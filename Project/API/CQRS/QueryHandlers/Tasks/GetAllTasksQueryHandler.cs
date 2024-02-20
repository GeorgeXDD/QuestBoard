using API.CQRS.Queries.Projects;
using API.CQRS.Queries.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.CQRS.QueryHandlers.Tasks
{
    public class GetAllTasksQueryHandler
    {
        private readonly DataContext _context;

        public GetAllTasksQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AppTask>> Handle(GetAllTasksQuery query)
        {
            var tasksQuery = _context.Tasks.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Filter))
            {
                tasksQuery = tasksQuery.Where(p => p.Title.Contains(query.Filter));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy == "title")
                {
                    tasksQuery = query.IsAscending ? tasksQuery.OrderBy(p => p.Title) : tasksQuery.OrderByDescending(p => p.Title);
                }
            }

            if (query.PageNumber.HasValue && query.PageSize.HasValue)
            {
                tasksQuery = tasksQuery.Skip((query.PageNumber.Value - 1) * query.PageSize.Value).Take(query.PageSize.Value);
            }

            return await _context.Tasks
                .ToListAsync();
        }
    }
}
