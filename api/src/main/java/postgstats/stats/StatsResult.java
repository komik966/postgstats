package postgstats.stats;

import java.util.Map;

class StatsResult {
  Map<String, Integer> dbSize;

  StatsResult(Map<String, Integer> dbSize) {
    this.dbSize = dbSize;
  }
}
