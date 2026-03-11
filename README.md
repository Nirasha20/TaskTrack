# TaskTrack

TaskTrack is a **full-stack task management application** designed to help individuals and teams organize, track, and manage their daily activities efficiently.

It includes a robust backend, interactive frontend, and a comprehensive API, making it easy to set up and extend.

---

# Project Overview

TaskTrack enables users to:

- Create, update, and delete tasks
- Assign priorities and deadlines
- Track task completion status
- Filter and sort tasks based on multiple criteria


### Tech Stack

**Frontend:** Next.js (React-based) 
**Backend:** Spring Boot (Java)  
**Database:** MySQL

---


---

# Setup Instructions

## Prerequisites

Make sure the following are installed:

Node.js (v14 or higher) and npm

Java 17+

MySQL Server (local or remote)

Git

---

# Clone the Repository

```bash
git clone https://github.com/Nirasha20/TaskTrack.git
cd TaskTrack
```

---

# Backend Setup


Navigate to backend folder:

cd backend

Update the database configuration (see Database Configuration section).

Run the backend:

./mvnw spring-boot:run

or if Maven is installed globally:

mvn spring-boot:run

---

# Frontend Setup



Navigate to frontend folder:

cd ../frontend

Install dependencies:

npm install

Create .env.local file and configure API URL:

NEXT_PUBLIC_API_URL=http://localhost:8080/api

Start the frontend:

npm run dev

The application will run at:

http://localhost:3000

---



---

# Database Configuration

TaskTrack uses MySQL for storing data.

Step 1: Create Database
CREATE DATABASE tasktrack;
Step 2: Update application.properties

File location:

backend/src/main/resources/application.properties

Add your MySQL credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/tasktrack
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

The backend will automatically create required tables on first start.

# Database Schema

## User Schema

```javascript
CREATE TABLE tasks ( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description TEXT, priority ENUM('Low', 'Medium', 'High'), deadline DATETIME, status ENUM('Pending', 'Completed', 'In Progress'), assignee_id INT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP );
```

---

## Task Schema

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  priority: String,
  deadline: Date,
  status: String, // Pending | In Progress | Completed
  assignee: ObjectId, // reference to User
  createdAt: Date,
  updatedAt: Date
}
```

User Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

---

# API Documentation

TaskTrack backend exposes a RESTful API.

API documentation is generated using SpringDoc OpenAPI (Swagger).

Access the API documentation at:

http://localhost:8080/swagger-ui.html

---

# API Endpoints

### Get All Tasks

```
GET /api/tasks
```

---

### Get Task by ID

```
GET /api/tasks/:id
```

---

### Create Task

```
POST /api/tasks
```

Body:

```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "High",
  "deadline": "2026-03-15",
  "assignee": "user_id"
}
```

---

### Update Task

```
PUT /api/tasks/:id
```

Body:

```json
{
  "title": "Updated title",
  "status": "Completed"
}
```

---

### Delete Task

```
DELETE /api/tasks/:id
```

---

### User Login

```
POST /api/users/login
```

Body:

```json
{
  "email": "user@email.com",
  "password": "password"
}
```

---

# License

This project is licensed under the **MIT License**.

---

# Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a Pull Request

---

# Contact

For questions or support:

GitHub:  
https://github.com/Nirasha20

Or open an **issue in the repository**.
