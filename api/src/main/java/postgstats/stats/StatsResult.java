package postgstats.stats;

import java.util.List;
import java.util.Map;

class StatsResult {
  Map<String, Long> dbSize;
  List<LongQuery> longQueries;
  BgWriter bgWriter;
  List<Lock> locks;
  List<Index> indexes;
  List<IndexSize> indexSizes;

  StatsResult(
      Map<String, Long> dbSize,
      List<LongQuery> longQueries,
      BgWriter bgWriter,
      List<Lock> locks,
      List<Index> indexes,
      List<IndexSize> indexSizes) {
    this.dbSize = dbSize;
    this.longQueries = longQueries;
    this.bgWriter = bgWriter;
    this.locks = locks;
    this.indexes = indexes;
    this.indexSizes = indexSizes;
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

    BgWriter(
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

    Lock(
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

  static class Index {
    String indexRelName;
    Integer avgTuples;
    Integer idxScan;
    Integer idxTupRead;

    Index(String indexRelName, Integer avgTuples, Integer idxScan, Integer idxTupRead) {
      this.indexRelName = indexRelName;
      this.avgTuples = avgTuples;
      this.idxScan = idxScan;
      this.idxTupRead = idxTupRead;
    }
  }

  static class IndexSize {
    String idxName;
    String idxSizePretty;
    String idxSize;

    IndexSize(String idxName, String idxSizePretty, String idxSize) {
      this.idxName = idxName;
      this.idxSizePretty = idxSizePretty;
      this.idxSize = idxSize;
    }
  }
}
