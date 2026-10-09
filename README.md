Student Management System

A responsive Student Management System built using React and JavaScript. This application helps users manage student records through a simple and user-friendly dashboard.

Features

- Dashboard with total, active, and inactive student counts.
- Add new student records.
- View all students in a table.
- Edit existing student details.
- Delete students with confirmation.
- Search students by name, roll number, and email.
- Filter students by department, year, and status.
- Form validation for email, phone number, and duplicate roll numbers.
- Store student records in LocalStorage.
- Responsive user interface.

Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Git and GitHub
- LocalStorage

Student Details

Each student record contains:

- Name
- Roll Number
- Email
- Phone
- Department
- Year
- Status (Active/Inactive)

Installation and Setup

1. Clone the repository:
   
   git clone https://github.com/LIMSI207/Student-management-system.git

2. Open the project folder:
   
   cd Student-management-system

3. Install dependencies:
   
   npm install

4. Start the development server:
   
   npm run dev

5. Open the local URL shown in your terminal.

Data Storage

Student records are stored in the browser's LocalStorage, so the data remains available after refreshing the page in the same browser.

Project Structure

student-management-system/
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md

Future Improvements

- Backend and database integration.
- User authentication.
- Export student records to CSV or PDF.

Author

Limsi Patel