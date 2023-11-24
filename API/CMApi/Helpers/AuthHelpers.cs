using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CMApi.Models.DomainModels;
using Microsoft.IdentityModel.Tokens;

namespace CMApi.Helpers
{
    public static class AuthHelpers
    {
        public static string EncryptPassword(string plainTextPassword)
        {
            return BCrypt.Net.BCrypt.HashPassword(plainTextPassword);
        }

        public static bool DecryptPassword(string plainTextPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainTextPassword, hashedPassword);
        }

     
    }
}
