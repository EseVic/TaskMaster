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
      deleteButton.textContent = 'Delete';
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
    document.getElementById('toggleShowAllButton').textContent = 'Show All Tasks';
  } else {
    displayItems(false);
    showAll = true;
    document.getElementById('toggleShowAllButton').textContent = 'Hide All Tasks';
  }
});

// Function to mark an item as completed
function completeItem(index) {
  items[index].completed = !items[index].completed;
  displayItems();
}

// Initial call to display items when the page loads
displayItems();
