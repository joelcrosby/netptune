using System;

using Netptune.Core.Jobs;
using Netptune.Core.Models.Activity;
using Netptune.Core.Services;

namespace Netptune.Core.Events
{
    public class DistributedActivityLogger : IActivityLogger
    {
        private readonly IJobClient Client;
        private readonly IIdentityService Identity;

        public DistributedActivityLogger(IJobClient client, IIdentityService identity)
        {
            Client = client;
            Identity = identity;
        }

        public void Log(Action<ActivityOptions> options)
        {
            var userId = Identity.GetUserId();
            var workspaceId = Identity.GetWorkspaceId().GetAwaiter().GetResult();

            var activityOptions = new ActivityOptions
            {
                UserId = userId,
                WorkspaceId = workspaceId,
            };

            options.Invoke(activityOptions);

            if (activityOptions.EntityId is null)
            {
                throw new Exception($"Cannot call log with null {nameof(activityOptions.EntityId)}.");
            }

            if (activityOptions.WorkspaceId is null)
            {
                throw new Exception($"Cannot call log with null {nameof(activityOptions.WorkspaceId)}.");
            }

            var activity = new ActivityEvent
            {
                Type = activityOptions.Type,
                EntityType = activityOptions.EntityType,
                UserId = activityOptions.UserId,
                EntityId = activityOptions.EntityId.Value,
                WorkspaceId = activityOptions.WorkspaceId.Value,
                Time = DateTime.UtcNow,
            };

            Client.Enqueue<IActivityObservable>(service => service.Track(activity));
        }
    }
}
