const { Client } = require('pg');

(async () => {
  const connectionString = 'postgresql://neondb_owner:npg_1VaPchobXU7A@ep-quiet-art-ae3gffa8-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query("SELECT data FROM home_content WHERE id='home'");
    console.log('rows:', JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err.stack || err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
