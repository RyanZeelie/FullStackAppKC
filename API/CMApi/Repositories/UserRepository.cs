using CMApi.Data;
using CMApi.Models.DomainModels;
using Dapper;
using System.Data;

namespace CMApi.Repositories;

public class UserRepository : IUserRepository
{
    private IDbConnection _dbConnection { get { return _dataContext.DbConnection; } }
    private IDbTransaction _dbTransaction { get { return _dataContext.DbTransaction; } }
    private IDataContext _dataContext;

    public UserRepository(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<User>> GetUsers()
    {
        var query = @"SELECT
                        Id,
                        FirstName,
                        LastName,
                        Email,
                        CreateDate,
                        IsActive
                    FROM [User]";

        var users = await _dbConnection.QueryAsync<User>(query, _dbTransaction);

        return users.ToList();
    }

    public Task CreateUser(User newUser)
    {
        var query = @"INSERT INTO [User] (FirstName, LastName, Email, HashedPassword, CreateDate, IsActive)
                         VALUES (@FirstName, @LastName, @Email, @HashedPassword, @CreateDate, @IsActive)";

        return _dbConnection.ExecuteAsync(query, newUser, _dbTransaction);
    }

    public Task<User?> GetUserById(int id)
    {
        var query = @"SELECT
                        FirstName,
                        LastName,
                        Email,
                        CreateDate,
                        IsActive
                    FROM [User]
                    WHERE Id = @Id";

        return _dbConnection.QueryFirstOrDefaultAsync<User>(query, new { Id = id }, _dbTransaction);
    }

    public Task<User?> GetUserForLogin(string email)
    {
        var query = @"SELECT
                        FirstName,
                        LastName,
                        Email,
                        HashedPassword,
                        CreateDate,
                        IsActive
                    FROM [User]
                    WHERE Email = @Email";

        return _dbConnection.QueryFirstOrDefaultAsync<User>(query, new { Email = email }, _dbTransaction);
    }

    public Task UpdateUser(User existingUser)
    {
        var query = @"UPDATE [User] 
                        SET
                            FirstName = @FirstName, 
                            LastName = @LastName, 
                            Email = @Email, 
                            IsActive = @IsActive
                    WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, new { existingUser }, _dbTransaction);
    }
}
