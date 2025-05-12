# Martial Arts Studio Manager

A web application for managing martial arts studios, including student management, equipment tracking, and item sales.

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, React Bootstrap
- **Backend**: .NET 8, ASP.NET Core, Entity Framework Core
- **Database**: PostgreSQL
- **Authentication**: AspNetCore.Identity (coming soon)

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

### Backend Setup

1. Navigate to the API project directory:
   ```bash
   cd MartialArtsStudioManager.API
   ```

2. Update the database connection string in `appsettings.json` if needed.

3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the backend:
   ```bash
   dotnet run
   ```

The API will be available at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the client project directory:
   ```bash
   cd martial-arts-studio-manager-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`.

## Features

- Student Management
  - Add, edit, and delete student profiles
  - Track attendance and progress
  - Manage classes and schedules

- Equipment Management
  - Track equipment inventory
  - Monitor maintenance schedules
  - Record equipment usage

- Item Sales
  - Manage inventory of items for sale
  - Track sales and revenue
  - Generate sales reports

## Development

- Backend API documentation is available at `http://localhost:5000/swagger`
- Frontend uses TypeScript for type safety
- React Bootstrap for UI components
- Entity Framework Core for database operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 