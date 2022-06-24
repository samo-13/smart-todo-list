const express = require('express');
const router  = express.Router();

///add validation! see fruits model
//https://github.com/pedroagont/webflex-lectures-21mar/blob/main/m05w12/controllers/FruitsController.js
//add status codes
 //Add string and Values directly to db query

//do we need to check the user_id of a specific list if each list has its own id?? probably not?
//^ see queries delete, edit one list, view one list

module.exports = (db) => {

  //user create new list
  router.post("/", (req, res) => {
    const { userId } = req.session;
    //add validation

    const values = [userId, "name", "icon_url"]; //add name and icon_url
    const queryString = `
    INSERT into lists (user_id, name, icon_url)
    VALUES ($1, $2, $3) RETURNING *
    `;

    db.query(queryString, values)
      .then(data => {
        const list = data.rows[0];
        res.json({ message: "List created.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //view all lists for user
  router.get("/", (req, res) => {
    const { userId } = req.session
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    const queryString = `
    SELECT * FROM lists
    WHERE user_id = $1
    `;
    const values = [userId]

    db.query(queryString, values)
      .then(data => {
        const lists = data.rows;
        res.json({ message: "Here are all of your lists!", lists });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //view one list for user
  router.get("/:id", (req, res) => {
    const { userId } = req.session;
    const { listId } = req.params.id;
    //add validaition

    const values = [listId, userId];
    const queryString = `
    SELECT * FROM lists
    WHERE id = $1
    AND user_id = $2
    `;

    db.query(queryString, values)
      .then(data => {
        const list = data.rows[0];
        res.json({ message: "Here is your list.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //edit one list
  router.put("/:id", (req, res) => {
    const { userId } = req.session;
    const { listId } = req.params.id;
    //add validaition

    //where am i pulling new name or new icon url from? form on front end
    const values = [listId, userId, "new name", "new icon url"];
    const queryString = `
    UPDATE lists
    SET THE VALUES LATER
    WHERE id = $1
    AND user_id = $2
    `;
    //update this query string ^

    db.query(queryString, values)
      .then(data => {
        const list = data.rows[0];
        res.json({ message: "List updated.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //deletes one list
  router.delete("/:id", (req, res) => {
    const { userId } = req.session;
    const { listId } = req.params.id;
    //add validaition

    const values = [listId, userId];
    const queryString = `
    DELETE FROM lists
    WHERE id = $1
    `;

    db.query(queryString, values)
      .then(data => {
        // const list = data.rows[0];
        res.status(204).json({ message: "List deleted." })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
