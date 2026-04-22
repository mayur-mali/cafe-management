# Gaming Cafe Management System - API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Error Handling](#error-handling)
5. [Testing with Postman](#testing-with-postman)

---

## Overview

**Base URL**: `http://localhost:5000`

**Protocol**: REST API with JSON request/response

**Authentication**: JWT Bearer Token

**Rate Limiting**: None (development)

---

## Authentication

### Register Admin
Create a new admin account.

```
POST /api/auth/register
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Admin",
  "email": "admin@gamingcafe.com",
  "password": "SecurePass123!@",
  "phone": "9876543210"
}
```

**Success Response (201):**
```json
{
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "_id": "60d5ec49f1b2c72b0c8e4a1b",
    "name": "John Admin",
    "email": "admin@gamingcafe.com",
    "phone": "9876543210",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Email already registered"
}
```

---

### Login
Authenticate and receive JWT token.

```
POST /api/auth/login
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "admin@gamingcafe.com",
  "password": "SecurePass123!@"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "_id": "60d5ec49f1b2c72b0c8e4a1b",
    "name": "John Admin",
    "email": "admin@gamingcafe.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

## API Endpoints

All endpoints (except /register and /login) require Bearer Token authentication:

```
Authorization: Bearer {{TOKEN}}
```

---

## Plans

### Create Plan
```
POST /api/plans
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "name": "1 Hour Gaming",
  "duration": 60,
  "price": 150,
  "description": "1 hour of unlimited gaming"
}
```

**Response (201):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a1c",
  "name": "1 Hour Gaming",
  "duration": 60,
  "price": 150,
  "description": "1 hour of unlimited gaming",
  "admin": "60d5ec49f1b2c72b0c8e4a1b",
  "createdAt": "2024-01-15T10:35:00.000Z"
}
```

---

### Get All Plans
```
GET /api/plans
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
[
  {
    "_id": "60d5ec49f1b2c72b0c8e4a1c",
    "name": "1 Hour Gaming",
    "duration": 60,
    "price": 150,
    "description": "1 hour of unlimited gaming"
  },
  {
    "_id": "60d5ec49f1b2c72b0c8e4a1d",
    "name": "2 Hour Gaming",
    "duration": 120,
    "price": 250,
    "description": "2 hours of unlimited gaming"
  }
]
```

---

### Get Plan by ID
```
GET /api/plans/:planId
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a1c",
  "name": "1 Hour Gaming",
  "duration": 60,
  "price": 150,
  "description": "1 hour of unlimited gaming",
  "admin": "60d5ec49f1b2c72b0c8e4a1b",
  "createdAt": "2024-01-15T10:35:00.000Z"
}
```

---

### Update Plan
```
PUT /api/plans/:planId
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "name": "Updated 1 Hour Gaming",
  "price": 180
}
```

**Response (200):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a1c",
  "name": "Updated 1 Hour Gaming",
  "duration": 60,
  "price": 180,
  "description": "1 hour of unlimited gaming"
}
```

---

### Delete Plan
```
DELETE /api/plans/:planId
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
{
  "message": "Plan deleted successfully"
}
```

---

## Stations

### Create Station
```
POST /api/stations
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "stationNumber": "A-1",
  "type": "Gaming PC",
  "specs": "RTX 3080, i9-12900K, 32GB RAM",
  "status": "available",
  "hourlyRate": 200
}
```

**Response (201):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a1e",
  "stationNumber": "A-1",
  "type": "Gaming PC",
  "specs": "RTX 3080, i9-12900K, 32GB RAM",
  "status": "available",
  "hourlyRate": 200,
  "admin": "60d5ec49f1b2c72b0c8e4a1b",
  "createdAt": "2024-01-15T10:40:00.000Z"
}
```

---

### Get All Stations
```
GET /api/stations
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
[
  {
    "_id": "60d5ec49f1b2c72b0c8e4a1e",
    "stationNumber": "A-1",
    "type": "Gaming PC",
    "specs": "RTX 3080, i9-12900K, 32GB RAM",
    "status": "available",
    "hourlyRate": 200
  }
]
```

---

### Get Station by ID
```
GET /api/stations/:stationId
Authorization: Bearer {{TOKEN}}
```

