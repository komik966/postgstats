export interface StatsResult {
  dbSize: DbSizeStats;
  longQueries: LongQuery[];
}

export type DbSizeStats = Record<DbName, number>;

export interface LongQuery {
  runtime: string;
  username: string;
  dbName: string;
  state: string;
  query: string;
}

type DbName = string;
