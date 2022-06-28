// Client facing scripts here

// ------------------------------------------------------------------------------------------------
// index page show all lists in individual container
// ------------------------------------------------------------------------------------------------

$(document).ready(function() {
  console.log('HI, FROM DOCUMENT.READY FUNCTION')


  const createTaskElement = (task) => {
    console.log('Inside createTistElement')
    console.log('tasks[i].name:', task.name)
    // code creating the task element
    const $task =
        $(`
        <div class="list_container">
        <article>
            <div class="task_left">
              <input type="checkbox" id="check_task">
              <h2 id="task_name">Task Name</h2>
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
      console.log('createListElement:', $list)

    return $list;
  };

  // IMPLEMENT TO LOAD LISTS USING AJAX (SIMILAR TO TWEETER)

  const loadLists = function() {
    console.log('loadLists function')

    $.ajax({
      url: '/api/lists',
      method: 'GET',
      dataType: "json"
    })
      .then(function(lists) {
        console.log('Success: See lists', lists);
        renderLists(lists);
      });
  };

  const renderLists = (listData) => {
    const lists = listData.lists
    console.log('renderLists lists:', lists)

    for (let i = 0; i < lists.length; i++) { // loops through lists

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
