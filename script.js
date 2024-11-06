// Array to store the list items, initialized from localStorage if available
let items = JSON.parse(localStorage.getItem('items')) || [];
let showAll = true;

// Function to display items in the list
function displayItems(showCompleted = false) {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = '';

  let hasCompletedItems = false;

  items.forEach((item, index) => {
    if (!showCompleted || item.completed) {
      hasCompletedItems = true;
      const li = document.createElement('li');
      li.className = item.completed ? 'completed' : '';

      // Set priority color
      if (item.priority === 'high') {
        li.style.backgroundColor = '#ff1cc';
      } else if (item.priority === 'medium') {
        li.style.backgroundColor = '#fff2cc';
      } else {
        li.style.backgroundColor = '#ccffcc';
      }

      // Create checkbox
      const checkbox = document.createElement('input');
      checkbox.className = 'input-checkbox';
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      checkbox.onchange = () => completeItem(index);

      // Task text
      const taskText = document.createElement('p');
      taskText.textContent = item.text;
      li.appendChild(checkbox);
      li.appendChild(taskText);

      // Priority and friendly due date display
      const details = document.createElement('div');
      details.className = 'task-details';
      details.innerHTML = `
        <span>Priority: ${item.priority}</span>
        ${item.dueDate ? ` | <span>Due: ${formatDueDate(item.dueDate)}</span>` : ''}
      `;
      li.appendChild(details);

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg>
      `;
      deleteButton.className = 'delete-button';
      deleteButton.onclick = () => deleteItem(index);
      li.appendChild(deleteButton);

      itemList.appendChild(li);
    }
  });

  // If no completed items, show a message
  if (showCompleted && !hasCompletedItems) {
    const li = document.createElement('li');
    li.textContent = "No completed tasks yet.";
    li.style.color = 'red';
    itemList.appendChild(li);
  }

  // Update local storage
  localStorage.setItem('items', JSON.stringify(items));
}

// Helper function to format the due date
function formatDueDate(dueDate) {
  const date = new Date(dueDate);
  const today = new Date();
  const timeDifference = date - today;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return `Overdue by ${Math.abs(daysLeft)} days`;
  } else if (daysLeft === 0) {
    return "Due today";
  } else {
    return `Due in ${daysLeft} days`;
  }
}

// Function to delete an item
function deleteItem(index) {
  items.splice(index, 1);
  displayItems();
}

// Event listener for the "Add Task" button
document.getElementById('addButton').addEventListener('click', () => {
  const itemInput = document.getElementById('itemInput');
  const newItem = itemInput.value.trim();
  const prioritySelect = document.getElementById('prioritySelect');
  const dueDateInput = document.getElementById('dueDateInput');

  if (newItem) {
    items.push({
      text: newItem,
      completed: false,
      priority: prioritySelect.value,
      dueDate: dueDateInput.value
    });
    itemInput.value = '';
    dueDateInput.value = '';
    displayItems();
  } else {
    alert('Please enter a valid task.');
  }
});

// Event listener for the "Show Completed Tasks" button
document.getElementById('showCompletedButton').addEventListener('click', () => {
  displayItems(true);
});

// Event listener for the "Toggle Show All Tasks" button
document.getElementById('toggleShowAllButton').addEventListener('click', () => {
  if (showAll) {
    document.getElementById('itemList').innerHTML = '';
    showAll = false;
    document.getElementById('toggleShowAllButton').innerHTML = `

    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-eye-slash"
      viewBox="0 0 16 16">
      <path
        d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path
        d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path
        d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
    </svg>
    `;
  } else {
    displayItems(false);
    showAll = true;
    document.getElementById('toggleShowAllButton').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
    </svg>
    `;
  }
});

// Function to mark an item as completed
function completeItem(index) {
  items[index].completed = !items[index].completed;
  displayItems();
}

// Initial call to display items when the page loads
displayItems();
