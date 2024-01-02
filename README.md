# React Todo App with API

> Here is [ToDoApp DEMO](https://BetterSol.github.io/react_todo-app-with-api/)

React Todo App brings enhanced features for a seamless task management experience. Now, in addition to adding and deleting tasks, users can effortlessly toggle and rename todos with a user-friendly interface.

The app includes:

## Todo Toggling

- A loader overlay elegantly covers todos while awaiting API responses.
- Instant status change upon successful toggling.
- Informs users with a notification in case of API errors.

## Toggle All Feature

- The 'toggleAll' button activates only if all todos are completed.
- Toggle the status for all todos with a single click.
- Efficiently manages API requests, sending only for changed todos.

## Todo Renaming

- You can edit to-do titles with ease through double-clicking.
- Intuitive edit form replaces the title and remove button.
- Changes are saved on form submit (Enter key) or onBlur.
- Cancels editing on Esc key press or if the new title matches the old one.
Allows deletion if the new title is empty, akin to the 'x' button.
User-friendly loader displays during API responses for title updates.
Communicates errors, whether updating or deleting todos.
