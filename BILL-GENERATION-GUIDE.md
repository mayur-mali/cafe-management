# Bill Generation API Guide

## Overview

The Gaming Cafe Management System now includes **automatic bill generation** from completed gaming sessions. When a session ends, you can immediately generate a bill with optional add-on items like food, drinks, etc.

## Flow Diagram

```
Session Running
    ↓
End Session (POST /api/sessions/:id/end)
    ↓
Session Status = "completed" ✓
    ↓
Generate Bill (POST /api/sessions/:id/generate-bill)
    ↓
Bill Created with Status = "pending"
    ↓
Mark as Paid (POST /api/bills/:id/pay)
```

---

## API Endpoints

### 1. End a Gaming Session
**Endpoint:** `POST /api/sessions/:id/end`

This marks the session as completed and calculates the session duration and cost.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:** (empty)
```json
{}
```

**Response Example:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "stationId": "507f1f77bcf86cd799439012",
  "customerName": "John Doe",
  "phoneNumber": "1234567890",
  "planId": "507f1f77bcf86cd799439013",
  "startTime": "2024-01-15T10:00:00.000Z",
  "endTime": "2024-01-15T11:30:00.000Z",
  "duration": 90,
  "status": "completed",
  "cost": 150.00,
  "billGenerated": false,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z"
}
```

---

### 2. Generate Bill from Completed Session
**Endpoint:** `POST /api/sessions/:id/generate-bill`

Creates a bill from a completed session. This endpoint allows you to:
- Add additional items (food, drinks, etc.)
- Apply discounts
- Set tax rates
- Choose payment method

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "itemName": "Energy Drink",
      "quantity": 2,
      "unitPrice": 2.50
    },
    {
      "itemName": "Gaming Snacks",
      "quantity": 1,
      "unitPrice": 5.00
    }
  ],
  "discount": 1.50,
  "taxRate": 0.10,
  "paymentMethod": "cash",
  "notes": "VIP customer loyalty discount applied"
}
```

**Parameters:**
- `items` (optional array): Additional items to add to bill
  - `itemName` (string): Name of the item
  - `quantity` (number): Quantity ordered
  - `unitPrice` (number): Price per unit
- `discount` (optional number, default: 0): Discount amount to apply
- `taxRate` (optional number, default: 0.1): Tax rate (0.1 = 10%)
- `paymentMethod` (optional string, enum: 'cash', 'card', 'online', default: 'cash')
- `notes` (optional string): Additional notes for the bill

**Response Example:**
```json
{
  "message": "Bill generated successfully",
  "bill": {
    "_id": "507f1f77bcf86cd799439020",
    "sessionId": "507f1f77bcf86cd799439011",
    "stationId": "507f1f77bcf86cd799439012",
    "customerName": "John Doe",
    "sessionCost": 150.00,
    "items": [
      {
        "itemName": "Energy Drink",
        "quantity": 2,
        "unitPrice": 2.50,
        "totalPrice": 5.00
      },
      {
        "itemName": "Gaming Snacks",
        "quantity": 1,
        "unitPrice": 5.00,
        "totalPrice": 5.00
      }
    ],
    "itemsTotal": 10.00,
    "subtotal": 160.00,
    "taxRate": 0.10,
    "tax": 16.00,
    "discount": 1.50,
    "total": 174.50,
    "paymentMethod": "cash",
    "status": "pending",
    "notes": "VIP customer loyalty discount applied",
    "createdAt": "2024-01-15T11:30:30.000Z",
    "updatedAt": "2024-01-15T11:30:30.000Z"
  },
  "session": {
    "_id": "507f1f77bcf86cd799439011",
    "billGenerated": true,
    "billId": "507f1f77bcf86cd799439020"
  }
}
```

---

## Bill Calculation Formula

```
subtotal = sessionCost + itemsTotal
tax = subtotal × taxRate
total = subtotal + tax - discount

Where:
- sessionCost = (sessionDuration / planDuration) × planPrice
- itemsTotal = sum of all (quantity × unitPrice)
```

### Example Calculation:
```
Session Cost: $150.00
Items Total: $10.00
Subtotal: $160.00
Tax (10%): $16.00
Discount: $1.50
────────────
TOTAL: $174.50
```

---

## Error Handling

### Session Not Found
```json
{
  "error": "Session not found"
}
```
**Status Code:** 404

### Session Not Completed
```json
{
  "error": "Session must be completed before generating bill"
}
```
**Status Code:** 400

### Bill Already Exists
```json
{
  "error": "Bill already exists for this session",
  "bill": { /* existing bill object */ }
}
```
**Status Code:** 400

---

## Step-by-Step Testing in Postman

### Prerequisites:
1. You have a Bearer token
2. You have an active session ID
3. You have a completed session (after calling `/end` endpoint)

### Test Scenario 1: Simple Bill Generation (No Items)

**Step 1:** End a session
```
POST http://localhost:5000/api/sessions/{SESSION_ID}/end
Authorization: Bearer YOUR_TOKEN
```

