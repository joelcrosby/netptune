

using System.ComponentModel.DataAnnotations;

namespace DataPlane.Models
{
    public class Project
    { 

        // Primary key
        public int ProjectId { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        // Navigation properties 
        public virtual ProjectType ProjectType { get; set; }
    }
}