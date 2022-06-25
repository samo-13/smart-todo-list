/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    // const email = 'billywong@outlook.com';
    // const password = 'password';

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
    req.session = null; // remove broswer cookies
    res.render('index');
  });

  return router;
};
