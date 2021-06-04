var express = require('express');
var router = express.Router();
var md5 = require('md5');

var conn = require('../connection');

/* GET home page. */
router.get('/login', function(req, res, next) {
  const post = req.body;

  const user = {
    userName: post.userName,
    password: md5(post.password),
    accessToken: 'hackantos-' + Math.random()
  }

  return res.status(200).json(user);

  /*conn.query('SELECT * FROM users WHERE username = $1 AND password = $2', [post.userName, post.password], async (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });*/
});

router.get('/', async function(req, res, next) {
  conn.query('select b.*, a."timestamp", a.lat, a.long, a.speed, a.altitude, a.direction from telematics_time_series a '+
  'join trucks b on a.truck_id = b.id '+
  'where lat is not null and long is not null '+
  'ORDER BY a.timestamp desc '+
  'limit 100', (error, results) => {
      if (error) {
        throw error
      }
      const fill = results.rows.reduce((lama, sekarang) => {
          const x = lama.find(item => item.id === sekarang.id);
          if (!x) {
              return lama.concat([sekarang]);
          } else {
              return lama;
          }
      }, []);
      res.status(200).json(fill);
    });
});

module.exports = router;
