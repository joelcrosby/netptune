﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Netptune.Models.Models;
using Netptune.Models.Repositories;

namespace Netptune.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkspacesController : ControllerBase
    {
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly UserManager<AppUser> _userManager;

        public WorkspacesController(IWorkspaceRepository workspaceRepository, UserManager<AppUser> userManager)
        {
            _workspaceRepository = workspaceRepository;
            _userManager = userManager;
        }

        // GET: api/Workspaces
        [HttpGet]
        public async Task<IActionResult> GetWorkspaces()
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _workspaceRepository.GetWorkspaces(user);
            return result.ToRestResult();
        }

        // GET: api/Workspaces/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkspace([FromRoute] int id)
        {
            var result = await _workspaceRepository.GetWorkspace(id);
            return result.ToRestResult();
        }

        // PUT: api/Workspaces/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkspace([FromRoute] int id, [FromBody] Workspace workspace)
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _workspaceRepository.UpdateWorkspace(workspace, user);
            return result.ToRestResult();
        }

        // POST: api/Workspaces
        [HttpPost]
        public async Task<IActionResult> PostWorkspace([FromBody] Workspace workspace)
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _workspaceRepository.AddWorkspace(workspace, user);
            return result.ToRestResult();
        }

        // DELETE: api/Workspaces/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkspace([FromRoute] int id)
        {
            var result = await _workspaceRepository.DeleteWorkspace(id);
            return result.ToRestResult();
        }

    }
}