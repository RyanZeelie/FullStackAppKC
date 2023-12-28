using CMApi.Models.DomainModels;

namespace CMApi.Services
{
    public interface IMailService
    {
        void SendEmail(string toEmail, string subject);
        void SendActivationEmail(User user, Guid passwordResetToken);
    }
}
