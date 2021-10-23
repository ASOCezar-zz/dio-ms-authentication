import { Pool } from 'pg';

const connectionString =
  'postgres://zknfccyp:n49c1YsJZOhtMMbGYnfbcu4hGo-N3-vF@motty.db.elephantsql.com/zknfccyp';

const db = new Pool({ connectionString });

export default db;
