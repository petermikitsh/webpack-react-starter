import fs from 'fs'
import config from '../config'
import r from 'rethinkdb'

export default function (callback) {
  r.connect({
    host: config.rethinkdb.host,
    port: config.rethinkdb.port,
    db: config.rethinkdb.db,
    authKey: config.rethinkdb.authKey,
    ssl: config.rethinkdb.ssl ? {
      ca: fs.readFileSync(config.rethinkdb.ssl.ca, 'utf8')
    } : null
  }, function (err, conn) {
    if (err) throw err;
    callback(conn);
  });
}
