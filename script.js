// Retrieve form and button elements by their IDs
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Initialize task data from localStorage or set as an empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {}; // Store the task being edited

// Utility function to remove special characters from a string
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '');
};

// Add or update a task in the task list
const addOrUpdateTask = () => {
   if (!titleInput.value.trim()) {
    alert("Please provide a title"); // Ensure title is not empty
    return;
  }

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  
  // Create a task object
  const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`, // Unique ID
    title: removeSpecialChars(titleInput.value), // Title with special characters removed
    date: removeSpecialChars(dateInput.value), // Date
    description: removeSpecialChars(descriptionInput.value), // Description
  };

  // Add the task to the beginning of the array or update an existing one
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj); // Add new task
  } else {
    taskData[dataArrIndex] = taskObj; // Update existing task
  }

  // Save tasks to localStorage and update the task container
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset(); // Reset form and state
};

// Update the task container with the current tasks
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; // Clear the container

  // Loop through task data and append task elements to the container
  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `);
    }
  );
};

// Delete a task
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove(); // Remove task element from DOM
  taskData.splice(dataArrIndex, 1); // Remove task from array
  localStorage.setItem("data", JSON.stringify(taskData)); // Update localStorage
};

// Edit a task
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex]; // Set currentTask to the selected task

  // Populate form with task details
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task"; // Change button text to "Update Task"
  taskForm.classList.toggle("hidden"); // Show the task form
};

// Reset the form and current task state
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task"; // Reset button text
  titleInput.value = ""; // Clear form inputs
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden"); // Hide the task form
  currentTask = {}; // Clear current task
};

// Populate the task container on page load if there are existing tasks
if (taskData.length) {
  updateTaskContainer();
}

// Event listener to open the task form
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// Event listener to close the task form with confirmation
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value; // Check if inputs have values
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description; // Check if values were modified

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal(); // Show confirmation dialog
  } else {
    reset(); // Reset form if no changes
  }
});

// Event listener for cancel button in confirmation dialog
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Event listener for discard button in confirmation dialog
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset(); // Reset form
});

// Prevent form submission and handle task addition/updating
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  addOrUpdateTask(); // Add or update task
});
