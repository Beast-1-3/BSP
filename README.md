# B2B E-Commerce Shipping Charge Estimator

A Node.js + Express backend service for a B2B marketplace (similar to Jumbotail). It calculates the nearest warehouse to a seller and estimates shipping charges based on distance, weight, and delivery speed.

## Tech Stack
- **Node.js, Express, TypeScript**
- **Prisma ORM**, **PostgreSQL**
- **Jest** for Testing
- **Swagger** for API Documentation
- **Zod** for Input Validation

## Features
- **Clean Architecture:** Modular Controller -> Service -> Repository pattern.
- **Design Patterns:** Uses Strategy Pattern for Transport Modes and Factory Pattern for Delivery Speeds.
- **Robustness:** Global error handling and validation via Zod.

## Setup Instructions

### 1. Pre-requisites
- Node.js (v18+)
- Docker (for local Postgres database)

### 2. Installation
```bash
npm install
```

### 3. Database Setup (Docker + Prisma)
```bash
# Start PostgreSQL locally
docker-compose up -d

# Run Prisma Migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed Database with sample data
npm run dev scripts/seed.ts
```

### 4. Running the App
```bash
# Development Mode
npm run dev

# Production Build
npm run build
npm start
```

## API Testing (cURL Examples)

The server runs on http://localhost:3000

### 1. Get Nearest Warehouse
```bash
curl "http://localhost:3000/api/v1/warehouse/nearest?sellerId=1&productId=1"
```

### 2. Calculate Shipping Charge
```bash
curl "http://localhost:3000/api/v1/shipping-charge?warehouseId=1&customerId=1&deliverySpeed=express&weight=10"
```

### 3. Calculate Full Order Workflow
```bash
curl -X POST http://localhost:3000/api/v1/shipping-charge/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "sellerId": 1,
    "customerId": 2,
    "productId": 2,
    "deliverySpeed": "standard"
  }'
```

## API Documentation
Once the server is running, navigate to:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

To run tests:
```bash
npm test
```
