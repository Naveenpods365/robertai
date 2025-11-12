# Angelic Land Tenant Portal – Design Guidelines

## Design Approach
**Reference-Based**: Inspired by Agrobe and Farm Management System UIs - soft panels, card-based metrics, rounded corners, left navigation sidebar. Approachable for everyday Canadian farmers - simple, modern, warm storytelling tone.

## Color Palette
- **Primary**: Deep Green `#1C7C54`
- **Background**: Light Sage `#EAF5EE`
- **Cards**: Cream White `#FAF7F2`
- **Accent**: Gold `#F2C94C`
- **Additional**: Use light green gradients on metric cards, subtle color variations for crop categories

## Typography
- **Headers**: Inter SemiBold
- **Body Text**: Open Sans
- **Numeric Data**: JetBrains Mono (monospace for data alignment)

## Visual Style
- Rounded corners: 16-20px on all cards and panels
- Soft shadows under cards (subtle depth)
- Subtle gradient backgrounds on hero cards
- Calm hover animations with lift effect
- 3D icons for farm elements (crops, weather, finance)

## Layout Structure

### Left Sidebar (Fixed)
- Profile block: "John Mason – Tenant Farmer" with avatar
- Navigation: Dashboard 🌾, My Farms, Crop Performance, Finance & Lease, Weather, Settings ⚙️
- Bottom: Glowing `+ Add Farm` button with accent color
- Smooth expand/collapse animations

### Top Bar
- Angelic Land logo (left)
- Live weather: "24°C | Sunny in Saskatchewan ☀️"
- Search field: "Search crop or field"
- Notification bell with badge counter
- Pulsing "🎙️ Talk to Robby" button (voice assistant)

### Hero Metrics Row (4 Cards)
Colorful gradient cards with 3D icons, each featuring:
- Icon top-left (3D farm-related)
- Large bold number (animated counter 0 → value)
- Subtitle below
- Metrics: Total Acreage Managed, Crop Yield this Season, Lease Term Remaining, Active Loans/Credit

### Farm Overview Section (Two-Column)
**Left**: Satellite map image with interactive crop field markers (hover tooltips showing field details)
**Right**: 4 stat cards with icons - Air Temperature (28°C), Moisture (34% - Good), pH (7.3 - Balanced), Rain Forecast (3 days). Include animated yield growth bar chart (Jan-Oct)

### Crop Performance Dashboard
- Tab navigation: By Category / By Health
- Animated donut chart: "Fruits 20%, Grains 60%, Vegetables 20%" with colorful segments
- Progress bars for crops: Wheat 95% Matured, Barley 70% Ripening, Oats 40% Growing
- Bars animate fill on page load

### Finance & Lease Table
Sortable table with columns: Farm ID, Lease Term, Rent Due, Status
Sample rows:
- RM 125 | 2024-2027 | $1,850 | Active (green badge)
- RM 233 | 2025-2028 | $2,100 | Active (green badge)

Colorful card below: "You're eligible for CAD $12,000 loan using stored receipts" with glowing "Apply for Credit" button (green hover glow)

### Robby AI Assistant Panel (Floating/Sidebar)
- Greeting: "Hey Frank 👋 Need to know which crop to plant next?"
- Quick action buttons: 🌦️ Weather forecast, 💧 Soil advice, 📈 Price trends
- When active: animated mic waveform visualization
- Smooth slide-in/out transitions

### Reports & Data Visualization
- Line chart: "Rainfall vs Yield" with dual axes
- Pie chart: "Land Use Distribution" with colorful segments
- Mini bar charts: Monthly profit trend with hover tooltips

### FAQ Accordion
Expandable items with smooth animations:
- "How do I renew my lease?"
- "How to upload warehouse receipts?"
- "What if I need to update my crop info?"
- "Contact Tenant Support" help link

### Footer
"Powered by Angelic AI — Helping Canadian farmers grow with confidence."
Links: Help | Contact | Terms | Privacy

## Micro-Interactions & Animations
- Soft hover lift (4-8px) on all cards
- Data counters animate from 0 to actual value
- Weather icon subtle movement
- Sidebar smooth expand/collapse
- Voice button slow pulse animation
- Progress bars fill animation on scroll into view
- Chart elements animate on load (staggered)

## Images
**Farm Overview Map**: Satellite/aerial view of farmland with visible field divisions, crop markers overlaid. Realistic Canadian prairie landscape.

## Spacing System
Use Tailwind units: 2, 4, 8, 12, 16, 20 for consistent rhythm. Cards use p-6 to p-8, sections use py-12 to py-20.