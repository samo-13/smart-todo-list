// Client facing scripts here

// ------------------------------------------------------------------------------------------------
// index page show all lists in individual container
// ------------------------------------------------------------------------------------------------

$(document).ready(function() {
  console.log('HI, FROM DOCUMENT.READY FUNCTION')


  const createTaskElement = (task) => {
    console.log('Inside createTaskElement')
    console.log('tasks[i].name:', task.name)
    // code creating the task element
    const $task =
        $(`
        <div class="list_container">
        <article>
            <div class="task_left">
              <input type="checkbox" id="check_task">
              <h2 id="task_name">${task.name}</h2>
              <i class="fa-solid fa-book"></i>
            </div>
            <div class="task_right">
                <a id="task_priority" href="#"><i class="fa-solid fa-star"></i></a>
                <a id="task_edit" href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                <a id="task_delete" method="DELETE" action="" href="/"><i class="fa-solid fa-trash-can"></i></a>
            </div>
        </div>
      </div>
      `);
      console.log('createListElement:', $task)

    return $task;
  };

  // IMPLEMENT TO LOAD TASKS/ONE LIST USING AJAX (SIMILAR TO TWEETER)

  const loadList = function() {
    console.log('loadList function')

    $.ajax({
      url: '/api/lists/:id',
      method: 'GET',
      dataType: "json"
    })
      .then(function(list) {
        console.log('Success: See list', list);
        renderList(list);
      });
  };

  const renderList = (listData) => {
    const list = listData.lists
    console.log('renderList one list:', list)

    for (let i = 0; i < list.length; i++) { // loops through lists

      console.log('renderLists lists:', lists);
      console.log('renderLists lists[i]:', lists[i]);

      let list = lists[i];
      list = createListElement(list);

      console.log('renderLists createListElement list:', list);
      $('.lists').append(list);// takes return value and appends it to the listscontainer
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }
  // renderLists(listsData);
    loadLists()
  });
