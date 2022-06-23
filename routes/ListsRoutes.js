const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //create new list
  router.post("/lists", (req, res) => {
    db.query(`SELECT * FROM lists;`) //update query
      .then(data => {
        const lists = data.rows;
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //view all lists
  router.get("/lists", (req, res) => {
    db.query(`SELECT * FROM lists;`) //update query
      .then(data => {
        const lists = data.rows;
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //view one list
  router.get("/lists/:id", (req, res) => {
    db.query(`SELECT * FROM lists;`)//update query
      .then(data => {
        const lists = data.rows[0];
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //edit one list
  router.put("/lists/:id", (req, res) => {
    db.query(`SELECT * FROM lists;`)//update query
      .then(data => {
        const lists = data.rows[0];
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //deletes one list
  router.delete("/lists/:id", (req, res) => {
    db.query(`SELECT * FROM lists;`)//update query
      .then(data => {
        const lists = data.rows[0];
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
