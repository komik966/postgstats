export interface StatsResult {
  dbSize: DbSizeStats;
  longQueries: LongQuery[];
  bgWriter: BgWriter;
  locks: Lock[];
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

export interface Lock {
  lockType: string;
  virtualTransaction: string;
  transactionTd: string;
  nspName: string;
  relName: string;
  mode: string;
  granted: boolean;
  queryStart: string;
  query: string;
}

type DbName = string;
