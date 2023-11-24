using CMApi.Helpers;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;

namespace CMApi.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task CreateUser(CreateUserRequest userRequest)
    {
        var newUser = new User
        {
            FirstName = userRequest.FirstName,
            LastName = userRequest.LastName,
            Email = userRequest.Email,
            HashedPassword = AuthHelpers.EncryptPassword(userRequest.Password),
            CreateDate = DateTime.UtcNow,
            IsActive = true
        };

        await _userRepository.CreateUser(newUser);
    }
}
