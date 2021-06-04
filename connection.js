const conn = require('pg').Pool
const DBTest = new conn({
  user: 'caraka_usr',
  host: 'dnuxdb-jkt-01.banpuindo.co.id',
  database: 'carakadb_dev',
  password: 'S3ndm4nDev',
  port: 5432,
});

module.exports = DBTest;