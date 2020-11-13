using System.Collections.Generic;
using System.Threading.Tasks;

using Netptune.Core.Entities;
using Netptune.Core.Repositories.Common;
using Netptune.Core.ViewModels.Projects;

namespace Netptune.Core.Repositories
{
    public interface IProjectRepository : IRepository<Project, int>
    {
        Task<List<ProjectViewModel>> GetProjects(string workspaceSlug);

        Task<ProjectViewModel> GetProjectViewModel(int id);

        Task<bool> IsProjectKeyAvailable(string key, int workspaceId);
    }
}
