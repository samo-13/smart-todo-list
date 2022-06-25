const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GET /task --- view form to create task

  router.get("/", (req, res) => { // /task isn't needed - use just /

  });

  // POST /task --- create new task

  router.post("/", (req, res) => { // /task isn't needed - use just /

  });

  // PUT /task/:id --- edit one task

  router.put("/:id", (req, res) => { // /task/:id isn't needed - use just /:id

  });

  // DELETE /task/:id -- delete one task

  router.delete("/:id", (req, res) => { // /task/:id isn't needed - use just /:id

  });

  return router;
};
