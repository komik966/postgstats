package postgstats.stats;

import java.util.List;
import java.util.Map;

class StatsResult {
  Map<String, Integer> dbSize;
  List<LongQuery> longQueries;

  StatsResult(Map<String, Integer> dbSize, List<LongQuery> longQueries) {
    this.dbSize = dbSize;
    this.longQueries = longQueries;
  }

  static class LongQuery {
    String runtime;
    String username;
    String dbName;
    String state;
    String query;

    LongQuery(String runtime, String username, String dbName, String state, String query) {
      this.runtime = runtime;
      this.username = username;
      this.dbName = dbName;
      this.state = state;
      this.query = query;
    }
  }
}
