const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // --------------------------------------------------------------------------------------------------
  // GET /task --- view form to create task
  // filtered list of tasks for category? keep as stretch - revisit

  // router.get("/", (req, res) => { // /task isn't needed - use just /
  //   // return all tasks that belong to a users list

  // });

  // --------------------------------------------------------------------------------------------------
  const generateCategory = require('../lib/generateCategory');

  // POST /task --- create new task
  router.post("/", (req, res) => { // /task isn't needed - use just /
    // uncomment line below when app is ready + remove dummy data
    // console.log('REQ.SESSION:', req.session);
    // const { userId } = req.session;
    // const { task_name } = req.body;

    console.log('HELLO FROM POST /API/TASKS');
    // dummy data without priority
    // const list_id = 1;
    // // const category_id = 1;
    // const name = 'Stranger Things';
    // const create_at = '2022-05-02';76
    // const priority = false;
    const userId = 1;

    // // dummy data with priority
    const list_id = 3;
    // const category_id = 2;
    const name = 'Taco Bell';
    const create_at = '2022-05-02';
    const priority = true;

    // make sure user is logged in
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    // uncomment line below when app is ready + remove dummy data
    // const { list_id, category_id, name, create_at, priority } = req.body; // do we include category_id here? we will be using API to generate
    // category_id will likely not be needed depending if we use a method to get category or not
    if (!list_id || /*!category_id ||*/ !name || !create_at) { // include priority? will either be true or false as it's optional
      return res.status(401).send("<h1>Please ensure all required fields are populated!</h1>"); // can change to be more specific
    }

    const categories = ['Film / Series', 'Books', 'Restaurants / Cafes / etc.', 'Products'];
    // fetch openai to sort new task into appropriate category
    generateCategory(name)
      .then(resp => {
        categories.forEach(category => {
          if (resp.data.choices[0].text.includes(category)) {
            // query db to retrieve category_id
            db.query(`SELECT id FROM categories WHERE name = $1`, [category])
              .then(data => {
                const category_id = data.rows[0].id;

                // make new task and insert it to db as soon as category_id is found
                db.query(
                  `INSERT into tasks (list_id, category_id, name, create_at, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                  [list_id, category_id, name, create_at, priority]
                )
                  .then(data => {
                    console.log('CONSOLE 1:', data.rows[0]);
                    const task = data.rows[0]; // array comes back as recently created task
                    res.status(201).json({message: "Task created.", task});
                  })
                  .catch(err => {
                    res
                      .status(500)
                      .json({error: err.message});
                  });
              });
          }
        });
      })
      .catch(err => console.log(err));

    // const category_id = null;
    // run database query, then
    //   db.query(
    //     `INSERT into tasks (list_id, category_id, name, create_at, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    //     [list_id, category_id, name, create_at, priority]
    //   )
    //     .then(data => {
    //       console.log('CONSOLE 1:', data.rows[0]);
    //       const task = data.rows[0]; // array comes back as recently created task
    //       res.status(201).json({message: "Task created.", task});
    //     })
    //     .catch(err => {
    //       res
    //         .status(500)
    //         .json({error: err.message});
    //     });
  });



  // --------------------------------------------------------------------------------------------------
  // PUT /task/:id --- edit one task

  router.put("/:id", (req, res) => { // /task/:id isn't needed - use just /:id
    let taskId = req.params.id;
    // const { list_id, category_id, name, create_at, priority } = req.body; //is this correct?
    // const { userId } = req.session;
    const { name } = req.body;

    // dummy data
    // const taskId = 4
    // const list_id = 1
    const category_id = null;
    // const name = 'Changed Name 7';
    const priority = null;
    const userId = 1;

    console.log('NAME:', name)

    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(

      `UPDATE tasks SET category_id = $2, name = $3, priority = $4 WHERE id = $1 RETURNING *`, // do we want to update create_at on edit?
      [taskId, category_id, name, priority])

      .then(data => {

        const task = data.rows[0];
        console.log('DATA:', data);
        console.log('DATA.ROWS:', data.rows);
        console.log('TASK:', task);

        if (!task) {
          return res.status(404).send("<h1>Task not found!</h1>");
        }
        res.status(200).json({message: "Task updated.", taskId});
      })
      .catch(err => {
        res
          .status(500)
          .json({error: err.message});
      });
  });

  // --------------------------------------------------------------------------------------------------
  // DELETE /task/:id -- delete one task

  router.delete("/:id/delete", (req, res) => { // /task/:id isn't needed - use just /:id
    let taskId = req.params.id;
    // const { userId } = req.session;

    // const taskId = 6;
    const userId = 1;

    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>"); // should this be listId?
    }

    db.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`,
      [taskId]
    )
      .then(data => {
        console.log('DELETE:', data.rows[0]);
        const task = data.rows[0];
        if (!task) {
          return res.status(404).send("<h1>Task not found!</h1>");
        }
        res.status(204).json({message: "Task deleted."}); // message isn't logged due to 204 No Content response https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
      })
      .catch(err => {
        res
          .status(500)
          .json({error: err.message});
      });
  });

  return router;
};
