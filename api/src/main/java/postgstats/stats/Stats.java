package postgstats.stats;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Stats {
  private final Connection conn;

  public Stats(Connection conn) {
    this.conn = conn;
  }

  public StatsResult query() throws SQLException {
    return new StatsResult(queryDbSize(), queryLongQueries());
  }

  private Map<String, Integer> queryDbSize() throws SQLException {
    ResultSet rs =
        conn.createStatement()
            .executeQuery(
                "select datname, pg_database_size(datname) from pg_database order by datname");

    Map<String, Integer> result = new HashMap<>();

    while (rs.next()) {
      result.put(rs.getString(1), rs.getInt(2));
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
}
