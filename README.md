# The Procrastinators Podcast Database

A React and TS + GraphQL, PostgreSQL, GraphQL, and Node.js application for browsing and filtering podcast episodes by host appearances.

## What do??
- Filter episodes by specific hosts
- Exclusive vs inclusive host filtering
- Search and sort functionality

<img width="287" height="282" alt="Screenshot 2025-08-15 at 00 39 54" src="https://github.com/user-attachments/assets/20f0631b-6851-49b1-8dac-5f4c54787891" />

## How Run???

### Prerequisites

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

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Start the Backend Server

```bash
npm start
```

The server will start on http://localhost:4000

### 4. Start the Frontend

In a new terminal:

```bash
cd client
npm start
```

The React app will open at http://localhost:3000

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
```

## License

MIT
