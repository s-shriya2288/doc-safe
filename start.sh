#!/bin/bash
# DocSafe Startup Script

echo "Checking if Docker runs..."
docker-compose -v || docker compose version || echo "Docker not found! Install Docker for database."

echo "Starting Postgres Database..."
docker compose up -d || docker-compose up -d

echo "Waiting for database to initialize (10s)..."
sleep 10

echo "Applying schema migrations..."
cd backend
npx prisma db push
cd ..

echo "Starting Backend API on Port 3000..."
cd backend && npm run start:dev &
BACKEND_PID=$!

echo "Starting Frontend Vite App on Port 5173..."
cd frontend && npm run dev &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT

echo "==========================================="
echo " DocSafe is officially running Locally!"
echo "   - Backend API: http://localhost:3000"
echo "   - Frontend UI: http://localhost:5173"
echo " Press Ctrl+C to stop all servers."
echo "==========================================="
wait
