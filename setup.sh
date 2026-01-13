#!/bin/bash

echo "🎙️  The Procrastinators Podcast Database Setup"
echo "=============================================="
echo ""

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo ""
    echo "macOS: brew services start postgresql"
    echo "Linux: sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"
echo ""

# Check if database exists
if psql -lqt | cut -d \| -f 1 | grep -qw procrastinators_podcast; then
    echo "✅ Database 'procrastinators_podcast' exists"
else
    echo "📦 Creating database 'procrastinators_podcast'..."
    createdb procrastinators_podcast
    echo "✅ Database created"
fi
echo ""

# Install backend dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi
echo ""

# Install frontend dependencies
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi
echo ""

# Initialize database
echo "🗄️  Initializing database schema..."
npm run init-db
echo ""

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Terminal 1: npm start           (backend on http://localhost:4000)"
echo "2. Terminal 2: cd client && npm start  (frontend on http://localhost:3000)"
echo ""
echo "GraphiQL interface: http://localhost:4000/graphql"
