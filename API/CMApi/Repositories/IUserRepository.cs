using CMApi.Models.DomainModels;

namespace CMApi.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetUsers();
    Task<User> GetUserById(int id);
    Task<User?> GetUserForLogin(string email);
    Task CreateUser(User newUser);
    Task UpdateUser(User existingUser);
}
