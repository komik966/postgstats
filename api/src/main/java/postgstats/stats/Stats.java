package postgstats.stats;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * https://www.amazon.com/PostgreSQL-High-Performance-optimization-availability/dp/1788474481
 * https://gist.github.com/anvk/475c22cbca1edc5ce94546c871460fdd
 */
public class Stats {
  private final Connection conn;

  public Stats(Connection conn) {
    this.conn = conn;
  }

  public StatsResult query() throws SQLException {
    return new StatsResult(
        queryDbSize(),
        queryLongQueries(),
        queryBgWriter(),
        queryLocks(),
        queryIndexes(),
        queryIndexSizes());
  }

  private Map<String, Long> queryDbSize() throws SQLException {
    ResultSet rs =
        conn.createStatement()
            .executeQuery(
                "select datname, pg_database_size(datname) from pg_database order by datname");

    Map<String, Long> result = new HashMap<>();

    while (rs.next()) {
      result.put(rs.getString(1), rs.getLong(2));
    }

    return result;
  }

  private List<StatsResult.LongQuery> queryLongQueries() throws SQLException {
    ResultSet rs =
        conn.createStatement()
            .executeQuery(
                "select now() - query_start as runtime, usename, datname, state, query from pg_stat_activity where now() - query_start > '9 seconds'::interval order by runtime desc;");

    List<StatsResult.LongQuery> result = new ArrayList<>();

    while (rs.next()) {
      result.add(
          new StatsResult.LongQuery(
              rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5)));
    }

    return result;
  }

  private StatsResult.BgWriter queryBgWriter() throws SQLException {
    String query =
        String.join(
            " ",
            "select",
            "(100 * checkpoints_req) / nullif(checkpoints_timed + checkpoints_req, 0)                         AS checkpoints_req_pct,",
            "pg_size_pretty(buffers_checkpoint * block_size / nullif(checkpoints_timed + checkpoints_req, 0)) AS avg_checkpoint_write,",
            "pg_size_pretty(block_size * (buffers_checkpoint + buffers_clean + buffers_backend))     AS total_written,",
            "100 * buffers_checkpoint / nullif(buffers_checkpoint + buffers_clean + buffers_backend, 0)       AS checkpoint_write_pct,",
            "100 * buffers_backend / nullif(buffers_checkpoint + buffers_clean + buffers_backend, 0)          AS backend_write_pct",
            "from pg_stat_bgwriter, (select cast(current_setting('block_size') AS integer) AS block_size) as bs;");
    ResultSet rs = conn.createStatement().executeQuery(query);

    rs.next();
    return new StatsResult.BgWriter(
        rs.getInt(1), rs.getString(2), rs.getString(3), rs.getInt(4), rs.getInt(5));
  }

  private List<StatsResult.Lock> queryLocks() throws SQLException {
    String query =
        String.join(
            " ",
            "select",
            "locktype, virtualtransaction, transactionid, nspname, relname, mode, granted,",
            "cast(date_trunc('second', query_start) AS timestamp) AS query_start,",
            "query",
            "from pg_locks",
            "left outer join pg_class on pg_locks.relation = pg_class.oid",
            "left outer join pg_namespace on pg_namespace.oid = pg_class.relnamespace,",
            "pg_stat_activity",
            "where not pg_locks.pid = pg_backend_pid() ",
            "and pg_locks.pid = pg_stat_activity.pid;");
    ResultSet rs = conn.createStatement().executeQuery(query);

    List<StatsResult.Lock> result = new ArrayList<>();

    while (rs.next()) {
      result.add(
          new StatsResult.Lock(
              rs.getString(1),
              rs.getString(2),
              rs.getString(3),
              rs.getString(4),
              rs.getString(5),
              rs.getString(6),
              rs.getBoolean(7),
              rs.getString(8),
              rs.getString(9)));
    }

    return result;
  }

  private List<StatsResult.Index> queryIndexes() throws SQLException {
    ResultSet rs =
        conn.createStatement()
            .executeQuery(
                "select indexrelname, round(cast(idx_tup_read as numeric) / idx_scan, 0) as avg_tuples, idx_scan, idx_tup_read from pg_stat_user_indexes where idx_scan > 0;");

    List<StatsResult.Index> result = new ArrayList<>();

    while (rs.next()) {
      result.add(new StatsResult.Index(rs.getString(1), rs.getInt(2), rs.getInt(3), rs.getInt(4)));
    }

    return result;
  }

  private List<StatsResult.IndexSize> queryIndexSizes() throws SQLException {
    String query =
        String.join(
            " ",
            "select",
            "relname                                        as idx_name,",
            "pg_size_pretty(pg_total_relation_size(pc.oid)) as idx_size_pretty,",
            "pg_total_relation_size(pc.oid)                 as idx_size",
            "from pg_class pc left join pg_namespace pn on pc.relnamespace = pn.oid",
            "where nspname not in ('pg_catalog', 'information_schema') and nspname !~ '^pg_toast' and relkind = 'i'",
            "order by pg_total_relation_size(pc.oid) desc limit 50;");
    ResultSet rs = conn.createStatement().executeQuery(query);

    List<StatsResult.IndexSize> result = new ArrayList<>();

    while (rs.next()) {
      result.add(new StatsResult.IndexSize(rs.getString(1), rs.getString(2), rs.getString(3)));
    }

    return result;
  }
}
