const express = require('express');
const router  = express.Router();

///add validation! see fruits model
//https://github.com/pedroagont/webflex-lectures-21mar/blob/main/m05w12/controllers/FruitsController.js
//add status codes

//do we need to check the user_id of a specific list if each list has its own id?? probably not?
//^ see queries delete, edit one list, view one list

module.exports = (db) => {

  //user create new list
  router.post("/", (req, res) => {
    const { userId } = req.session;
    //add validation
    const { name, icon_url } = req.body;
    //add validation

    db.query(
      `INSERT into lists (user_id, name, icon_url) VALUES ($1, $2, $3) RETURNING *`,
      [userId, name, icon_url])
      .then(data => {
        const list = data.rows[0];
        res.status(201).json({ message: "List created.", list });
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

    db.query(
      `SELECT * FROM lists WHERE user_id = $1`,
      [userId])
      .then(data => {
        const lists = data.rows;
        res.status(200).json({ message: "Here are all of your lists!", lists });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //view one list for user
  router.get("/:id", (req, res) => {
    const { listId } = req.params.id;
    const { userId } = req.session;
    //add validation

    db.query(
      `SELECT * FROM lists WHERE id = $1 AND user_id = $2`,
      [listId, userId])
      .then(data => {
        const list = data.rows[0];
        res.status(200).json({ message: "Here is your list.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //edit one list
  router.put("/:id", (req, res) => {
    const { listId } = req.params.id;
    const { name, icon_url } = req.body //is this correct?
    //add validaition

    db.query(
      `UPDATE lists SET THE VALUES LATER WHERE id = $1`, //set the values here
      [listId, name, icon_url])
      .then(data => {
        const list = data.rows[0];
        res.status(200).json({ message: "List updated.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //deletes one list
  router.delete("/:id", (req, res) => {
    const { listId } = req.params.id;

    //add validaition

    db.query(`DELETE FROM lists WHERE id = $1`,
    [listId])
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
