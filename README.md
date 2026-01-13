# The Procrastinators Podcast Database

A full-stack application for managing and filtering podcast episodes by host appearances. Built with PostgreSQL, GraphQL, Node.js, React, and TypeScript.

## Features

- **Host-based filtering**: Filter episodes by which hosts appeared
- **Flexible search modes**:
  - ANY mode: Show episodes with any of the selected hosts
  - ALL mode (exclusive): Show ONLY episodes with exactly the selected hosts and no one else
- **Episode management**: Add, view, and delete episodes
- **Host management**: Manage podcast hosts
- **GraphQL API**: Flexible querying and mutations

## Tech Stack

- **Backend**: Node.js, Express, GraphQL
- **Database**: PostgreSQL
- **Frontend**: React, TypeScript
- **API**: GraphQL with express-graphql

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Install PostgreSQL

If you don't have PostgreSQL installed:

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE procrastinators_podcast;

# Exit psql
\q
```

If you need to create a PostgreSQL user:
```sql
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE procrastinators_podcast TO postgres;
```

### 3. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 4. Initialize Database

```bash
npm run init-db
```

This creates the necessary tables (hosts, episodes, episode_hosts).

### 5. Start the Backend Server

```bash
npm start
```

The server will start on http://localhost:4000

### 6. Start the Frontend

In a new terminal:

```bash
cd client
npm start
```

The React app will open at http://localhost:3000

## Usage

### Adding Hosts

First, add hosts to your database. You can use the GraphQL interface or add them directly:

**Via GraphiQL** (http://localhost:4000/graphql):

```graphql
mutation {
  addHost(name: "Ben") {
    id
    name
  }
}
```

**Via SQL**:
```sql
INSERT INTO hosts (name) VALUES 
  ('Ben'),
  ('Alice'),
  ('Charlie'),
  ('Dana'),
  ('Emma'),
  ('Frank'),
  ('Grace'),
  ('Henry');
```

### Adding Episodes

**Via GraphiQL**:

```graphql
mutation {
  addEpisode(
    title: "The Great Procrastination"
    episodeNumber: 1
    description: "Our first episode about putting things off"
    releaseDate: "2024-01-15"
    hostIds: [1, 2, 3]  # Ben, Alice, Charlie
  ) {
    id
    title
    hosts {
      name
    }
  }
}
```

**Via SQL**:
```sql
-- Add episode
INSERT INTO episodes (title, episode_number, description, release_date) 
VALUES ('The Great Procrastination', 1, 'Our first episode', '2024-01-15')
RETURNING id;

-- Link hosts (assuming episode id is 1 and host ids are 1, 2, 3)
INSERT INTO episode_hosts (episode_id, host_id) VALUES 
  (1, 1),
  (1, 2),
  (1, 3);
```

### Filtering Episodes

1. **View all episodes**: Don't select any hosts and click "Search"

2. **Find episodes with specific hosts (ANY mode)**:
   - Uncheck "Match ALL selected hosts"
   - Check the boxes for hosts you want (e.g., Ben and Alice)
   - Click "Search"
   - Results: All episodes where Ben OR Alice appear

3. **Find episodes with ONLY specific hosts (ALL/exclusive mode)**:
   - Check "Match ALL selected hosts (exclusive)"
   - Check the boxes for hosts you want (e.g., just Ben)
   - Click "Search"
   - Results: Only episodes where Ben appears alone (no other hosts)

4. **Clear filters**: Click "Clear Filters" to reset and show all episodes

## Database Schema

### hosts
- `id` (serial, primary key)
- `name` (varchar, unique)
- `created_at` (timestamp)

### episodes
- `id` (serial, primary key)
- `title` (varchar)
- `episode_number` (integer)
- `description` (text)
- `release_date` (date)
- `created_at` (timestamp)

### episode_hosts
- `id` (serial, primary key)
- `episode_id` (integer, foreign key)
- `host_id` (integer, foreign key)
- `created_at` (timestamp)

## GraphQL API

### Queries

**Get all hosts:**
```graphql
query {
  hosts {
    id
    name
  }
}
```

**Get all episodes:**
```graphql
query {
  episodes {
    id
    title
    episodeNumber
    description
    releaseDate
    hosts {
      id
      name
    }
  }
}
```

**Filter episodes (ANY mode):**
```graphql
query {
  episodes(hostIds: [1, 2]) {
    id
    title
    hosts {
      name
    }
  }
}
```

**Filter episodes (ALL/exclusive mode):**
```graphql
query {
  episodes(hostIds: [1], matchAll: true) {
    id
    title
    hosts {
      name
    }
  }
}
```

### Mutations

**Add a host:**
```graphql
mutation {
  addHost(name: "New Host") {
    id
    name
  }
}
```

**Add an episode:**
```graphql
mutation {
  addEpisode(
    title: "Episode Title"
    episodeNumber: 42
    description: "Episode description"
    releaseDate: "2024-01-20"
    hostIds: [1, 2, 3]
  ) {
    id
    title
  }
}
```

**Delete an episode:**
```graphql
mutation {
  deleteEpisode(id: 1)
}
```

## Configuration

Database connection can be configured via environment variables:

```bash
export DB_USER=postgres
export DB_HOST=localhost
export DB_NAME=procrastinators_podcast
export DB_PASSWORD=postgres
export DB_PORT=5432
```

Or create a `.env` file in the root directory.

## Troubleshooting

### "Connection refused" error
- Make sure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Check database credentials in `db.js`

### "Database does not exist"
- Run: `createdb procrastinators_podcast`

### Port already in use
- Backend (4000): Change PORT in server.js
- Frontend (3000): React will offer to use another port

### GraphQL errors
- Check the GraphiQL interface at http://localhost:4000/graphql for detailed error messages

## Project Structure

```
procrastinators-podcast-db/
├── server.js              # Express server
├── graphql.js            # GraphQL schema and resolvers
├── db.js                 # Database connection
├── init-db.js            # Database initialization
├── schema.sql            # SQL schema
├── package.json          # Backend dependencies
└── client/
    ├── src/
    │   ├── App.tsx       # Main React component
    │   ├── api.ts        # GraphQL API calls
    │   ├── types.ts      # TypeScript types
    │   └── index.tsx     # Entry point
    ├── public/
    │   └── index.html    # HTML template
    └── package.json      # Frontend dependencies
```

## License

MIT
