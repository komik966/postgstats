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

  public Map<String, StatsResult> query() throws SQLException {
    ResultSet rs = conn.createStatement().executeQuery("select pg_database_size('postgres');");

    rs.next();
    HashMap<String, StatsResult> result = new HashMap();
    result.put("postgres", new StatsResult(rs.getInt(1)));
    return result;
  }
}
