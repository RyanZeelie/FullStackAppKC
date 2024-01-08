using CMApi.Data;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
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

    public async Task<CreateUserResponse> CreateUser(User newUser)
    {
        var newUserResponse = new CreateUserResponse();

        var passwordResetToken = Guid.NewGuid();

        var query = @"INSERT INTO [User] (FirstName, LastName, Email, CreateDate, IsActive, PasswordResetToken)
                         VALUES (@FirstName, @LastName, @Email, @CreateDate, 0, @PasswordResetToken)
                    SELECT SCOPE_IDENTITY()";

        var newUserId =  await _dbConnection.QueryFirstOrDefaultAsync<int>(query, new { FirstName = newUser.FirstName, LastName = newUser.LastName, Email = newUser.Email, CreateDate = newUser.CreateDate, PasswordResetToken = passwordResetToken }, _dbTransaction);

        newUserResponse.Id  = newUserId;    
        newUserResponse.PasswordResetToken = passwordResetToken;
        newUserResponse.Email = newUser.Email;

        return newUserResponse;
    }

    public Task AssignUserToRole(int userId, int roleId)
    {

        var query = @"INSERT INTO UsersRoles (UserId, RoleId)
                         VALUES (@UserId, @RoleId)";

        return _dbConnection.ExecuteAsync(query, new { UserId = userId, RoleId = roleId }, _dbTransaction);
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
                        Id,
                        FirstName,
                        LastName,
                        Email,
                        HashedPassword,
                        CreateDate,
                        IsActive
                    FROM [User]
                    WHERE Email = @Email
                        AND IsActive = 1";

        return _dbConnection.QueryFirstOrDefaultAsync<User>(query, new { Email = email }, _dbTransaction);
    }

    public async Task<IEnumerable<string>> GetRolesForUser(int userId)
    {
        var query = @"SELECT
                        r.Name
                    FROM UsersRoles ur
                    JOIN Role r
                        ON r.Id = ur.RoleId
                    WHERE ur.UserId = @UserId";

        var roles = await _dbConnection.QueryAsync<string>(query, new { UserId = userId }, _dbTransaction);

        return roles;
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

    public Task<Guid?> DoesResetTokenExist(Guid resetToken)
    {
        var query = @"SELECT
                        PasswordResetToken
                    FROM [USER]
                    WHERE PasswordResetToken = @PasswordResetToken";

        return _dbConnection.QueryFirstOrDefaultAsync<Guid?>(query, new { PasswordResetToken  = resetToken }, _dbTransaction); 
    } 

    public void RemovePasswordResetToken(int userId)
    {
        var query = @"UPDATE [USER]
                        SET PasswordResetToken = null
                    WHERE Id = @Id";

        _dbConnection.Execute(query, new { Id = userId }, _dbTransaction);
    }

    public Task UpdatePassword(string hashedPassword, string passwordResetToken)
    {
        var query = @"UPDATE [USER]
                        SET 
                            PasswordResetToken = null,
                            HashedPassword = @HashedPassword,
                            IsActive = 1
                    WHERE PasswordResetToken = @PasswordResetToken";

        return _dbConnection.ExecuteAsync(query, new { PasswordResetToken = passwordResetToken, HashedPassword = hashedPassword }, _dbTransaction);
    }

    public Task<User> ReActivateUser(int userId, string passwordResetToken)
    {
        var query = @"UPDATE [USER]
                        SET
                            PasswordResetToken = @PasswordResetToken,
                            IsActive = 0,
                            HashedPassword = ''
                    WHERE Id = @Id
                    
                    SELECT
                        *
                    FROM [User]
                    WHERE Id = @Id";

        return _dbConnection.QueryFirstAsync<User>(query, new { PasswordResetToken = passwordResetToken, Id = userId }, _dbTransaction);
    }

    public async Task<List<Role>> GetRoles()
    {
        var query = @"SELECT
                        *
                    FROM Role";

        var roles = await _dbConnection.QueryAsync<Role>(query, _dbTransaction);

        return roles.ToList();
    }
}
