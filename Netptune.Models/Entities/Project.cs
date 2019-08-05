using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Netptune.Entities.Entites.BaseEntities;
using Netptune.Entities.Entites.Relationships;
using Newtonsoft.Json;

namespace Netptune.Entities.Entites
{
    public class Project : AuditableEntity<int>
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

        [StringLength(256)]
        public string RepositoryUrl { get; set; }

        #region ForeignKeys

        [Required]
        [ForeignKey("Workspace")]
        public int? WorkspaceId { get; set; }

        #endregion

        #region NavigationProperties

        [JsonIgnore]
        public virtual Workspace Workspace { get; set; }

        [JsonIgnore]
        public virtual ICollection<WorkspaceAppUser> WorkspaceUsers { get; }

        [JsonIgnore]
        public virtual ICollection<WorkspaceProject> WorkspaceProjects { get; }

        [JsonIgnore]
        public virtual ICollection<ProjectUser> ProjectUsers { get; }

        [JsonIgnore]
        public virtual ICollection<ProjectTask> ProjectTasks { get; }

        [JsonIgnore]
        public virtual ICollection<Post> ProjectPosts { get; }

        #endregion

    }
}