---

### Update Station
```
PUT /api/stations/:stationId
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "status": "maintenance",
  "hourlyRate": 220
}
```

---

### Delete Station
```
DELETE /api/stations/:stationId
Authorization: Bearer {{TOKEN}}
```

---

## Sessions

### Start Session
```
POST /api/sessions
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "stationId": "60d5ec49f1b2c72b0c8e4a1e",
  "planId": "60d5ec49f1b2c72b0c8e4a1c",
  "customerName": "Raj Kumar",
  "customerPhone": "9876543210"
}
```

**Response (201):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a1f",
  "station": "60d5ec49f1b2c72b0c8e4a1e",
  "plan": "60d5ec49f1b2c72b0c8e4a1c",
  "customerName": "Raj Kumar",
  "customerPhone": "9876543210",
  "startTime": "2024-01-15T11:00:00.000Z",
  "status": "active",
  "duration": 60,
  "cost": 150,
  "pausedDuration": 0
}
```

---

### Get All Sessions
```
GET /api/sessions
Authorization: Bearer {{TOKEN}}
```

---

### Get Active Sessions
```
GET /api/sessions/active
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
[
  {
    "_id": "60d5ec49f1b2c72b0c8e4a1f",
    "station": {
      "_id": "60d5ec49f1b2c72b0c8e4a1e",
      "stationNumber": "A-1"
    },
    "plan": {
      "_id": "60d5ec49f1b2c72b0c8e4a1c",
      "name": "1 Hour Gaming"
    },
    "customerName": "Raj Kumar",
    "status": "active",
    "remainingTime": 45
  }
]
```

---

### Pause Session
```
PUT /api/sessions/:sessionId/pause
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{}
```

**Response (200):**
```json
{
  "message": "Session paused",
  "session": {
    "_id": "60d5ec49f1b2c72b0c8e4a1f",
    "status": "paused",
    "pausedDuration": 300
  }
}
```

---

### Resume Session
```
PUT /api/sessions/:sessionId/resume
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
{
  "message": "Session resumed",
  "session": {
    "_id": "60d5ec49f1b2c72b0c8e4a1f",
    "status": "active"
  }
}
```

---

### End Session
```
PUT /api/sessions/:sessionId/end
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
{
  "message": "Session ended",
  "session": {
    "_id": "60d5ec49f1b2c72b0c8e4a1f",
    "status": "ended",
    "endTime": "2024-01-15T12:05:00.000Z",
    "totalDuration": 65,
    "totalCost": 162.50
  }
}
```

---

## Inventory

### Create Inventory Item
```
POST /api/inventory
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "itemName": "Red Bull Energy Drink",
  "category": "Beverages",
  "quantity": 50,
  "minStockLevel": 10,
  "price": 60,
  "supplier": "Energy Drinks Co."
}
```

**Response (201):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a20",
  "itemName": "Red Bull Energy Drink",
  "category": "Beverages",
  "quantity": 50,
  "minStockLevel": 10,
  "price": 60,
  "supplier": "Energy Drinks Co.",
  "admin": "60d5ec49f1b2c72b0c8e4a1b",
  "createdAt": "2024-01-15T10:45:00.000Z"
}
```

---

### Get All Inventory
```
GET /api/inventory
Authorization: Bearer {{TOKEN}}
```

---

### Get Low Stock Items
```
GET /api/inventory/low-stock
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
[
  {
    "_id": "60d5ec49f1b2c72b0c8e4a20",
    "itemName": "Red Bull Energy Drink",
    "quantity": 8,
    "minStockLevel": 10,
    "status": "Low Stock"
  }
]
```

---

### Update Inventory Item
```
PUT /api/inventory/:inventoryId
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "quantity": 45,
  "minStockLevel": 15
}
```

---

### Reduce Inventory (Sales)
```
PUT /api/inventory/:inventoryId/reduce
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "quantityToReduce": 5
}
```

**Response (200):**
```json
{
  "message": "Inventory updated",
  "inventory": {
    "_id": "60d5ec49f1b2c72b0c8e4a20",
    "itemName": "Red Bull Energy Drink",
    "quantity": 45
  }
}
```

---

### Delete Inventory Item
```
DELETE /api/inventory/:inventoryId
Authorization: Bearer {{TOKEN}}
```

