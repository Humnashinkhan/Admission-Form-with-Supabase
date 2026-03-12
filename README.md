## Admission Form with Supabase (React CRUD App)

## Project Description

This project is a Student Admission Form built using React and Supabase. The application allows users to submit student admission details through a form, store the data in a Supabase database, and manage the records through a simple dashboard.

The system supports CRUD operations (Create, Read, Update, Delete), meaning users can add new students, view student records, edit existing information, and delete records. The project demonstrates how a frontend React application can connect directly to a Supabase backend without creating a separate server.

This project is useful for understanding how React applications interact with cloud databases and how to build a simple admin-style form management system.

## Features

Student admission form

Form validation before submission

Data stored in Supabase database

Display all student records in a table

Edit student details

Delete student records

Success message after form submission

Real-time UI update after database changes


## Technologies Used

## Frontend:

React.js

JavaScript

HTML

CSS

## Backend / Database:

   Supabase

   PostgreSQL (used internally by Supabase)


   ## Project Workflow

User fills the admission form

↓

Form validation runs

↓

Data is sent to Supabase

↓

Supabase stores data in the students table

↓

Application fetches stored data

↓

Student records are displayed in the table

↓

User can edit or delete records

## CRUD Operations Implemented

## Create
New student data is inserted into the Supabase database when the form is submitted.

## Read
All student records are fetched from Supabase and displayed in a table.

## Update
Existing student records can be edited and updated in the database.

## Delete
Student records can be removed from both the UI and the database.
