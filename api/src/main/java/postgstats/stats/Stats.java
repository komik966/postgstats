package postgstats.stats;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class Stats {
  private Connection conn;

  public Stats(Connection conn) {
    this.conn = conn;
  }

  public StatsResult query() throws SQLException {
    return new StatsResult(queryDbSize());
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
}
