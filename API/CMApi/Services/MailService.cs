using System.Net.Mail;
using System.Net;
using System.Text;
using CMApi.Config;
using Microsoft.Extensions.Options;
using CMApi.Models.DomainModels;

namespace CMApi.Services;

public class MailService : IMailService
{
    private readonly EmailConfig _emailConfig;
    public MailService(IOptions<EmailConfig> options)
    {
        _emailConfig = options.Value;
    }

    public void SendEmail(string toEmail, string subject)
    {
        var emailClient = GetSmtpClient();

        var message = GetEmailMessage(toEmail, subject);

        emailClient.Send(message);
    }

    public void SendActivationEmail(User user, Guid passwordResetToken)
    {
        var emailClient = GetSmtpClient();

        var message = GetActivationMessage(user, passwordResetToken);

        emailClient.Send(message);
    }

    private SmtpClient GetSmtpClient()
    {
        var smtpClient = new SmtpClient(_emailConfig.Host, _emailConfig.Port)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(_emailConfig.Address, _emailConfig.Password)
        };

        return smtpClient;
    }

    private MailMessage GetEmailMessage(string toEmail, string subject)
    {
        var mailMessage = new MailMessage();

        mailMessage.From = new MailAddress(_emailConfig.Address);
        mailMessage.To.Add(toEmail);
        mailMessage.Subject = subject;
        mailMessage.IsBodyHtml = true;

        StringBuilder mailBody = new StringBuilder();

        mailBody.AppendFormat("<h1>User Registered</h1>");
        mailBody.AppendFormat("<br />");
        mailBody.AppendFormat("<p>Thank you For Registering account</p>");

        mailMessage.Body = mailBody.ToString();

        return mailMessage;
    }

    private MailMessage GetActivationMessage(User user, Guid passwordResetToken)
    {
        var mailMessage = new MailMessage();

        mailMessage.From = new MailAddress(_emailConfig.Address);
        mailMessage.To.Add(user.Email);
        mailMessage.Subject = "Account Activation";
        mailMessage.IsBodyHtml = true;

        StringBuilder mailBody = new StringBuilder();

        mailBody.AppendFormat($"<h1>Hello {user.FirstName} {user.LastName}</h1>");
        mailBody.AppendFormat("<br />");
        mailBody.AppendFormat("<p>An account has been created for you. Please follow the link below to activate your account and setup your password</p>");
        mailBody.AppendFormat("<br />");
        mailBody.AppendFormat($"<a href='https://127.0.0.1:3004/password-reset/{passwordResetToken}'>Click to setup account</a>");

        mailMessage.Body = mailBody.ToString();

        return mailMessage;
    }
}
