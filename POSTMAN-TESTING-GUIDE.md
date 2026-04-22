# Postman Testing Guide - Gaming Cafe Management System

## Overview
This guide explains how to import and test the Gaming Cafe Management API using Postman with the provided collection and test data.

---

## Step 1: Import the Collection

### Option A: Import from JSON File
1. Open **Postman** (download from [postman.com](https://www.postman.com/downloads/) if not installed)
2. Click **Import** in the top-left corner
3. Select **Upload Files** tab
4. Navigate to and select `Gaming-Cafe-API.postman_collection.json`
5. Click **Import**

### Option B: Paste Raw JSON
1. Open Postman
2. Click **Import** → **Paste Raw Text**
3. Copy the JSON content from `Gaming-Cafe-API.postman_collection.json`
4. Click **Import**

---

## Step 2: Set Up Environment Variables

The collection comes with pre-configured variables. Follow these steps:

### Environment Variables:
- **BASE_URL**: `http://localhost:5000` (your backend URL)
- **TOKEN**: Will be auto-filled after login
- **PLAN_ID**: Save after creating a plan
- **STATION_ID**: Save after creating a station
- **SESSION_ID**: Save after creating a session
- **INVENTORY_ID**: Save after creating inventory
- **BILL_ID**: Save after creating a bill

### How to Set Variables in Postman:

1. Click the **Environment** tab (or use the eye icon)
2. Select or create an environment
3. Add/edit variables:
   - `BASE_URL`: `http://localhost:5000`
   - Leave others empty (they'll auto-populate)

---

## Step 3: Testing Flow

### **Phase 1: Authentication**

#### 1. Register Admin (First Time Only)
```
Method: POST
Endpoint: /api/auth/register
```

**Test Data:**
```json
{
  "name": "John Admin",
  "email": "admin@gamingcafe.com",
  "password": "SecurePass123!@",
  "phone": "9876543210"
}
```

**Expected Response:**
```json
{
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "_id": "...",
    "name": "John Admin",
    "email": "admin@gamingcafe.com"
  }
}
```

#### 2. Login
```
Method: POST
Endpoint: /api/auth/login
```

**Test Data:**
```json
{
  "email": "admin@gamingcafe.com",
  "password": "SecurePass123!@"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "_id": "...",
    "name": "John Admin"
  }
}
```

✅ **The TOKEN will auto-save to your environment variables!**

---

### **Phase 2: Create Plans**

#### 1. Create Plan 1
```
Method: POST
Endpoint: /api/plans
```

**Test Data:**
```json
{
  "name": "1 Hour Gaming",
  "duration": 60,
  "price": 150,
  "description": "1 hour of unlimited gaming"
}
```

**Save the returned `_id` as `PLAN_ID`**

#### 2. Create Additional Plans (Optional)
```json
{
  "name": "2 Hour Gaming",
  "duration": 120,
  "price": 250,
  "description": "2 hours of unlimited gaming"
}
```

#### 3. Get All Plans
```
Method: GET
Endpoint: /api/plans
```

---

### **Phase 3: Create Stations**

#### 1. Create Station 1
```
Method: POST
Endpoint: /api/stations
```

**Test Data:**
```json
{
  "stationNumber": "A-1",
  "type": "Gaming PC",
  "specs": "RTX 3080, i9-12900K, 32GB RAM",
  "status": "available",
  "hourlyRate": 200
}
```

**Save the returned `_id` as `STATION_ID`**

#### 2. Create Additional Stations (Optional)
```json
{
  "stationNumber": "A-2",
  "type": "Gaming PC",
  "specs": "RTX 3070, i9-11900K, 16GB RAM",
  "status": "available",
  "hourlyRate": 180
}
```

#### 3. Get All Stations
```
Method: GET
Endpoint: /api/stations
```

---

### **Phase 4: Create Sessions**

#### 1. Start a Gaming Session
```
Method: POST
Endpoint: /api/sessions
```

**Test Data:**
```json
{
  "stationId": "{{STATION_ID}}",
  "planId": "{{PLAN_ID}}",
  "customerName": "Raj Kumar",
  "customerPhone": "9876543210"
}
```

**Save the returned `_id` as `SESSION_ID`**

#### 2. Get Active Sessions
```
Method: GET
Endpoint: /api/sessions/active
```

#### 3. Pause Session
```
Method: PUT
Endpoint: /api/sessions/{{SESSION_ID}}/pause
Body: {}
```

#### 4. Resume Session
```
Method: PUT
Endpoint: /api/sessions/{{SESSION_ID}}/resume
Body: {}
```

#### 5. End Session
```
Method: PUT
Endpoint: /api/sessions/{{SESSION_ID}}/end
Body: {}
```

---

### **Phase 5: Inventory Management**

#### 1. Create Inventory Item
```
Method: POST
Endpoint: /api/inventory
```

**Test Data:**
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

**Save the returned `_id` as `INVENTORY_ID`**

#### 2. Get All Inventory
```
Method: GET
Endpoint: /api/inventory
```

#### 3. Get Low Stock Items
```
Method: GET
Endpoint: /api/inventory/low-stock
```

#### 4. Reduce Inventory (Simulating Sales)
```
Method: PUT
Endpoint: /api/inventory/{{INVENTORY_ID}}/reduce
```

**Test Data:**
```json
{
  "quantityToReduce": 5
}
```

---

### **Phase 6: Billing & Revenue**

#### 1. Create a Bill
```
Method: POST
Endpoint: /api/bills
```

**Test Data:**
```json
{
  "sessionId": "{{SESSION_ID}}",
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

**Save the returned `_id` as `BILL_ID`**

#### 2. Get All Bills
```
Method: GET
Endpoint: /api/bills
```

#### 3. Get Daily Revenue
```
Method: GET
Endpoint: /api/bills/revenue/daily
```

**Expected Response:**
```json
{
  "date": "2024-01-15",
  "totalRevenue": 2150.50,
  "billCount": 5,
  "details": [...]
}
```

#### 4. Get Revenue by Date Range
```
Method: GET
Endpoint: /api/bills/revenue?startDate=2024-01-01&endDate=2024-01-31
```

#### 5. Mark Bill as Paid
```
Method: PUT
Endpoint: /api/bills/{{BILL_ID}}/paid
```

**Test Data:**
```json
{
  "paymentMethod": "card"
}
```

---

## Complete Testing Sequence

Follow this order for best results:

1. **Register Admin** (first time only)
2. **Login** ✅ (saves TOKEN)
3. **Create Plans** ✅ (save PLAN_ID)
4. **Create Stations** ✅ (save STATION_ID)
5. **Create Sessions** ✅ (save SESSION_ID)
6. **Create Inventory** ✅ (save INVENTORY_ID)
7. **End/Pause/Resume Sessions** as needed
8. **Create Bills** ✅ (save BILL_ID)
9. **Check Revenue Reports**

---

## Error Handling & Solutions

### Error: 401 Unauthorized
**Cause**: TOKEN is missing or expired
**Solution**:
1. Run **Login** request again
2. Check that `Authorization` header includes `Bearer {{TOKEN}}`

### Error: 400 Bad Request
**Cause**: Invalid data in request body
**Solution**:
1. Check that all required fields are present
2. Verify data types match expected format (e.g., price as number, not string)
3. Ensure email is unique (for register)

### Error: 404 Not Found
**Cause**: Resource ID doesn't exist
**Solution**:
1. Verify you saved the correct ID from previous request
2. Make sure you're using correct environment variables
3. Check that the resource hasn't been deleted

### Error: Connection Refused
**Cause**: Backend server not running
**Solution**:
1. Start backend: `npm run dev --workspace=backend`
2. Verify it's running on `http://localhost:5000`
3. Check MongoDB connection string in `.env`

---

## Tips for Testing

### 1. Auto-Save IDs
The collection has tests configured to auto-save IDs. Look for responses with:
```json
{ "_id": "...", "name": "...", ... }
```

### 2. Use Multiple Test Profiles
Create different requests with varied data:
- Different customer names
- Different payment methods (cash, card, check)
- Different dates for revenue queries

### 3. Test Edge Cases
- Try ending a paused session
- Try creating a bill without an active session
- Try getting revenue for future dates

### 4. Monitor Response Times
Use Postman's **Timeline** view to check API performance

### 5. Validate Data Consistency
After each operation, use GET requests to verify data was created/updated correctly

---

## Testing Checklist

- [ ] Register Admin successful
- [ ] Login returns valid token
- [ ] Create Plans (at least 2)
- [ ] Create Stations (at least 2)
- [ ] Start Session
- [ ] Pause/Resume Session
- [ ] End Session
- [ ] Create Inventory Items
- [ ] Create Bill
- [ ] Check Revenue Reports
- [ ] Error handling works correctly
- [ ] Token refreshes when expired

---

## API Response Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Request completed |
| 201 | Created | New resource created |
| 400 | Bad Request | Check request data |
| 401 | Unauthorized | Login again for token |
| 404 | Not Found | Check resource ID |
| 500 | Server Error | Check backend logs |

---

## Sample Test Data Summary

### Admin Account
- Email: `admin@gamingcafe.com`
- Password: `SecurePass123!@`
- Phone: `9876543210`

### Sample Plans
1. **1 Hour Gaming** - ₹150
2. **2 Hour Gaming** - ₹250

### Sample Stations
1. **A-1** - Gaming PC (RTX 3080)
2. **A-2** - Gaming PC (RTX 3070)

### Sample Inventory
- Red Bull Energy Drink - ₹60 each

---

## Additional Resources

- [Postman Documentation](https://learning.postman.com/)
- [REST API Best Practices](https://restfulapi.net/)
- Backend README: See `backend/README.md`
- Database Schema: See models in `backend/src/models/`

---

## Support

If you encounter issues:
1. Check the error response message
2. Verify MongoDB is running
3. Check that all environment variables are set
4. Review the backend logs
5. Ensure backend is running on correct port
