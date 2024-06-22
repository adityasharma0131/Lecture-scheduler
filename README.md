# Online Lecture Scheduler

## Overview

The Online Lecture Scheduler is a web application designed to manage courses, instructors, lectures, and user authentication. It allows administrators to register courses, manage instructors, schedule lectures, and handle user registrations and logins.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: bcrypt for password hashing
- **Other Tools**: Axios for API calls, react-router-dom for client-side routing, react-hot-toast for notifications

## Project Structure

1. **Frontend**
   - **Components**:
     - **Login**: Handles user login with authentication for admins and instructors.
     - **Register**: Allows registration of new admin users.
     - **Admin Pages**: Includes pages for managing courses and instructors.
     - **Instructor Pages**: Displays lecture schedules for instructors.
     - **Error Page**: Simple 404 error page.

2. **Backend**
   - **Express Server**: Handles API requests and serves static files.
   - **Routes**:
     - `/login`: Authenticates users (admins and instructors).
     - `/register-admin`, `/register-instructor`: Registers new admin and instructor users.
     - `/register-course`: Registers new courses.
     - `/register-lecture`: Registers new lectures.
     - `/courses`, `/instructors`, `/lectures`: Retrieves lists of courses, instructors, and lectures from the database.
   - **Database Models**:
     - **User**: Stores admin and instructor details.
     - **Course**: Stores course information (name, level, description, image).
     - **Lecture**: Stores lecture details (course, instructor, date).

3. **Database**
   - **MongoDB Atlas**: Hosts the database for storing user data, courses, and lecture schedules.

## Functionalities

1. **User Authentication**
   - Admin and instructor login with authentication.
   - Registration for new admin and instructor accounts.

2. **Admin Dashboard**
   - Manage courses: Add new courses, view existing courses.
   - Manage instructors: Add new instructors, view existing instructors.

3. **Instructor Dashboard**
   - View scheduled lectures.

4. **Course Registration**
   - Admins can register new courses with details such as name, level, description, and image.

5. **Lecture Scheduling**
   - Admins can schedule lectures for courses, assigning instructors and dates.

## How to Run the Project

### Prerequisites

- Node.js installed on your machine.
- MongoDB Atlas account with a cluster set up.

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
