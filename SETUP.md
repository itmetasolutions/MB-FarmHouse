# MB Farmhouse — Setup Guide

## 1. Prerequisites

- Node.js 18+
- A Neon PostgreSQL database account (https://neon.tech)
- PayFast merchant account (https://www.payfast.co.za)

## 2. Environment Setup

Copy the environment example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Fill in these values in `.env.local`:

```
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@yoursite.co.za
ADMIN_PASSWORD=YourSecurePassword123!
PAYFAST_MERCHANT_ID=your-merchant-id
PAYFAST_MERCHANT_KEY=your-merchant-key
PAYFAST_PASSPHRASE=your-passphrase
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP=27XXXXXXXXXX
NEXT_PUBLIC_PHONE=+27 XX XXX XXXX
NEXT_PUBLIC_EMAIL=info@yourdomain.co.za
NEXT_PUBLIC_ADDRESS=Your Address, City, South Africa
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourpage
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourpage
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Initialize Database

Start the dev server and call the migration endpoint:

```bash
npm run dev
```

Then open a browser or use curl to initialize the database:

```bash
curl -X POST "http://localhost:3000/api/migrate?key=INIT_DB_NOW"
```

This will:
- Create all database tables
- Seed your admin account
- Seed all 4 farmhouses
- Set default pricing for all slots

## 5. Access Admin Portal

Visit: `http://localhost:3000/admin/login`

Login with the email/password you set in `.env.local`

## 6. Configure Pricing

Go to Admin → Prices & Slots to customize:
- Event booking prices (Afternoon / Evening) per day of week
- Pool party prices (Morning / Evening / Night / Full Day) per day of week
- Start and end times for each slot

## 7. PayFast Integration

For **testing**, use PayFast sandbox:
- URL: `https://sandbox.payfast.co.za/eng/process`
- Test credentials available at: https://developers.payfast.co.za/

For **production**, update:
- `NEXT_PUBLIC_BASE_URL` to your live domain
- PayFast merchant credentials
- Set `notify_url` to be publicly accessible (PayFast needs to reach it)

## 8. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in the Vercel dashboard.

## Project Structure

```
app/
  page.tsx              → Home page
  farmhouses/           → Farmhouses listing
  gallery/              → Photo gallery
  about/                → About page
  contact/              → Contact page
  book-event/           → Event booking flow
  book-pool/            → Pool party booking flow
  checkout/             → Payment checkout
  payment/
    success/            → Payment success
    failed/             → Payment failed
  privacy-policy/       → Privacy policy
  terms/                → Terms & Conditions
  admin/
    login/              → Admin login
    dashboard/          → Admin dashboard
    bookings/           → Bookings management
    prices/             → Pricing management
    customers/          → Customer management
  api/
    auth/               → NextAuth endpoints
    bookings/           → Booking CRUD
    slots/              → Slot availability
    prices/             → Pricing CRUD
    customers/          → Customer CRUD
    checkout/           → PayFast checkout preparation
    payment/notify/     → PayFast ITN handler
    migrate/            → Database initialization
```

## Default Pricing (Editable from Admin)

### Event Bookings
| Slot       | Weekday | Weekend |
|------------|---------|---------|
| Afternoon  | R3,500  | R5,000  |
| Evening    | R4,000  | R5,500  |

### Pool Party Bookings
| Slot       | Weekday | Weekend |
|------------|---------|---------|
| Morning    | R2,000  | R3,000  |
| Evening    | R2,500  | R3,500  |
| Night      | R3,000  | R4,000  |
| Full Day   | R6,000  | R8,000  |

*All prices editable from Admin → Prices & Slots*
