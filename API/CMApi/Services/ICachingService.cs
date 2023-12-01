namespace CMApi.Services;

public interface ICachingService
{
    string Get(string cacheKey);
    void Set(string cacheKey, string cacheValue);
}
