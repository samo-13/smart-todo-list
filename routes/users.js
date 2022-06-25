/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const bcrypt = require('bcrypt');
const express = require('express');
const {reset} = require('nodemon');
const router = express.Router();

module.exports = (db) => {
  // login routes
  router.post('/login', (req, res) => {
    // const {email, password} = req.body;
    const email = 'billywong@outlook.com';
    const password = 'password';

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(data => {
        if (data.rowCount > 0 && bcrypt.compareSync(password, data.rows[0].password)) {
          req.session.userId = data.rows[0].id; // set cookies
          res.send(data.rows[0]);
        } else {
          res.status(400).send('<h1>Please check your email and password</h1>');
        }
      }).catch(err => {
        res
          .status(500)
          .json({error: err.message});
      });
  });

  router.post('/logout', (req, res) => {
    req.session = null; // remove browser cookies
    res.render('index');
  });

  router.get('/login', (req, res) => {
    if (req.session.userId) {
      db.query(`SELECT * FROM users WHERE id = $1`, [req.session.userId])
        .then(data => res.send(data.rows[0]))
        .catch(err => {
          res
            .status(500)
            .json({error: err.message});
        });
    } else {
      res.status(400).send('<h1>Please log in.</h1>');
    };
  });

  // register routes
  router.post('/register', (req, res) => {
    // const {name, email, password, avatar_url} = req.body
    const [name, email, password, avatar_url] = ['Jon Smith', 'jon-smith3@hotmail.com', 'myPassword', null];

    if (!name || !email || !password) return res.status(400).send('<h1>Please fill in all necessary fields.</h1>');

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(data => {
        if (data.rowCount > 0) {
          res.status(400).send('<h1>This email has been registered.</h1>');
        } else {
          db.query(`INSERT INTO users (name, email, password, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *`, [name, email, bcrypt.hashSync(password, 10), avatar_url])
            .then(data => {
              res.status(201).send(data.rows[0]);
            })
            .catch(err => {
              res
                .status(500)
                .json({error: err.message});
            });
        }
      });
  });

  return router;
};
