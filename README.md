# Student Management System

A responsive student management dashboard built using React and CSS.

## Features

- Dashboard with total, active, and inactive student counts
- Add new student records
- View student details
- Edit existing student records
- Delete students with confirmation
- Search students by name, roll number, and email
- Filter students by department, year, and status
- Form validation for required fields, email, phone number, and duplicate roll numbers
- LocalStorage for saving student records in the browser
- Success and error notifications
- Reusable React components
- Responsive purple-themed user interface

## Technologies Used

- React
- JavaScript
- CSS
- Vite
- Browser LocalStorage

## Installation

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Data Storage

Student records are stored in the browser's LocalStorage. Data remains available in the same browser unless its storage is cleared or the application changes its storage key. LocalStorage is not a shared database.

## Project Structure

```text
src/
  components/
    Sidebar.jsx
    Header.jsx
    Dashboard.jsx
    StudentTable.jsx
    StudentForm.jsx
    Toast.jsx
    ConfirmDialog.jsx
  utils/
    students.js
  App.jsx
  App.css
```

## Testing

Test adding, editing, deleting, searching, filtering, form validation, and persistence after refreshing the browser.

## Author

Student project — Student Management System
