using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Netptune.Core.Entities;
using Netptune.Core.Repositories;
using Netptune.Core.Repositories.Common;
using Netptune.Entities.Contexts;
using Netptune.Repositories.Common;

namespace Netptune.Repositories
{
    public class BoardGroupRepository : Repository<DataContext, BoardGroup, int>, IBoardGroupRepository
    {
        public BoardGroupRepository(DataContext dataContext, IDbConnectionFactory connectionFactories)
            : base(dataContext, connectionFactories)
        {
        }

        public Task<List<BoardGroup>> GetBoardGroupsInBoard(int boardId, bool isReadonly = false)
        {
            var query = Entities

                .Where(boardGroup => boardGroup.BoardId == boardId)
                .Where(boardGroup => !boardGroup.IsDeleted)

                .OrderBy(boardGroup => boardGroup.SortOrder)

                .Include(group => group.TasksInGroups)
                .ThenInclude(relational => relational.ProjectTask)
                .ThenInclude(task => task.Owner)

                .Include(group => group.TasksInGroups)
                .ThenInclude(relational => relational.ProjectTask)
                .ThenInclude(task => task.Assignee)

                .Include(group => group.TasksInGroups)
                .ThenInclude(relational => relational.ProjectTask)
                .ThenInclude(task => task.Project)

                .Include(group => group.TasksInGroups)
                .ThenInclude(relational => relational.ProjectTask)
                .ThenInclude(task => task.Workspace)

                .Include(group => group.TasksInGroups)
                .ThenInclude(relational => relational.ProjectTask)
                .ThenInclude(task => task.ProjectTaskTags)
                .ThenInclude(taskTag => taskTag.Tag);

            return query.ApplyReadonly(isReadonly);
        }

        public Task<List<BoardGroup>> GetBoardGroupsForProjectTask(int taskId, bool isReadonly = false)
        {
            var query = Entities

                .Where(group => group.TasksInGroups
                    .Select(x => x.ProjectTaskId)
                    .Contains(taskId))

                .Include(group => group.TasksInGroups)
                    .ThenInclude(relational => relational.ProjectTask);

            return query.ApplyReadonly(isReadonly);
        }

        public Task<List<ProjectTask>> GetTasksInGroup(int groupId, bool isReadonly = false)
        {
            var query = Context.ProjectTaskInBoardGroups
                .Where(item => item.BoardGroupId == groupId)
                .Select(item => item.ProjectTask);

            return query.ApplyReadonly(isReadonly);
        }

        public async ValueTask<double> GetBoardGroupDefaultSortOrder(int boardId)
        {
            var sortOrders = await Entities

                .Where(boardGroup => boardGroup.BoardId == boardId)
                .Where(boardGroup => !boardGroup.IsDeleted)

                .OrderBy(boardGroup => boardGroup.SortOrder)

                .AsNoTracking()

                .Select(boardGroup => boardGroup.SortOrder)
                .ToListAsync();

            return sortOrders.Max() + 1;
        }
    }
}
