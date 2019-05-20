﻿using System.ComponentModel.DataAnnotations;

namespace Netptune.Entities.Entites
{
    public class Flag : BaseModel
    {

        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

    }
}
