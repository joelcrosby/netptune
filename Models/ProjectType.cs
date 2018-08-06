﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataPlane.Models
{
    public class ProjectType
    {
        // Primary key
        public int ProjectTypeId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        // Navigation property 
        public virtual ICollection<Project> Projects { get; set; }
    }
}
