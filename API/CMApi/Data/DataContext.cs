using System.Data;

namespace CMApi.Data;
public class DataContext : IDataContext
{
    public IDbConnection DbConnection { get; set; }
    public IDbTransaction DbTransaction { get; set; }
    public DataContext(IDbConnection dbConnection)
    {
        DbConnection = dbConnection;
    }

    public IDbTransaction BeginTransaction()
    {
        if (DbConnection.State == ConnectionState.Closed)
        {
            DbConnection.Open();
        }

        DbTransaction = DbConnection.BeginTransaction();

        return DbTransaction;
    }

    public void CommitTransaction()
    {
        DbTransaction?.Commit();

        DbConnection.Close();
    }

    public void Dispose()
    {
        DbConnection.Dispose();
    }

    public void RollbackTransaction()
    {
        DbTransaction?.Rollback();

        DbConnection.Close();
    }
}
