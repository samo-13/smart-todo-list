// Client facing scripts here

// ------------------------------------------------------------------------------------------------
// show one list in individual container
// ------------------------------------------------------------------------------------------------

$(document).ready(function() {

  console.log('HI, FROM DOCUMENT.READY FUNCTION')

  const createListElement = (task) => {
    console.log('Inside createListElement')

    const listName = task.list_name;
    const taskName = task.task_name;
    console.log('listName', listName);
    console.log('taskName', taskName);

    const $list =
        $(`
        <div class="list_container">
          <article>
            <div class="task_left">
              <input type="checkbox" id="check_task">
              <h2 id="task_name">${taskName}</h2>
              <i class="fa-solid fa-book"></i>
          </div>
          <div class="task_right">
              <a id="task_priority" href="#"><i class="fa-solid fa-star"></i></a>
              <a id="task_edit" href="#"><i class="fa-solid fa-pen-to-square"></i></a>
              <a id="task_delete" method="DELETE" action="" href="/"><i class="fa-solid fa-trash-can"></i></a>
          </div>
          </article>
        </div>
      `);

    console.log('createListElement:', $list)

    return $list;
  };

  // IMPLEMENT TO LOAD TASKS/ONE LIST USING AJAX (SIMILAR TO TWEETER)

  const loadList = function() {
    console.log('loadList function')
    var listId = $("#list_id").val();

    $.ajax({
      url: `/api/lists/${listId}`,
      method: 'GET',
      dataType: "json"
    })
      .then(function(list) {
        console.log('Success: See list', list);
        renderList(list);
      });
  };

  const renderList = (listData) => {
    //loops through tasks and appends

    const list = listData.list
    console.log("list data", list);

    for (let i = 0; i < list.length; i++) { // loops through list

      console.log('task', list[i]);

      let task = list[i];
      task = createListElement(task);

      console.log('created element task', task);
      $('.list').append(task);// takes return value and appends it to the listscontainer
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }

  };

    loadList()
  });
