# Group Task Board

## Description

Group Task Board is a web application designed to help a group keep track of tasks and stay motivated.

Users can create an account, log in, and create tasks for the group to see. Each task includes a title, description, completion status, and creation date.

Only the user who created a task can modify it. Task creators can:

- Create tasks
- Complete tasks
- Uncomplete tasks
- Edit tasks
- Delete tasks

Other users can still view the tasks but cannot modify someone else's tasks.

The application uses React for the frontend and Supabase for the database and user authentication.

## Technologies Used

- React
- Vite
- JavaScript
- Supabase
- React Router
- CSS

## Deployed Application

The application will be deployed using Netlify.

**Deployed application:**  
[https://grouptaskshootcamp.netlify.app/]

## Features

- User registration
- User login and logout
- View group tasks
- Create new tasks
- Edit tasks
- Complete and uncomplete tasks
- Delete tasks
- User-specific task permissions
- Responsive task card layout

## Database

The application uses a Supabase database to store tasks and user information.

Each task contains:

- Task ID
- User ID
- Title
- Description
- Completion status
- Creation date
- Username

Supabase Row Level Security is used to make sure users can only modify tasks that they created.

## Demo Video

[https://youtu.be/I8DYxccTENE]