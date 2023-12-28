using CMApi.Models.DomainModels;
using CMApi.Models.Responses;

namespace CMApi.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetUsers();
    Task<User> GetUserById(int id);
    Task<User?> GetUserForLogin(string email);
    Task<IEnumerable<string>> GetRolesForUser(int userId);
    Task<CreateUserResponse> CreateUser(User newUser);
    Task UpdateUser(User existingUser);
    Task<Guid?> DoesResetTokenExist(Guid resetToken);
    void RemovePasswordResetToken(int userId);
    Task UpdatePassword(string hashedPassword, string passwordResetToken);
    Task<User> ReActivateUser(int userId, string passwordResetToken);
}
