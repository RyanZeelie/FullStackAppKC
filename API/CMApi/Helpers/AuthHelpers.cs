namespace CMApi.Helpers;

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
