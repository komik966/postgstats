export interface StatsResult {
  dbSize: DbSizeStats;
  longQueries: LongQuery[];
  bgWriter: BgWriter;
}

export type DbSizeStats = Record<DbName, number>;

export interface LongQuery {
  runtime: string;
  username: string;
  dbName: string;
  state: string;
  query: string;
}

export interface BgWriter {
  checkpointsReqPct: number;
  avgCheckpointWrite: string;
  totalWritten: string;
  checkpointWritePct: number;
  backendWritePct: number;
}

type DbName = string;
