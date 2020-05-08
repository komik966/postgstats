package postgstats.stats;

import java.util.List;
import java.util.Map;

class StatsResult {
  Map<String, Integer> dbSize;
  List<LongQuery> longQueries;
  BgWriter bgWriter;

  StatsResult(Map<String, Integer> dbSize, List<LongQuery> longQueries, BgWriter bgWriter) {
    this.dbSize = dbSize;
    this.longQueries = longQueries;
    this.bgWriter = bgWriter;
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

  static class BgWriter {
    Integer checkpointsReqPct;
    String avgCheckpointWrite;
    String totalWritten;
    Integer checkpointWritePct;
    Integer backendWritePct;

    public BgWriter(Integer checkpointsReqPct, String avgCheckpointWrite, String totalWritten, Integer checkpointWritePct, Integer backendWritePct) {
      this.checkpointsReqPct = checkpointsReqPct;
      this.avgCheckpointWrite = avgCheckpointWrite;
      this.totalWritten = totalWritten;
      this.checkpointWritePct = checkpointWritePct;
      this.backendWritePct = backendWritePct;
    }
  }
}
