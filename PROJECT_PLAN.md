# MovieVerse Project Plan

## Project Overview

MovieVerse is a movie review platform built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* Passport Local Mongoose

Users can browse movies and review them.

Admins manage the movie database, reviews, and users.

---

# Architecture

## Pattern

MVC Architecture

* Models
* Views
* Controllers

---

# User Roles

## Admin

Permissions:

* Create movies
* Edit movies
* Delete movies
* View all reviews
* Delete any review
* View users
* Delete users

Restrictions:

* Cannot create reviews
* Cannot edit reviews
* Cannot have personal reviews

---

## User

Permissions:

* View movies
* Create reviews
* Edit own reviews
* Delete own reviews
* Search movies
* Manage own account

Restrictions:

* Cannot create movies
* Cannot edit movies
* Cannot delete movies
* Cannot manage users
* Cannot delete reviews created by others

---

## Guest

Permissions:

* View movies
* View reviews
* Search movies

Restrictions:

* Cannot create reviews
* Cannot manage movies
* Cannot manage users

---

# Database Models

## User

Fields:

* username
* email
* role
* hash
* salt

Roles:

* admin
* user

Default role:

* user

---

## Movie

Fields:

* title
* genres
* releaseYear
* poster
* description
* avgRating
* reviews
* createdAt

---

## Review

Fields:

* rating
* text
* author

---

# Authentication

Implemented:

* Register
* Login
* Logout
* Sessions
* Protected Routes

Middleware:

* isLoggedIn

---

# Authorization

Implemented:

## isAdmin

Allows:

* Movie CRUD
* User Management

---

## isReviewAuthor

Allows:

* Edit own review

---

## canDeleteReview

Allows:

* Review owner
* Admin

---

# Implemented Features

## Movies

* Create Movie
* Read Movie
* Update Movie
* Delete Movie
* Search by Title
* Search by Genre

---

## Reviews

* Create Review
* Edit Review
* Delete Review
* One Review Per User
* Community Reviews

---

## Admin Features

* Movie Management
* Review Moderation
* User Management
* Delete Users
* Cascade Delete Reviews

---

## User Management Rules

Only users with:

role = "user"

are displayed in the Admin Users page.

Admins are never displayed.

---

## User Deletion Flow

When deleting a user:

1. Find all reviews created by the user
2. Remove review references from movies
3. Delete reviews
4. Delete user

This prevents orphan reviews.

---

# UI Features

Implemented:

* Navbar
* Profile Page
* Home Page
* Search Bar
* Community Statistics
* Recently Added Movies

---

# Current Routes

## Auth

* /register
* /login
* /logout
* /profile

---

## Movies

* /movies
* /movies/new
* /movies/:id
* /movies/:id/edit

---

## Reviews

* /movies/:movieId/reviews

---

## Admin

* /admin/users

---

# Design Decisions

## Admin Philosophy

Admins are moderators.

Admins manage:

* Movies
* Reviews
* Users

Admins do not participate as reviewers.

---

## Review Policy

One review per user per movie.

---

## Search Policy

Search supports:

* Movie title
* Movie genres

Case-insensitive matching.

---

# Future Roadmap

## Step 109

Client-side Validation

---

## Step 110

Server-side Validation

---

## Step 111

Global Error Handling

---

## Step 112

Flash Messages

---

## Step 113

Average Rating Calculation

---

## Step 114

Admin Dashboard

---

## Step 115

User Profile Enhancements

* Review count
* Recent reviews

---

## Step 116

Movie Statistics

* Most reviewed movies
* Highest rated movies

---

# Coding Guidelines

* Follow MVC architecture
* Keep controllers thin
* Use middleware for authorization
* Never trust client-side validation
* Prefer reusable EJS partials
* Keep admin logic separate from user logic
* Maintain role-based access control

---

# Current Status

Project Phase:

Production Hardening

Current Focus:

Validation
Error Handling
Flash Messages
