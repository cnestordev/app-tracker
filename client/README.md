# Job Search Tracker

## A simple web application that helps you track your job search progress.

### Features

- Add new job applications with information such as job role, company, location, date, source, status, commute, and more.

- Edit and delete existing job applications.

- Categorize job applications into custom categories to better track your progress.
- Filter job applications by category, status, commute, and more.
- Authentication with passport.js and user registration and login.
- Simple and intuitive user interface.

### Technologies Used

- Node.js
- Express.js
- MongoDB and Mongoose
- PassportJS
- Reactjs
- Redux
- Sassy-datepicker

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run npm install to install the dependencies.
4. Create a .env file in the root directory and include the following environment variables: MONGO_URL, NODE_EVN
5. Start the server by running npm start.
6. Navigate to http://localhost:3000 to use the application.

### Usage

1. Create an account or login.
2. Add a new job application by clicking the "Add Application" button and filling out the form.
3. Edit or delete existing job applications by clicking the corresponding buttons in the application list.
4. Categorize job applications by clicking the "Categories" button and adding new categories or assigning job applications to existing categories.
5. Filter job applications by category, status, commute, and more by clicking the "Filter" button and selecting the desired filters.

### Dropdown Component

To use the Dropdown component in your own project, follow these steps:

1. Import the Dropdown component in your desired file:
2. Pass the necessary props to the Dropdown component:

```javascript
<Dropdown
  title="Header Title"
  listitems={["Item 1", "Item 2", "Item 3"]}
  selectedHandler={(selected) => console.log(`Selected item: ${selected}`)}
/>
```

- The title prop specifies the text to be displayed in the header of the dropdown.
- The listitems prop is an array of strings representing the items to be displayed in the dropdown list.
- The selectedHandler prop is a callback function that will be called with the selected item as its argument when an item is clicked in the dropdown list
