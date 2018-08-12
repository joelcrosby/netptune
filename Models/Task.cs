﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DataPlane.Models
{
    public class Task : BaseModel
    {

        // Primary key
        [Key]
        public int FlagId { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public AppUser Assignee { get; set; }

    }
}