**Step 2:** Generate bill with just the session cost
```
POST http://localhost:5000/api/sessions/{SESSION_ID}/generate-bill
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "items": [],
  "discount": 0,
  "taxRate": 0.10,
  "paymentMethod": "cash"
}
```

**Expected Response:**
- Status: 201 Created
- Bill with sessionCost only
- Status: "pending"

---

### Test Scenario 2: Bill with Food & Drinks

**Step 1:** End a session
```
POST http://localhost:5000/api/sessions/{SESSION_ID}/end
```

**Step 2:** Generate bill with items
```
POST http://localhost:5000/api/sessions/{SESSION_ID}/generate-bill
Authorization: Bearer YOUR_TOKEN

{
  "items": [
    {
      "itemName": "Red Bull",
      "quantity": 1,
      "unitPrice": 3.50
    },
    {
      "itemName": "Burger Meal",
      "quantity": 1,
      "unitPrice": 12.00
    }
  ],
  "discount": 2.00,
  "taxRate": 0.12,
  "paymentMethod": "card"
}
```

**Calculation:**
```
Session Cost: $150.00
Red Bull: 1 × $3.50 = $3.50
Burger Meal: 1 × $12.00 = $12.00
Items Total: $15.50
────────────
Subtotal: $165.50
Tax (12%): $19.86
Discount: $2.00
────────────
TOTAL: $183.36
```

---

### Test Scenario 3: Group Session with Discounts

**Step 1:** End a session
```
POST http://localhost:5000/api/sessions/{SESSION_ID}/end
```

**Step 2:** Generate bill for group with loyalty discount
```
POST http://localhost:5000/api/sessions/{SESSION_ID}/generate-bill
Authorization: Bearer YOUR_TOKEN

{
  "items": [
    {
      "itemName": "Pizza (4 slices)",
      "quantity": 2,
      "unitPrice": 8.00
    },
    {
      "itemName": "Soft Drinks",
      "quantity": 4,
      "unitPrice": 2.00
    },
    {
      "itemName": "Gaming Station Premium",
      "quantity": 1,
      "unitPrice": 20.00
    }
  ],
  "discount": 10.00,
  "taxRate": 0.10,
  "paymentMethod": "card",
  "notes": "Group of 4 gamers - 10% loyalty discount applied"
}
```

---

## Integration with Frontend

### Frontend Flow (React/Vue Example)

```javascript
// 1. When user clicks "End Session"
const endSession = async (sessionId) => {
  const response = await fetch(`/api/sessions/${sessionId}/end`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const session = await response.json();
  return session;
};

// 2. After session ends, show bill generation form
// User adds items, discount, payment method

// 3. Generate bill
const generateBill = async (sessionId, billData) => {
  const response = await fetch(`/api/sessions/${sessionId}/generate-bill`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(billData)
  });
  const result = await response.json();
  
  if (response.ok) {
    // Show bill details
    displayBill(result.bill);
    
    // Optionally mark as paid
    markAsPaid(result.bill._id);
  }
};

// 4. Mark bill as paid
const markAsPaid = async (billId) => {
  const response = await fetch(`/api/bills/${billId}/pay`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ paymentMethod: 'card' })
  });
  const bill = await response.json();
  return bill;
};
```

---

## Database Changes

### Updated Session Model Fields:
```javascript
{
  // ... existing fields ...
  billGenerated: Boolean (default: false),
  billId: ObjectId (ref to Bill)
}
```

This allows you to:
- Track if a bill was already created for a session
- Link back to the generated bill from the session
- Prevent duplicate bill creation

---

## API Testing Checklist

- [ ] Create session successfully
- [ ] End session successfully
- [ ] Generate bill without items
- [ ] Generate bill with items
- [ ] Bill calculations are correct
- [ ] Bill shows pending status
- [ ] Cannot generate bill twice for same session
- [ ] Cannot generate bill for incomplete session
- [ ] Discount is applied correctly
- [ ] Tax is calculated correctly
- [ ] Payment method is saved correctly
- [ ] Mark bill as paid
- [ ] Verify bill shows in completed bills list

---

## Common Issues & Solutions

### Issue: "Bill already exists for this session"
**Cause:** A bill was already generated for this session
**Solution:** Either use that bill ID or create a new session

### Issue: "Session must be completed before generating bill"
**Cause:** Trying to generate bill for active session
**Solution:** Call `/end` endpoint first

### Issue: Bill shows wrong total
**Cause:** Tax or discount calculation error
**Solution:** Verify the formula and check taxRate/discount values

### Issue: Items not showing in bill
**Cause:** Items array not passed or empty
**Solution:** Make sure items array is included with correct fields

---

## Summary

This new feature provides a flexible, two-step approach:
1. **End Session** - Calculate session duration and cost
2. **Generate Bill** - Add items and finalize payment

You can:
- Immediately generate bills after sessions end
- Add food/drink items on-the-fly
- Apply discounts and custom tax rates
- Track billing status
- Mark bills as paid/cash

All calculations are automatic and the system prevents duplicate billings!
