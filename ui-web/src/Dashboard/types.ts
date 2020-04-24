export interface StatsResult {
  dbSize: DbSizeStats;
}

export type DbSizeStats = Record<DbName, number>;

type DbName = string;
