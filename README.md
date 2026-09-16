# Edemy LMS

Edemy is a full-stack Learning Management System that supports students and educators. Students can discover courses, view course details, enroll, and watch lectures, while educators can create and manage courses and view enrolled students.

## Features

### Student
- Browse available courses
- Search/filter courses
- View course details
- Enroll in courses
- Track enrollments
- Watch course lectures
- View course progress and ratings

### Educator
- Educator dashboard
- Create and publish courses
- Manage courses and chapters
- Upload course media
- Preview lectures
- View enrolled students

### Platform Integrations
- **Clerk** for authentication and user management
- **Stripe** for payments
- **Cloudinary** for media storage
- **MongoDB** for application data
- **Svix/Clerk webhooks** for user synchronization and events

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- Tailwind CSS
- Clerk React
- Axios
- Quill
- React YouTube
- React Toastify

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- Clerk Express
- Stripe
- Cloudinary
- Multer
- Svix
- CORS

## Architecture

```
React Client
    |
    v
Express API
 |    |     |
 v    v     v
MongoDB Stripe Cloudinary
 |
Clerk Authentication / Webhooks
```

The backend exposes separate route groups for educator, course, and user operations. Webhook endpoints handle Clerk and Stripe events.

## Project Structure

```
Edemy-LMS/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── student/
│   │   │   └── educator/
│   │   └── ...
│   └── package.json
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
└── .gitignore
```

## Getting Started

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run server
```

Create environment files for the client and server containing the required Clerk, MongoDB, Stripe, Cloudinary, and API configuration. Never commit credentials or secret keys.

## API Areas

The backend currently organizes application functionality around:

- `/api/educator` — educator operations
- `/api/course` — course operations
- `/api/user` — student/user operations
- `/clerk` — Clerk webhook handling
- `/stripe` — Stripe webhook handling

## Engineering Highlights

- Role-based application flows
- Third-party authentication
- Payment processing
- Media upload and delivery
- Webhook-driven integrations
- REST API architecture
- MongoDB persistence
- Separate student and educator experiences
