const { query } = require('express');
const express = require('express');
const router  = express.Router();

///add checks for logged in etc?
//where does user id come from? req.params?
//do we need to check the user_id of a specific list if each list has its own id?? probably not?
//^ see queries delete, edit one list, view one list

module.exports = (db) => {

  //user create new list
  router.post("/lists", (req, res) => {
    const values = [req.session.userId, "name", "icon_url"]; //add name and icon_url
    const queryString = `
    INSERT into lists (user_id, name, icon_url)
    VALUES ($1, $2, $3) RETURNING *
    `;

    db.query(queryString, values)
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

  //view all lists for user
  router.get("/lists", (req, res) => {
    const userId = [req.session.userId];
    if (!userId) {
      res.error;
      return;
    }
    const queryString = `
    SELECT * FROM lists
    WHERE user_id = $1
    `;

    db.query(queryString, userId)
      .then(data => {
        const lists = data.rows;
        res.json({ lists });
        //what's happening here with json? compare this with lightbnb files.
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //view one list for user
  router.get("/lists/:id", (req, res) => {
    const values = [req.params, req.session.userId];
    const queryString = `
    SELECT * FROM lists
    WHERE id = $1
    AND user_id = $2
    `;

    db.query(queryString, values)
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
    //where am i pulling new name or new icon url from?
    const values = [req.params, req.session.userId, "new name", "new icon url"];
    const queryString = `
    UPDATE lists
    SET THE VALUES LATER
    WHERE id = $1
    AND user_id = $2
    `;
    //update this query string ^

    db.query(queryString, values)
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
    const values = [req.params, req.session.userId];
    const queryString = `
    DELETE FROM lists
    WHERE id = $1
    `;

    db.query(queryString, values)
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
