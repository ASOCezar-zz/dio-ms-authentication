import { Pool } from 'pg';

const connectionString = process.env.CONNECTION_STRING_DB as string;

const db = new Pool({ connectionString });

export default db;
