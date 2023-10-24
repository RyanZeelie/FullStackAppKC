using System.Data;

namespace CMApi.Data;

public interface IDataContext
{
    IDbTransaction DbTransaction { get; set; }
    IDbConnection DbConnection { get; set; }
    IDbTransaction BeginTransaction();
    void CommitTransaction();
    void RollbackTransaction();
}
