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
    const taskId = task.task_id
    const listId = $("#list_id").val();
    console.log('listName', listName);
    console.log('taskName', taskName);
    console.log('taskId', taskId);
    console.log('listId', listId);

    const $list =
        $(`
        <div class="list_container">
          <article>
            <div class="task_left">
              <input type="checkbox" id="check_task-${taskId}">
              <h2 id="task_name">${taskName}</h2>
              <i class="fa-solid fa-book"></i>
          </div>
          <div class="task_right">
              <a id="task_priority" href="#"><i class="fa-solid fa-star"></i></a>
              <span class="edit_task_link" id="editTaskIconLink-${taskId}"><i class="fa-solid fa-pen-to-square" id="editIconModalLink"></i></span>
              <form method="post" action="/api/tasks/${taskId}"/delete?_method=DELETE><a id="task_delete" href="/list/${listId}"><i class="fa-solid fa-trash-can"></i></a></form>
          </div>
          </article>
        </div>


        <script>
            $('.list').on("click", '#editTaskIconLink-${taskId}', function() {

              console.log('The edit icon was clicked!');
              console.log('TASK ID:', ${taskId})

              const closeEditModalButton = document.getElementById("closeEditModalButton");

              let displayEditModal = function() {
                console.log('Hello from displayEditModal function');
                editTaskModal.style.display = 'block';
              };

              let exitEditModal = function() {
                console.log('Hello from closeEditModal function');
                editTaskModal.style.display = 'none';
              };

              displayEditModal();
              closeEditModalButton.addEventListener('click', exitEditModal);
            });


        </script>
      `);

    console.log('createListElement:', $list)

    return $list;
  };

  // IMPLEMENT TO LOAD TASKS/ONE LIST USING AJAX (SIMILAR TO TWEETER)

  const loadList = function() {
    console.log('loadList function')
    const listId = $("#list_id").val();

    $.ajax({
      url: `/api/lists/${listId}`,
      method: 'GET',
      dataType: "json"
    })
      .then(function(list) {
        $("#list_name").text(list.list[0].list_name)
        //grabbing list name element from the DOM and setting its text

        console.log('Success: See list', list.list[0]);
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
      $('.list').append(task);// appending to the DOM
      //takes return value and appends it to the listscontainer
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }

  };
    loadList()
  });
