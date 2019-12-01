﻿using System;

namespace Netptune.Models.ViewModels.Projects
{
    public class ProjectViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string RepositoryUrl { get; set; }

        public int WorkspaceId { get; set; }

        public string OwnerDisplayName { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
