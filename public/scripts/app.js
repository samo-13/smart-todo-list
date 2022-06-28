// Client facing scripts here

// index page show all lists in individual container
$(document).ready(function() {
  console.log('HI, FROM DOCUMENT.READY FUNCTION')

  // fake list object/data
  const listsData =
  [
    {
        "id": 2,
        "user_id": 1,
        "name": "Summer Plan",
        "icon_url": null
    },
    {
        "id": 5,
        "user_id": 1,
        "name": "Fall Plan",
        "icon_url": null
    },
    {
        "id": 8,
        "user_id": 1,
        "name": "Winter Plan",
        "icon_url": null
    }
]

  const createListElement = (list) => {
    console.log('Inside createListElement')
    console.log('listsData[i].name:', list.name)
    // code creating the list element
    const $list =
        $(`
        <div class="list_container" onclick="location.href='/list:id';" style="cursor: pointer;">
          <article>
          <div class="list_left">
            <h2 id="list_name">${list.name}</h2>
          </div>
          </div>
          </article>
        </div>
      `);
      console.log('createListElement:', $list)

    return $list;
  };

  // const loadLists = function() {
  //   console.log('loadLists function')

  //   $.ajax({
  //     url: '/lists',
  //     method: 'GET'
  //   })
  //     .then(function(lists) {
  //       console.log('Success: See lists', lists);
  //       renderLists(lists);
  //     });
  // };

  const renderLists = () => {
    console.log('renderLists lists:', listsData)
    for (let i = 0; i < listsData.length; i++) { // loops through lists

      console.log('renderLists lists:', listsData);
      console.log('renderLists lists[i]:', listsData[i]);

      let list = listsData[i];
      list = createListElement(list);

      console.log('renderLists createListElement list:', list);
      $('.lists').append(list);// takes return value and appends it to the listscontainer
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }
  renderLists(listsData);
    // loadLists()
  });
