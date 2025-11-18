/**
 * Mock Data for Property Listings
 * Temporary data until API is connected
 */

import { Property } from '@/components/property/PropertyCard';

export const mockProperties: Property[] = [
  {
    id: 'PLE-001',
    title: 'Modern Condo with Sea View in Jomtien',
    price: 2490000,
    location: 'Jomtien',
    bedrooms: 2,
    bathrooms: 2,
    area: 65,
    floor: 12,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    badges: ['promotion'],
  },
  {
    id: 'PLE-002',
    title: 'Luxury Villa with Private Pool',
    price: 8500000,
    location: 'Naklua',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    badges: ['promotion', 'installment'],
  },
  {
    id: 'PLE-003',
    title: 'Beachfront Apartment with Sunset Views',
    price: 3200000,
    location: 'Wongamat',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    floor: 8,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  },
  {
    id: 'PLE-004',
    title: 'Penthouse in Central Pattaya',
    price: 12000000,
    location: 'Central Pattaya',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    floor: 25,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    badges: ['installment'],
  },
  {
    id: 'PLE-005',
    title: 'Cozy Studio Near Beach',
    price: 1250000,
    location: 'Jomtien',
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    floor: 5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  },
  {
    id: 'PLE-006',
    title: 'Family House with Garden',
    price: 6800000,
    location: 'East Pattaya',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    badges: ['promotion'],
  },
];
