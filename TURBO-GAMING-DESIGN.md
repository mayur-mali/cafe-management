# Turbo Gaming - Design System & Implementation

## Overview

The Turbo Gaming Management Console features a premium, high-performance gaming management interface with a dark theme, red gaming accents, and glassmorphism effects. The design emphasizes efficiency, clarity, and a professional yet energetic atmosphere suited for elite gaming environments.

## Color Palette

### Primary Colors
- **Background (#131313)**: Deep black base providing maximum contrast
- **Primary Red (#ffb3b1)**: Vibrant accent for CTAs, active states, and emphasis
- **Dark Container (#1f1f1f)**: Card and container backgrounds
- **Dark Muted (#353535)**: Sidebar and secondary backgrounds

### Secondary Colors
- **Foreground (#e2e2e2)**: Primary text color
- **Muted Foreground (#b3b3b3)**: Secondary text
- **Border (#353535)**: Border and divider colors
- **Success Green (#34d399)**: Available/positive states
- **Warning Yellow (#fbbf24)**: Warnings and maintenance status

## Typography

### Fonts
- **Headings**: Space Grotesk (400, 500, 600, 700 weights)
  - Modern, geometric, futuristic feel
  - Used for titles, labels, section headers
  
- **Body**: Inter (400, 500, 600, 700 weights)
  - Clean, highly legible SaaS font
  - Used for all body text and descriptions

### Type Hierarchy
- **H1**: 32-40px, 600-700 weight, Space Grotesk
- **H2**: 24-28px, 600 weight, Space Grotesk
- **H3**: 18-20px, 600 weight, Space Grotesk
- **Body**: 14-16px, 400-500 weight, Inter
- **Small**: 12-14px, 400-500 weight, Inter

## Layout & Spacing

### Grid System
- 12-column fluid grid
- 1.5rem (24px) gutter spacing
- 2rem (32px) margin spacing

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1440px
- Ultra-wide: > 1440px

## Components

### Buttons
**Primary Button**
- Background: #ffb3b1 (Primary Red)
- Text: #680011 (Dark Red)
- Padding: 12px 24px
- Border Radius: 8px (md)
- Font Weight: 600
- Hover: Opacity decrease or slight brightness increase

**Secondary/Ghost Button**
- Background: Transparent
- Border: 1px solid #353535
- Text: #e2e2e2
- Hover: bg-muted (#353535)

### Cards & Containers
- Background: #1f1f1f (Dark Container) or glass effect
- Border: 1px solid rgba(168, 162, 158, 0.1)
- Border Radius: 16px (lg)
- Padding: 24px
- Box Shadow: Subtle diffused shadow with 5% red tint

### Status Badges
```
Active: bg-primary/20, border-primary, text-primary
Available: bg-green-500/20, border-green-500, text-green-400
Maintenance: bg-yellow-500/20, border-yellow-500, text-yellow-400
Unavailable: bg-gray-500/20, border-gray-500, text-gray-400
```

### Glassmorphism
```css
background: rgba(19, 19, 19, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(168, 162, 158, 0.1);
```

## Page Designs

### 1. Dashboard (Overview)
**Key Elements:**
- Live metrics cards (revenue, sessions, utilization)
- Station status grid with real-time indicators
- Recent sessions list with activity status
- Quick action buttons for new sessions

**Layout:**
- 4-column grid for metrics (responsive)
- 3-column grid for station matrix
- Full-width tables for session history

### 2. Session Management
**Key Elements:**
- Active sessions cards with timer countdown
- Station information and current player
- Current bill amount
- End Session button (red accent)
- Progress bars for session duration

**Card Features:**
- Plan badge (VIP, Standard, etc.)
- Remaining time display in HH:MM:SS format
- Current billing amount
- Pause/Resume/End action buttons

### 3. Billing / Invoice
**Layout:**
- Invoice header with company info and branding
- Customer details section
- Itemized billing table
- Summary section (subtotal, tax, discount, total)
- Payment status badge
- PDF download and print options

**Visual Elements:**
- Light container for invoice content
- Colored rows for discounts/special items
- Green badge for payment status
- Mono-spaced text for amounts

### 4. Inventory Management
**Key Elements:**
- Quick stock overview cards with images
- Stock status badges (In Stock / Out of Stock)
- Master inventory list with pagination
- Stock level progress bars
- Add/Edit/Delete action buttons

**Stock Display:**
- Item image with rounded corners
- Category label
- Quantity display
- Unit price
- Status indicator overlay

### 5. Plans & Pricing
**Card Layout:**
- Plan name and badge (Standard Rate / Popular / Premium)
- Price display (large, prominent)
- Feature list with checkmarks
- Edit button (outlined)
- Create Custom button (lower section)

**Visual Hierarchy:**
- Badge color matches plan type
- Larger text for popular plans
- Checkmarks for features (✓)
- Consistent card spacing

### 6. Station Management
**Active Matrix View:**
- Station identifier (PS5-01, PC-04, etc.)
- Game/application icon or display
- Current player name
- Session remaining time
- Progress bar
- Pause/End buttons
- Status badge

**Visual Indicators:**
- Red border for occupied stations
- Green indicator for available stations
- Yellow for maintenance
- Station type icons

### 7. Reports & Analytics
**Key Metrics:**
- Total revenue with trend indicator
- Average session time
- Peak hours chart
- Revenue trend graph (line chart in red)
- Top used stations list

**Chart Styling:**
- Red line for revenue trend
- Dark background with grid
- Light text labels
- Export CSV button

### 8. Login Page
**Layout:**
- Split screen (left: branding, right: form)
- Large Turbo Gaming logo on left
- Form title and description on right
- Email/Operator ID field
- Password field
- Remember session checkbox
- "Initialize Uplink" button (red, large)
- Secure connection badge at bottom

## Interactive States

### Hover States
- Buttons: Opacity shift
- Menu items: Highlight text color to primary
- Cards: Subtle shadow enhancement
- Links: Text color to primary

### Focus States
- Inputs: Border color to primary, ring effect
- Buttons: Outline ring in primary color
- Focusable elements: Visible focus indicator

### Active States
- Active menu items: Vertical red line on left + red text
- Selected tabs: Red bottom border and red text
- Active buttons: Darker shade of primary

## Responsive Design

### Mobile (< 640px)
- Single column layouts
- Sidebar collapses to icon-only
- Full-width cards
- Stacked form fields

### Tablet (640px - 1024px)
- 2-column grids
- Condensed sidebar with labels
- Responsive table scrolling
- Touch-friendly button sizes

### Desktop (1024px+)
- Full layouts as designed
- 3-4 column grids
- Sidebar fully expanded
- Optimal spacing and typography

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Primary text: 7:1 contrast ratio
- Secondary text: 4.5:1 minimum

### Focus Indicators
- Clear, visible focus rings
- Keyboard navigation support
- Semantic HTML structure

### Icons
- Paired with text labels where necessary
- Appropriate size (16px-24px)
- Clear visual hierarchy

## CSS Classes & Utilities

### Custom Classes
```css
.glass {
  background: rgba(19, 19, 19, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(168, 162, 158, 0.1);
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: rgba(255, 179, 177, 0.2);
  border: 1px solid rgba(255, 179, 177, 0.5);
  color: #ffb3b1;
}
```

### Tailwind Extensions
- `font-heading`: Space Grotesk
- `bg-glass`: Glassmorphism background
- `text-primary`: Red accent color
- Status color utilities

## Implementation Notes

### Fonts
Add to HTML head or import in CSS:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Development Guidelines
1. Use Tailwind classes first
2. Use custom CSS classes for complex effects
3. Maintain color palette consistency
4. Use semantic HTML
5. Test on multiple screen sizes
6. Ensure keyboard navigation works
7. Maintain loading states clearly

## File Locations

- **Colors Config**: `frontend/tailwind.config.ts`
- **Global Styles**: `frontend/src/index.css`
- **Layout**: `frontend/src/layouts/DashboardLayout.tsx`
- **Login Page**: `frontend/src/pages/LoginPage.tsx`
- **Components**: `frontend/src/components/`

## Future Enhancements

1. Dark/Light mode toggle (maintain dark as default)
2. Customizable accent colors
3. Theme switching capability
4. Advanced animations for state changes
5. Real-time status update animations
