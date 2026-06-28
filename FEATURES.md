# Features Documentation

## Todo List Page
The Todo List page is the main page of the application.

Functionalities:
- Displays all todos
- Allows user to add a new todo
- Allows user to mark todo as completed or pending
- Allows user to delete a todo
- Allows user to open todo details page

## Todo Details Page
The Todo Details page displays information about one selected todo.

Functionalities:
- Receives todo ID through query parameter
- Fetches todo details from backend API
- Displays todo ID, title, description, and status
- Provides link to go back to Todo List page

## Backend API Functionalities
The backend is implemented using Node.js and Express.js.

Functionalities:
- Create todo
- Read all todos
- Read single todo
- Update todo
- Delete todo

## Data Storage
The application stores todos in a JSON file named `todos.json`.

## User Interface
The application has a modern UI with:
- Gradient background
- Card-based todo layout
- Styled buttons
- Clean spacing
- Responsive container