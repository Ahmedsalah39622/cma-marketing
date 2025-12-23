(async()=>{
  try{
    const { Client } = require('pg');
    const conn = 'postgresql://neondb_owner:npg_1VaPchobXU7A@ep-quiet-art-ae3gffa8-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const client = new Client({ connectionString: conn });
    await client.connect();
    const res = await client.query('SELECT 1 as ok');
    console.log('PG OK', res.rows);
    await client.end();
  }catch(e){
    console.error('PG ERR', e.stack || e);
    process.exit(1);
  }
})();
