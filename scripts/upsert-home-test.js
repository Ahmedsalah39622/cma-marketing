const { Client } = require('pg');

(async () => {
  const connectionString = 'postgresql://neondb_owner:npg_1VaPchobXU7A@ep-quiet-art-ae3gffa8-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
  const client = new Client({ connectionString });
  try {
    await client.connect();
    await client.query('CREATE TABLE IF NOT EXISTS home_content (id text PRIMARY KEY, data jsonb)');
    const data = { test_marker: 'copilot-write-test', ts: new Date().toISOString() };
    await client.query("INSERT INTO home_content (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data", ['home', data]);
    const res = await client.query("SELECT data FROM home_content WHERE id='home'");
    console.log('after upsert rows:', JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err.stack || err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
