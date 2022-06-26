const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // --------------------------------------------------------------------------------------------------
  // GET /task --- view form to create task

  // router.get("/", (req, res) => { // /task isn't needed - use just /
  //   // return all tasks that belong to a users list

  // });

  // --------------------------------------------------------------------------------------------------
  // POST /task --- create new task

  router.post("/", (req, res) => { // /task isn't needed - use just /
    // uncomment line below when app is ready + remove dummy data
    // console.log('REQ.SESSION:', req.session);
    // const { userId } = req.session;

    // dummy data without priority
    const list_id = 1
    const category_id = 1
    const name = 'Seinfeld'
    const create_at = '2022-05-02'
    const priority = false
    const userId = 1;

    // dummy data with priority
    // const list_id = 3
    // const category_id = 2
    // const name = 'Taco Bell'
    // const create_at = '2022-05-02'
    // const priority = true

    // make sure user is logged in
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    // uncomment line below when app is ready + remove dummy data
    // const { list_id, category_id, name, create_at, priority } = req.body; // do we include category_id here? we will be using API to generate
    // category_id will likely not be needed depending if we use a method to get category or not
    if (!list_id || !category_id  || !name || !create_at) { // include priority? will either be true or false as it's optional
      return res.status(401).send("<h1>Please ensure all required fields are populated!</h1>"); // can change to be more specific
    }

    // run database query, then
    db.query(
      `INSERT into tasks (list_id, category_id, name, create_at, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [list_id, category_id, name, create_at, priority]
      )
      .then(data => {
        const task = data.rows[0]; // array comes back as recently created task
        res.status(201).json({ message: "Task created.", task });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  // --------------------------------------------------------------------------------------------------
  // PUT /task/:id --- edit one task

  router.put("/:id", (req, res) => { // /task/:id isn't needed - use just /:id
    // const { taskId } = req.params.id;
    // const { list_id, category_id, name, create_at, priority } = req.body; //is this correct?
    // const { userId } = req.session;

    // dummy data
    const taskId = 1
    const list_id = 1
    const category_id = 1
    const name = 'Changed Name'
    const create_at = '2022-05-02'
    const priority = false
    const userId = 1;

    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(
      // `UPDATE tasks SET name = $2, category_id = $3, name = $4, create_at = $5, priority = $6 WHERE id = $1`,
      `UPDATE tasks SET category_id = $2, name = $3, create_at = $4, priority = $5 WHERE id = $1`, // do wew want to update create_at on edit?
      [taskId, category_id, name, create_at, priority]
      )
      .then(data => {
        const task = data.rows[0];
        if (!task) {
          return res.status(404).send("<h1>Task not found!</h1>");
        }
        res.status(200).json({ message: "Task updated.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // --------------------------------------------------------------------------------------------------
  // DELETE /task/:id -- delete one task

  // use
  router.delete("/:id", (req, res) => { // /task/:id isn't needed - use just /:id
    // const { taskId } = req.params.id;
    // const { userId } = req.session;

    const taskId = 1;
    const userId = 1;

    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(`DELETE FROM tasks WHERE id = $1`,
      [taskId]
      )
      .then(data => {
        const task = data.rows[0];
        if (!task) {
          return res.status(404).send("<h1>Task not found!</h1>");
        }
        res.status(204).json({ message: "Task deleted." });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
