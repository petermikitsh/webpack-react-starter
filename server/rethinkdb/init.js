import r from 'rethinkdb'
import db from './database'

db(function (conn) {
  r.dbCreate('webpackreactstarter').run(conn, function (err, res) {
    r.db('webpackreactstarter').tableCreate('names').run(conn, function(err, res) {
    });
  });
});
