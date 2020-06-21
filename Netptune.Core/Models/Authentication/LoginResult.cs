﻿using Netptune.Core.Authentication.Models;

namespace Netptune.Core.Models.Authentication
{
    public class LoginResult
    {
        public bool IsSuccess { get; private set; }

        public AuthenticationTicket Ticket { get; }

        public string Message { get; }

        private LoginResult(bool success, AuthenticationTicket ticket, string message = null)
        {
            IsSuccess = success;
            Ticket = ticket;
            Message = message;
        }

        public static LoginResult Success(AuthenticationTicket ticket)
        {
            return new LoginResult(true, ticket);
        }

        public static LoginResult Failed(string message = null)
        {
            return new LoginResult(false, null, message);
        }
    }
}
