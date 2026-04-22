# Bill Generation - Quick Reference Card

## The Three Steps

```
1. END SESSION      2. GENERATE BILL    3. MARK PAID
   /sessions/:id/end  /generate-bill      /bills/:id/pay
```

---

## API Endpoint

**NEW: Generate Bill from Session**
```
POST /api/sessions/:id/generate-bill
Authorization: Bearer TOKEN
Content-Type: application/json
```

---

## Request Body

```json
{
  "items": [
    {
      "itemName": "Energy Drink",
      "quantity": 2,
      "unitPrice": 2.50
    }
  ],
  "discount": 1.50,
  "taxRate": 0.10,
  "paymentMethod": "card",
  "notes": "Optional notes"
}
```

**All fields optional except authorization header**

---

## Response (201 Created)

```json
{
  "message": "Bill generated successfully",
  "bill": {
    "_id": "bill_id",
    "sessionId": "session_id",
    "total": 259.55,
    "status": "pending"
  },
  "session": {
    "billGenerated": true,
    "billId": "bill_id"
  }
}
```

---

## Calculation

```
subtotal = sessionCost + itemsTotal
tax = subtotal × taxRate
total = subtotal + tax - discount
```

---

## Field Guide

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| items | array | [] | {itemName, quantity, unitPrice} |
| discount | number | 0 | Deducted from total |
| taxRate | number | 0.1 | Use decimal: 0.1 = 10% |
| paymentMethod | string | 'cash' | 'cash' \| 'card' \| 'online' |
| notes | string | '' | Any notes to add |

---

## Errors

```
400 - Session must be completed before generating bill
      (Call /end first)

404 - Session not found
      (Check session ID)

400 - Bill already exists for this session
      (Use existing bill or new session)
```

---

## Testing Order

1. Login → Get TOKEN
2. Create Session → Save SESSION_ID
3. End Session
4. Generate Bill ← **NEW**
5. Mark as Paid

---

## Example: Simple Bill

**Request:**
```bash
POST http://localhost:5000/api/sessions/ABC123/generate-bill
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "bill": {
    "total": 225.00,
    "status": "pending"
  }
}
```

---

## Example: Bill with Items

**Request:**
```bash
POST http://localhost:5000/api/sessions/ABC123/generate-bill
Authorization: Bearer TOKEN

{
  "items": [
    {"itemName": "Red Bull", "quantity": 1, "unitPrice": 3.50},
    {"itemName": "Burger", "quantity": 1, "unitPrice": 12.00}
  ],
  "discount": 2.00,
  "taxRate": 0.10
}
```

**Calculation:**
```
Session: $225.00
Items: $15.50
─────────────────
Subtotal: $240.50
Tax (10%): $24.05
Discount: -$2.00
─────────────────
TOTAL: $262.55
```

---

## Postman Setup

```
1. Import: Gaming-Cafe-API.postman_collection.json
2. Variables:
   - BASE_URL: http://localhost:5000
   - TOKEN: (from login)
   - SESSION_ID: (from session)
3. Run: "Sessions - Bill Generation Tests"
```

---

## Database Changes

**Session Model - New Fields:**
```javascript
billGenerated: Boolean    // false by default
billId: ObjectID          // ref to Bill
```

---

## Key Points

✓ Session must be "completed" first  
✓ One bill per session (duplicate prevention)  
✓ All calculations automatic  
✓ Optional items support  
✓ Flexible discounts & tax  
✓ Backward compatible  

---

## Troubleshooting

**Bill not generating?**
→ Check session status is "completed"

**Wrong total?**
→ Verify taxRate is decimal (0.1 not 10)

**Duplicate error?**
→ Bill already exists, use existing bill ID

**Items not in bill?**
→ Check items array has itemName, quantity, unitPrice

---

## Files with Full Details

- `BILL-GENERATION-GUIDE.md` - Complete guide
- `BILL-GENERATION-IMPLEMENTATION.md` - Implementation details
- `BILL-GENERATION-VISUAL-GUIDE.md` - Diagrams & examples
- `API-DOCUMENTATION.md` - Full endpoint docs
