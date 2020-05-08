package postgstats.stats;

import java.util.List;
import java.util.Map;

class StatsResult {
  Map<String, Integer> dbSize;
  List<LongQuery> longQueries;
  BgWriter bgWriter;
  List<Lock> locks;

  StatsResult(
      Map<String, Integer> dbSize,
      List<LongQuery> longQueries,
      BgWriter bgWriter,
      List<Lock> locks) {
    this.dbSize = dbSize;
    this.longQueries = longQueries;
    this.bgWriter = bgWriter;
    this.locks = locks;
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

    public BgWriter(
        Integer checkpointsReqPct,
        String avgCheckpointWrite,
        String totalWritten,
        Integer checkpointWritePct,
        Integer backendWritePct) {
      this.checkpointsReqPct = checkpointsReqPct;
      this.avgCheckpointWrite = avgCheckpointWrite;
      this.totalWritten = totalWritten;
      this.checkpointWritePct = checkpointWritePct;
      this.backendWritePct = backendWritePct;
    }
  }

  static class Lock {
    String lockType;
    String virtualTransaction;
    String transactionTd;
    String nspName;
    String relName;
    String mode;
    Boolean granted;
    String queryStart;
    String query;

    public Lock(
        String lockType,
        String virtualTransaction,
        String transactionTd,
        String nspName,
        String relName,
        String mode,
        Boolean granted,
        String queryStart,
        String query) {
      this.lockType = lockType;
      this.virtualTransaction = virtualTransaction;
      this.transactionTd = transactionTd;
      this.nspName = nspName;
      this.relName = relName;
      this.mode = mode;
      this.granted = granted;
      this.queryStart = queryStart;
      this.query = query;
    }
  }
}
