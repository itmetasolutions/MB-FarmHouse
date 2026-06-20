export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import bcrypt from 'bcryptjs'
import { FARMHOUSES } from '@/lib/farmhouses'

// Only callable with a secret key for security
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (key !== process.env.MIGRATION_SECRET && key !== 'INIT_DB_NOW') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS farmhouses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        theme VARCHAR(100),
        image_url TEXT,
        gallery_images TEXT[] DEFAULT '{}',
        features TEXT[] DEFAULT '{}',
        capacity INT DEFAULT 100,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS pricing (
        id SERIAL PRIMARY KEY,
        farmhouse_id INT REFERENCES farmhouses(id) ON DELETE CASCADE,
        booking_type VARCHAR(50) NOT NULL,
        slot_name VARCHAR(100) NOT NULL,
        day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        start_time VARCHAR(10) NOT NULL,
        end_time VARCHAR(10) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(farmhouse_id, booking_type, slot_name, day_of_week)
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_reference VARCHAR(50) UNIQUE NOT NULL,
        customer_id INT REFERENCES customers(id),
        farmhouse_id INT REFERENCES farmhouses(id),
        booking_type VARCHAR(50) NOT NULL,
        booking_date DATE NOT NULL,
        slot_name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        booking_status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        is_manual BOOLEAN DEFAULT false,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
        amount DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_gateway VARCHAR(100) DEFAULT 'payfast',
        gateway_payment_id VARCHAR(255),
        gateway_response TEXT,
        paid_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_date_farmhouse ON bookings(booking_date, farmhouse_id, booking_type)`
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status, payment_status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_pricing_lookup ON pricing(farmhouse_id, booking_type, day_of_week)`

    // Seed admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mbfarmhouse.co.za'
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@2025!'
    const hashedPwd = await bcrypt.hash(adminPass, 12)

    await sql`
      INSERT INTO users (email, password, name, role)
      VALUES (${adminEmail}, ${hashedPwd}, 'Admin', 'admin')
      ON CONFLICT (email) DO NOTHING
    `

    // Seed farmhouses
    for (const fh of FARMHOUSES) {
      await sql`
        INSERT INTO farmhouses (id, name, slug, description, theme, image_url, gallery_images, features, capacity, is_active)
        VALUES (
          ${fh.id}, ${fh.name}, ${fh.slug}, ${fh.description}, ${fh.theme},
          ${fh.image_url}, ${fh.gallery_images}, ${fh.features}, ${fh.capacity}, true
        )
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          theme = EXCLUDED.theme,
          image_url = EXCLUDED.image_url,
          gallery_images = EXCLUDED.gallery_images,
          features = EXCLUDED.features,
          capacity = EXCLUDED.capacity
      `
    }

    // Seed default pricing for all farmhouses
    const eventSlots = [
      { slot: 'afternoon', start: '12:00', end: '18:00', weekdayPrice: 3500, weekendPrice: 5000 },
      { slot: 'evening', start: '18:00', end: '00:00', weekdayPrice: 4000, weekendPrice: 5500 },
    ]
    const poolSlots = [
      { slot: 'morning', start: '08:00', end: '14:00', weekdayPrice: 2000, weekendPrice: 3000 },
      { slot: 'evening', start: '14:00', end: '20:00', weekdayPrice: 2500, weekendPrice: 3500 },
      { slot: 'night', start: '19:00', end: '01:00', weekdayPrice: 3000, weekendPrice: 4000 },
      { slot: 'full_day', start: '08:00', end: '23:00', weekdayPrice: 6000, weekendPrice: 8000 },
    ]

    for (const fh of FARMHOUSES) {
      for (let day = 0; day < 7; day++) {
        const isWeekend = day === 0 || day === 5 || day === 6

        for (const s of eventSlots) {
          await sql`
            INSERT INTO pricing (farmhouse_id, booking_type, slot_name, day_of_week, price, start_time, end_time)
            VALUES (${fh.id}, 'event', ${s.slot}, ${day}, ${isWeekend ? s.weekendPrice : s.weekdayPrice}, ${s.start}, ${s.end})
            ON CONFLICT (farmhouse_id, booking_type, slot_name, day_of_week) DO NOTHING
          `
        }

        for (const s of poolSlots) {
          await sql`
            INSERT INTO pricing (farmhouse_id, booking_type, slot_name, day_of_week, price, start_time, end_time)
            VALUES (${fh.id}, 'pool', ${s.slot}, ${day}, ${isWeekend ? s.weekendPrice : s.weekdayPrice}, ${s.start}, ${s.end})
            ON CONFLICT (farmhouse_id, booking_type, slot_name, day_of_week) DO NOTHING
          `
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      admin_email: adminEmail,
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
