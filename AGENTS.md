# MovieVerse Project Context

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Passport Local Mongoose

## Roles

### Admin
- Create movies
- Edit movies
- Delete movies
- Delete any review
- Manage users
- Delete users

### User
- Create one review per movie
- Edit own review
- Delete own review

## Design Decisions
- Admins cannot create reviews
- Admins are hidden from Manage Users page
- Deleting a user must:
  1. Delete their reviews
  2. Remove review IDs from movies
  3. Delete the user

## Current Features
- Authentication
- Authorization
- Movie CRUD
- Review CRUD
- Search
- Profile Page
- Admin User Management

## Roadmap
1. Validation
2. Error Handling
3. Flash Messages
4. Average Ratings