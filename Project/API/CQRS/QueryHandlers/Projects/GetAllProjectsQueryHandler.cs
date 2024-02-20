using API.CQRS.Queries.Projects;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.CQRS.QueryHandlers.Projects
{
    public class GetAllProjectsQueryHandler
    {
        private readonly DataContext _context;

        public GetAllProjectsQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> Handle(GetAllProjectsQuery query)
        {
            var projectsQuery = _context.Projects.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Filter))
            {
                projectsQuery = projectsQuery.Where(p => p.Title.Contains(query.Filter));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy == "title")
                {
                    projectsQuery = query.IsAscending ? projectsQuery.OrderBy(p => p.Title) : projectsQuery.OrderByDescending(p => p.Title);
                }
            }

            if (query.PageNumber.HasValue && query.PageSize.HasValue)
            {
                projectsQuery = projectsQuery.Skip((query.PageNumber.Value - 1) * query.PageSize.Value).Take(query.PageSize.Value);
            }

            return await _context.Projects
                .Include(p => p.Tasks)
                .ToListAsync();
        }
    }
}
