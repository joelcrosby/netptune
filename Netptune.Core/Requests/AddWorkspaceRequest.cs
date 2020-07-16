using System.ComponentModel.DataAnnotations;

using Netptune.Core.Meta;

namespace Netptune.Core.Requests
{
    public class AddWorkspaceRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Slug { get; set; }

        public WorkspaceMeta MetaInfo { get; set; }
    }
}
