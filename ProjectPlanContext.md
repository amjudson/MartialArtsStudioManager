---
description: 
globs: 
alwaysApply: true
---
# Martial Arts Studio Manager

## Project overview

This document serves as the central specifications for the Martial Arts Studio Manager project. It will store studio information:
students, equipment, items for sale, and studio events (testings, tournaments, attendance tracking, etc.). This contains
all the necessary information about the technology stack, features, database schema, and other relevant details. 
The goal is to create a web application that allows studio owners to manage their business efficiently and effectively.
Future development should reference this document to ensure consistency and alignment with the project's goals.

## Technology stack
- **Frontend**: Next.js, React, TypeScript, React Bootstrap, Redux Toolkit
- **Backend**: .NET 8, ASP.NET Core, Entity Framework Core
- **Database**: PostgreSQL
- **Authentication**: AspNetCore.Identity

## Core features

1. **User Authentication**: 
   - User registration and login
   - Role-based access control (admin, instructor, student)
   - Password recovery and reset
2. **Student Management**: 
   - Add, edit, and delete student profiles
   - Track student attendance and progress
   - Manage student classes and schedules
3. **Equipment Management**: 
   - Add, edit, and delete equipment profiles
   - Track equipment usage and maintenance
   - Manage equipment inventory
4. **Item Management**: 
   - Add, edit, and delete items for sale
   - Track item inventory and sales
   - Manage item categories and pricing
   - Generate sales reports
   - Track item purchases by students
