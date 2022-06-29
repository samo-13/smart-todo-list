// Client facing scripts here

// ------------------------------------------------------------------------------------------------
// show one list in individual container
// ------------------------------------------------------------------------------------------------
console.log('hello@@@')
$(document).ready(function() {

  console.log('HI, FROM DOCUMENT.READY FUNCTION')

  const createListElement = (list) => {
    console.log('Inside createListElement')
    // console.log('lists[i].name:', list.name)
    // code creating the list element
    const $list =
        $(`
        <div class="list_container">
          <h2 id="list_name">${list.name}</h2>
        </div>

      `);

    console.log('createListElement:', $list)

    return $list;
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
    const $list = createListElement(listData.list);
    console.log("list in renderlist", $list)

    $('.list').append($list);
  };

    loadList()
  });
