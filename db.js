require('dotenv').config();
const Pool = require('pg').Pool;

// 環境変数を使用してセキュアに設定
const dbConfig = {
  database: 'todos',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port:  5432,
};

// コネクションプールの作成
const pool = new Pool(dbConfig);

// コネクションがエラーを発生させた場合のハンドリング
pool.on('error', (err) => {
  console.error('Unexpected error on idle clients', err);
  process.exit(-1); // アプリケーションの異常終了
});

module.exports = pool;
