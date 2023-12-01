using StackExchange.Redis;

namespace CMApi.Services;

public class CachingService : ICachingService
{
    private readonly ConnectionMultiplexer RedisConnection;
    private IDatabase CacheDatabase
    {
        get
        {
            return RedisConnection.GetDatabase();
        }
    }
    private readonly TimeSpan DefaultExpiry;

    public CachingService(string redisServer, TimeSpan defaultExpiry)
    {
        RedisConnection = ConnectionMultiplexer.Connect(redisServer);
        DefaultExpiry = defaultExpiry;
    }

    public string Get(string cacheKey)
    {
        var cachValue = CacheDatabase.StringGet(cacheKey);

        if (cachValue.HasValue)
        {
            CacheDatabase.KeyExpire(cacheKey, DefaultExpiry);
        }

        return cachValue;
    }

    public void Set(string cacheKey, string cacheValue)
    {
        CacheDatabase.StringSet(cacheKey, cacheValue, DefaultExpiry);
    }
}
