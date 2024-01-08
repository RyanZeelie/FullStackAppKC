using CMApi.Data;
using CMApi.Helpers;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;
using Hangfire;

namespace CMApi.Services;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;
    private readonly IUserRepository _userRepository;
    private readonly IMailService _mailService;
    private IDataContext _context;

    public UserService(ILogger<UserService> logger, IUserRepository userRepository, IMailService mailService, IDataContext context)
    {
        _logger = logger;   
        _userRepository = userRepository;
        _mailService = mailService;
        _context = context;
    }

    public async Task CreateUser(CreateUserRequest userRequest)
    {
        var newUser = new User
        {
            FirstName = userRequest.FirstName,
            LastName = userRequest.LastName,
            Email = userRequest.Email,
            CreateDate = DateTime.UtcNow,
            IsActive = true
        };

        using var transaction = _context.BeginTransaction();

        try
        {
            var createUserResponse = await _userRepository.CreateUser(newUser);

            await _userRepository.AssignUserToRole(createUserResponse.Id, userRequest.Role);

            _mailService.SendActivationEmail(newUser, createUserResponse.PasswordResetToken);

            BackgroundJob.Schedule(() => _userRepository.RemovePasswordResetToken(createUserResponse.Id), TimeSpan.FromMinutes(5));

            transaction.Commit();

            var logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("User Created");
            _logger.LogInformation(logMessage);
        }
        catch (Exception ex)
        {
            transaction.Rollback();

            var logMessage = LogMessageHelpers.CreateExceptionLogMessage(ex.Message);
            _logger.LogError(logMessage);
        }
    }

    public async Task ReActivateUser(ReActivateRequest request)
    {
        using var transaction = _context.BeginTransaction();

        try
        {
            var passwordResetToken = Guid.NewGuid();

            var user = await _userRepository.ReActivateUser(request.Id, passwordResetToken.ToString());

            _mailService.SendActivationEmail(user, passwordResetToken);

            BackgroundJob.Schedule(() => _userRepository.RemovePasswordResetToken(user.Id), TimeSpan.FromMinutes(5));

            var logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("User ReActivated");
            _logger.LogInformation(logMessage);
        }
        catch (Exception ex)
        {
            transaction.Rollback();

            var logMessage = LogMessageHelpers.CreateExceptionLogMessage(ex.Message);
            _logger.LogError(logMessage);
        }
    }
}
