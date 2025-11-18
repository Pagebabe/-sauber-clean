/**
 * Database Seed Script
 * Populates the database with initial data for development and testing
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.lead.deleteMany();
  await prisma.property.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@pw-pattaya.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  // Create Properties
  console.log('🏠 Creating properties...');

  const properties = await prisma.property.createMany({
    data: [
      // Condos for Sale
      {
        title: 'Luxury Sea View Condo at The Riviera',
        titleDE: 'Luxus Meerblick Eigentumswohnung in The Riviera',
        titleTH: 'คอนโดหรูวิวทะเล The Riviera',
        titleRU: 'Роскошная квартира с видом на море в The Riviera',
        titleFR: 'Appartement de luxe avec vue sur la mer à The Riviera',
        description: 'Stunning 2-bedroom condo with panoramic sea views at The Riviera Wongamat. Features modern kitchen, spacious balcony, and access to world-class amenities including infinity pool, fitness center, and private beach.',
        descriptionDE: 'Atemberaubende 2-Zimmer-Wohnung mit Panoramablick auf das Meer im The Riviera Wongamat. Moderne Küche, geräumiger Balkon und Zugang zu erstklassigen Annehmlichkeiten.',
        descriptionTH: 'คอนโด 2 ห้องนอนสวยงามพร้อมวิวทะเลพาโนรามาที่ The Riviera Wongamat ครัวทันสมัย ระเบียงกว้างขวาง',
        descriptionRU: 'Потрясающая квартира с 2 спальнями и панорамным видом на море в The Riviera Wongamat.',
        descriptionFR: 'Magnifique appartement de 2 chambres avec vue panoramique sur la mer à The Riviera Wongamat.',
        price: 8500000,
        location: 'Wongamat Beach',
        bedrooms: 2,
        bathrooms: 2,
        area: 85,
        propertyType: 'condo',
        listingType: 'sale',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
          'https://images.unsplash.com/photo-1502672260066-6bc35f0a1e1e?w=800',
          'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
        ],
        features: ['Sea View', 'Infinity Pool', 'Fitness Center', 'Security 24/7', 'Parking', 'Fully Furnished'],
        latitude: 12.9556,
        longitude: 100.8831,
      },
      {
        title: 'Modern Studio at City Center Residence',
        titleDE: 'Modernes Studio im City Center Residence',
        titleTH: 'ห้องสตูดิโอสมัยใหม่ที่ City Center Residence',
        description: 'Fully furnished studio apartment in the heart of Pattaya. Perfect for investment or first-time buyers. Walking distance to shopping malls, restaurants, and nightlife.',
        price: 1850000,
        location: 'Pattaya City',
        bedrooms: 0,
        bathrooms: 1,
        area: 32,
        propertyType: 'condo',
        listingType: 'sale',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
        ],
        features: ['Fully Furnished', 'Pool', 'Gym', 'Central Location', 'High ROI'],
        latitude: 12.9236,
        longitude: 100.8825,
      },
      {
        title: 'Penthouse Suite at Northpoint',
        titleDE: 'Penthouse-Suite im Northpoint',
        titleTH: 'เพนท์เฮาส์สวีทที่ Northpoint',
        description: 'Ultra-luxury 3-bedroom penthouse with 360-degree views of Pattaya Bay. Private elevator, rooftop terrace, and premium finishes throughout.',
        price: 28000000,
        location: 'Wong Amat',
        bedrooms: 3,
        bathrooms: 4,
        area: 280,
        propertyType: 'condo',
        listingType: 'sale',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        ],
        features: ['Penthouse', 'Private Elevator', 'Rooftop Terrace', '360° Views', 'Smart Home', 'Wine Cellar'],
        latitude: 12.9650,
        longitude: 100.8850,
      },

      // Houses for Sale
      {
        title: 'Tropical Pool Villa in East Pattaya',
        titleDE: 'Tropische Pool-Villa in Ost-Pattaya',
        titleTH: 'บ้านพูลวิลล่าเขตร้อนในพัทยาตะวันออก',
        description: 'Beautiful 3-bedroom villa with private pool and tropical garden. Modern Thai architecture with western amenities. Quiet area but close to international schools.',
        price: 9500000,
        location: 'East Pattaya',
        bedrooms: 3,
        bathrooms: 3,
        area: 220,
        propertyType: 'house',
        listingType: 'sale',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        ],
        features: ['Private Pool', 'Garden', 'Covered Parking', 'Modern Kitchen', 'Near Schools'],
        latitude: 12.9100,
        longitude: 100.9200,
      },
      {
        title: 'Luxury Villa with Sea View',
        titleDE: 'Luxusvilla mit Meerblick',
        titleTH: 'วิลล่าหรูวิวทะเล',
        description: 'Exclusive 5-bedroom villa on Pratumnak Hill with stunning sea views. Infinity pool, outdoor sala, and spacious entertainment areas.',
        price: 35000000,
        location: 'Pratumnak Hill',
        bedrooms: 5,
        bathrooms: 6,
        area: 450,
        propertyType: 'villa',
        listingType: 'sale',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        ],
        features: ['Sea View', 'Infinity Pool', 'Sala', 'Smart Home', 'Wine Cellar', 'Gym', 'Maid Quarters'],
        latitude: 12.9150,
        longitude: 100.8750,
      },

      // Properties for Rent
      {
        title: 'Beachfront Condo for Long-Term Rent',
        titleDE: 'Strandwohnung zur Langzeitmiete',
        titleTH: 'คอนโดหน้าหาดให้เช่าระยะยาว',
        description: 'Modern 1-bedroom condo with direct beach access. Fully furnished with all appliances. Available for 1-year lease.',
        price: 25000,
        location: 'Jomtien Beach',
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        propertyType: 'condo',
        listingType: 'rent',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
        ],
        features: ['Beach Access', 'Fully Furnished', 'Pool', 'Gym', 'Parking'],
        latitude: 12.8800,
        longitude: 100.8900,
      },
      {
        title: 'Spacious Family Home for Rent',
        titleDE: 'Geräumiges Familienhaus zur Miete',
        titleTH: 'บ้านครอบครัวกว้างขวางให้เช่า',
        description: '4-bedroom house in secure community. Perfect for families with pets. Large garden and covered parking for 2 cars.',
        price: 45000,
        location: 'Huay Yai',
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        propertyType: 'house',
        listingType: 'rent',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        ],
        features: ['Gated Community', 'Garden', 'Pet Friendly', 'Parking', 'Near Schools'],
        latitude: 12.8700,
        longitude: 100.9500,
      },
      {
        title: 'Downtown Studio - Monthly Rental',
        titleDE: 'Innenstadt-Studio - Monatsmiete',
        titleTH: 'ห้องสตูดิโอใจกลางเมือง - เช่ารายเดือน',
        description: 'Affordable studio in central Pattaya. Perfect for young professionals. All utilities included in rent.',
        price: 12000,
        location: 'Pattaya City',
        bedrooms: 0,
        bathrooms: 1,
        area: 28,
        propertyType: 'condo',
        listingType: 'rent',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        ],
        features: ['Fully Furnished', 'Utilities Included', 'Central Location', 'Pool'],
        latitude: 12.9236,
        longitude: 100.8825,
      },

      // Land for Sale
      {
        title: 'Prime Development Land',
        titleDE: 'Erstklassiges Entwicklungsgrundstück',
        titleTH: 'ที่ดินพัฒนาทำเลดี',
        description: 'Large plot of land perfect for development. Near main road with all utilities available. Suitable for condo, villa project, or commercial use.',
        price: 18000000,
        location: 'Jomtien',
        bedrooms: 0,
        bathrooms: 0,
        area: 1200,
        propertyType: 'land',
        listingType: 'sale',
        status: 'active',
        images: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        ],
        features: ['Main Road Access', 'Utilities Available', 'Development Potential', 'Commercial Zone'],
        latitude: 12.8900,
        longitude: 100.8950,
      },
    ],
  });

  console.log(`✅ Created ${properties.count} properties`);

  // Create Projects
  console.log('🏗️  Creating projects...');

  const projects = await prisma.project.createMany({
    data: [
      {
        name: 'The Riviera Wongamat',
        nameDE: 'The Riviera Wongamat',
        nameTH: 'เดอะ ริเวียร่า วงศ์อมาตย์',
        description: 'Luxury beachfront development with Monaco-inspired architecture. Features 484 units across multiple buildings with world-class amenities.',
        descriptionDE: 'Luxuriöse Strandentwicklung mit Monaco-inspirierter Architektur.',
        descriptionTH: 'โครงการหรูริมชายหาดสถาปัตยกรรมแรงบันดาลใจจากโมนาโก',
        location: 'Wongamat Beach',
        developer: 'Riviera Group',
        completion: '2025 Q2',
        units: 484,
        priceFrom: 3500000,
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
          'https://images.unsplash.com/photo-1502672260066-6bc35f0a1e1e?w=800',
        ],
        amenities: ['Private Beach', 'Infinity Pool', 'Sky Lounge', 'Fitness Center', 'Concierge', '24/7 Security'],
      },
      {
        name: 'Dusit Grand Park 2',
        nameDE: 'Dusit Grand Park 2',
        nameTH: 'ดุสิต แกรนด์ พาร์ค 2',
        description: 'Affordable condominium in Jomtien with water park facilities. Perfect for investors and first-time buyers.',
        location: 'Jomtien',
        developer: 'Dusit Group',
        completion: '2026 Q4',
        units: 2256,
        priceFrom: 1290000,
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        ],
        amenities: ['Water Park', 'Multiple Pools', 'Gym', 'Restaurant', 'Shuttle Service'],
      },
      {
        name: 'Laguna Beach Resort 4',
        nameDE: 'Laguna Beach Resort 4',
        nameTH: 'ลากูน่า บีช รีสอร์ท 4',
        description: 'Newest addition to the popular Laguna Beach Resort series. Maldives-style resort living in Pattaya.',
        location: 'Jomtien Beach',
        developer: 'Heights Holdings',
        completion: '2025 Q1',
        units: 648,
        priceFrom: 2100000,
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        ],
        amenities: ['Lagoon Pool', 'Beach Access', 'Restaurant', 'Spa', 'Gym'],
      },
    ],
  });

  console.log(`✅ Created ${projects.count} projects`);

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - Properties: ${properties.count}`);
  console.log(`   - Projects: ${projects.count}`);
  console.log(`   - Users: 1 admin`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
