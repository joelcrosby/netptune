using System.Threading.Tasks;

using Netptune.Core.Models.Messaging;

namespace Netptune.Core.Messaging
{
    public interface IEmailService
    {
        Task Send(SendEmailModel model);
    }
}
