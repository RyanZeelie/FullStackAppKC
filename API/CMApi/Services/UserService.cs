using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;
using Hangfire;

namespace CMApi.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMailService _mailService;

    public UserService(IUserRepository userRepository, IMailService mailService)
    {
        _userRepository = userRepository;
        _mailService = mailService;
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

        var createUserResponse = await _userRepository.CreateUser(newUser);

        _mailService.SendActivationEmail(newUser, createUserResponse.PasswordResetToken);

        BackgroundJob.Schedule(() => _userRepository.RemovePasswordResetToken(createUserResponse.Id), TimeSpan.FromMinutes(5));
    }

    public async Task ReActivateUser(ReActivateRequest request)
    {
        var passwordResetToken = Guid.NewGuid();

        var user = await _userRepository.ReActivateUser(request.Id, passwordResetToken.ToString());

        _mailService.SendActivationEmail(user, passwordResetToken);

        BackgroundJob.Schedule(() => _userRepository.RemovePasswordResetToken(user.Id), TimeSpan.FromMinutes(5));
    }
}
