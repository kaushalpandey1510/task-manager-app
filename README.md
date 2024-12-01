# Task Manager App

This project is a **Task Manager** application built with HTML, CSS, and JavaScript. It enables users to create, edit, and delete tasks with specific titles, dates, and descriptions. All task data is saved locally using `localStorage`, ensuring persistence across browser sessions.

## Features

- **Add Tasks**: Create new tasks with a title, date, and description.
- **Edit Tasks**: Modify existing tasks.
- **Delete Tasks**: Remove tasks from the list.
- **Persistence**: Tasks are stored in `localStorage` for persistence across page reloads.
- **Validation**: Ensures tasks have a title before being added or updated.
- **Confirmation Dialog**: Prompts the user before closing the form with unsaved changes.

## File Structure

```
.
├── index.html      # HTML structure for the app
├── styles.css      # Styles for the app
└── app.js          # Main JavaScript logic
```

## How to Use

1. **Open the App**: Open the `index.html` file in your browser.
2. **Add Task**: 
   - Click the "Add Task" button to open the task form.
   - Enter the task details (title is mandatory).
   - Click "Add Task" to save it.
3. **Edit Task**:
   - Click the "Edit" button on a task.
   - Modify the details in the form and click "Update Task" to save changes.
4. **Delete Task**:
   - Click the "Delete" button on a task to remove it from the list.
5. **Close Form**:
   - If the form contains unsaved changes, a confirmation dialog will appear.

## Technical Overview

### Core Functions

- **`addOrUpdateTask`**:
  - Adds a new task or updates an existing one based on its unique ID.
  - Tasks are validated and stored in `localStorage`.
  
- **`updateTaskContainer`**:
  - Refreshes the task list displayed on the page.
  
- **`deleteTask`**:
  - Removes a task from both the DOM and `localStorage`.

- **`editTask`**:
  - Populates the form with an existing task's data for editing.

- **`reset`**:
  - Clears the form inputs and resets the form state.

### Event Listeners

- Open/close the task form.
- Add/update tasks on form submission.
- Confirm before closing the form with unsaved changes.

## LocalStorage Schema

Tasks are stored as an array of objects in `localStorage` under the key `data`. Each task has the following structure:

```json
{
  "id": "unique-task-id",
  "title": "Task Title",
  "date": "Task Date",
  "description": "Task Description"
}
```

## Installation and Setup

1. Clone or download the repository.
2. Open `index.html` in a browser.

No additional dependencies are required.

## Future Enhancements

- **Filter and Sort**: Add functionality to filter tasks by date or title.
- **Search**: Implement a search feature for tasks.
- **Themes**: Introduce light and dark mode themes.
- **Backend Integration**: Allow tasks to be synced to a server for multi-device access.


---

Enjoy managing your tasks efficiently! 😊# task-manager-app
