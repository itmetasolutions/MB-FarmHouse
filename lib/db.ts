import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let _db: ReturnType<typeof neon> | null = null

function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set')
    }
    _db = neon(process.env.DATABASE_URL)
  }
  return _db
}

const sql = ((...args: Parameters<NeonQueryFunction<false, false>>) =>
  getDb()(...args)) as NeonQueryFunction<false, false>

export default sql