---

## Bills

### Create Bill
```
POST /api/bills
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "sessionId": "60d5ec49f1b2c72b0c8e4a1f",
  "items": [
    {
      "description": "Gaming Session - 2 Hours",
      "quantity": 1,
      "amount": 500
    },
    {
      "description": "Red Bull x2",
      "quantity": 2,
      "amount": 120
    }
  ],
  "totalAmount": 620,
  "taxPercent": 5,
  "discountPercent": 0,
  "paymentMethod": "cash"
}
```

**Response (201):**
```json
{
  "_id": "60d5ec49f1b2c72b0c8e4a21",
  "session": "60d5ec49f1b2c72b0c8e4a1f",
  "items": [
    {
      "description": "Gaming Session - 2 Hours",
      "quantity": 1,
      "amount": 500
    },
    {
      "description": "Red Bull x2",
      "quantity": 2,
      "amount": 120
    }
  ],
  "subtotal": 620,
  "tax": 31,
  "discount": 0,
  "finalAmount": 651,
  "paymentMethod": "cash",
  "paymentStatus": "pending",
  "createdAt": "2024-01-15T12:30:00.000Z"
}
```

---

### Get All Bills
```
GET /api/bills
Authorization: Bearer {{TOKEN}}
```

---

### Get Bill by ID
```
GET /api/bills/:billId
Authorization: Bearer {{TOKEN}}
```

---

### Get Daily Revenue
```
GET /api/bills/revenue/daily
Authorization: Bearer {{TOKEN}}
```

**Response (200):**
```json
{
  "date": "2024-01-15",
  "totalRevenue": 2150.50,
  "billCount": 5,
  "details": [
    {
      "billId": "60d5ec49f1b2c72b0c8e4a21",
      "amount": 651,
      "paymentMethod": "cash"
    }
  ]
}
```

---

### Get Revenue by Date Range
```
GET /api/bills/revenue?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {{TOKEN}}
```

**Query Parameters:**
- `startDate` (required): YYYY-MM-DD format
- `endDate` (required): YYYY-MM-DD format

**Response (200):**
```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "totalRevenue": 45200.75,
  "totalBills": 120,
  "dailyBreakdown": [
    {
      "date": "2024-01-01",
      "revenue": 1450.25,
      "bills": 5
    }
  ]
}
```

---

### Mark Bill as Paid
```
PUT /api/bills/:billId/paid
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Request Body:**
```json
{
  "paymentMethod": "card"
}
```

**Response (200):**
```json
{
  "message": "Bill marked as paid",
  "bill": {
    "_id": "60d5ec49f1b2c72b0c8e4a21",
    "paymentStatus": "paid",
    "paymentMethod": "card"
  }
}
```

---

## Error Handling

### Error Response Format
All error responses follow this format:

```json
{
  "error": "Error message"
}
```

### Common Error Codes

| Code | Error | Cause |
|------|-------|-------|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Internal server error |

### Examples

**Missing Token (401):**
```json
{
  "error": "Access denied. No token provided."
}
```

**Invalid ID (404):**
```json
{
  "error": "Plan not found"
}
```

**Validation Error (400):**
```json
{
  "error": "Price must be a positive number"
}
```

---

## Testing with Postman

See `POSTMAN-TESTING-GUIDE.md` for:
- Step-by-step import instructions
- Complete testing workflow
- Sample test data
- Troubleshooting guide

---

## Rate Limiting & Quotas

Currently no rate limiting is enforced. In production, implement:
- 100 requests per minute per IP
- 1000 requests per hour per API key

---

## CORS Configuration

The API allows requests from:
- `http://localhost:3000` (Frontend)
- `http://localhost:5173` (Vite Frontend)

Add your production frontend URL to `CORS_ORIGIN` in `.env`

---

## Database Schema

See `backend/src/models/` for:
- Admin schema
- Plan schema
- Station schema
- Session schema
- Inventory schema
- Bill schema

---

## Support & Debugging

For issues:
1. Check API response error message
2. Verify token is valid and not expired
3. Check request body format
4. Review backend logs
5. Ensure MongoDB is running

See `QUICKSTART.md` for setup troubleshooting.
