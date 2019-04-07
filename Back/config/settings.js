const db = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    db: process.env.DB_NAME || 'estadisticas',
  };
  
  const crypto_seed = 'some_random_characters constttt SECRET="U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy"';
  module.exports = {
    db,
    crypto_seed,
  };