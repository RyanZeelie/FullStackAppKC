using CMApi.Models.DomainModels;
using CMApi.Models.Requests;

namespace CMApi.Services;

public interface IUserService
{
    Task CreateUser(CreateUserRequest userRequest);
}
