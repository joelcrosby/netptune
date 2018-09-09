﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataPlane.Entites;
using DataPlane.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using DataPlane.Interfaces;

namespace DataPlane.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectTasksController : ControllerBase
    {

        private readonly ProjectsContext _context;
        private readonly UserManager<AppUser> _userManager;

        public ProjectTasksController(ProjectsContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<ProjectTask> GetTasks(int workspaceId)
        {
            _context.ProjectTasks.IncludeBaseObjects();
            _context.ProjectTasks.Include(x => x.Owner).ThenInclude(x => x.UserName);
            return _context.ProjectTasks.Where(x => x.Workspace.WorkspaceId == workspaceId).OrderBy(x => x.SortOrder);
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _context.ProjectTasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask([FromRoute] int id, [FromBody] ProjectTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != task.ProjectTaskId)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<IActionResult> PostTask([FromBody] ProjectTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Load the relationship tables.
            _context.ProjectTasks.Include(m => m.Workspace).ThenInclude(e => e.Projects);

            var relational = (from w in _context.Workspaces
                                join p in _context.Projects 
                                on new { ProjectId = task.ProjectId ?? task.Project.ProjectId } 
                                equals new { ProjectId = p.ProjectId }
                                where
                                w.WorkspaceId == (task.WorkspaceId ?? task.Workspace.WorkspaceId)
                                select new {
                                    project = p,
                                    workspace = w
                                }).Take(1);

            if (!relational.Any()) 
            {
                return BadRequest("Could not find related project or workspace!");
            }

            task.Workspace = relational.FirstOrDefault().workspace;
            task.Project = relational.FirstOrDefault().project;

            var user = await _userManager.GetUserAsync(User) as AppUser;
            task.Assignee = user;
            task.Owner = user;
            task.CreatedByUser = user;

            _context.ProjectTasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.ProjectTaskId }, task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _context.ProjectTasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.ProjectTasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        private bool TaskExists(int id)
        {
            return _context.ProjectTasks.Any(e => e.ProjectTaskId == id);
        }
    }
}