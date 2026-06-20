-- MB Farmhouse Database Schema

-- Users/Admin
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Farmhouses
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
);

-- Pricing (per farmhouse, booking type, slot, day of week)
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
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
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
);

-- Payments
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
);

-- Index for slot availability queries
CREATE INDEX IF NOT EXISTS idx_bookings_date_farmhouse ON bookings(booking_date, farmhouse_id, booking_type);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status, payment_status);
CREATE INDEX IF NOT EXISTS idx_pricing_lookup ON pricing(farmhouse_id, booking_type, day_of_week);
