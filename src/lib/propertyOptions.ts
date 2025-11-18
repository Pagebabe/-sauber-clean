/**
 * Property Form Options
 * Dropdown/Checkbox options for all property features
 */

export const VIEW_OPTIONS = [
  'Sea View',
  'Panoramic View',
  'Mountain View',
  'City View',
  'Garden View',
  'Pool View',
];

export const PRIVATE_FEATURE_OPTIONS = [
  'Private Terrace',
  'Private Jacuzzi',
  'Private Garden',
  'Private Pool',
];

export const ROOMS_SPACES_OPTIONS = [
  'Walk-in Closet',
  'Laundry Room',
  'Home Office',
  'Storage Room',
  'Maid\'s Room',
];

export const COMMUNAL_FACILITY_OPTIONS = [
  'Swimming Pool',
  'Fitness Center',
  'Communal Sauna',
  'Communal Garden',
  'Communal Parking',
  'Lobby',
  '24h Reception',
  'Co-working Space',
  'Children Playground',
  'BBQ Area',
];

export const TECHNICAL_EQUIPMENT_OPTIONS = [
  'WiFi',
  'High Speed Internet',
  'Air Conditioning',
  'Satellite TV',
  'CCTV',
  'Terrace',
  'Balcony',
  'Large Terrace',
  'Large Balcony',
];

export const SECURITY_OPTIONS = [
  'Personal Security System',
  '24h Communal Security',
  '24h Patrolling Security',
  'Key Card Access',
  'Security Guard',
  'CCTV Surveillance',
];

export const LOCATION_FEATURE_OPTIONS = [
  'Close to Beach',
  'Beach Front',
  'City Center',
  'Close to Shopping Center',
  'Close to Hospital',
  'Close to Terminal 21',
  'Close to Central Festival',
  'Near Walking Street',
  'Near Jomtien Beach',
  'On Main Road',
  'On Taxi Routes',
  'Easy Beach Access',
  'Quiet Area',
];

export const KITCHEN_FEATURE_OPTIONS = [
  'European Kitchen',
  'Kitchenette',
  'Built-in Appliances',
  'Open Plan Kitchen',
];

export const LAYOUT_FEATURE_OPTIONS = [
  'Corner Unit',
  'High Floor',
  'Duplex',
  'Penthouse',
];

export const FURNISHING_OPTIONS = [
  'Fully Furnished',
  'Partially Furnished',
  'Unfurnished',
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'condo', label: 'Condo' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'land', label: 'Land' },
];

export const LISTING_TYPE_OPTIONS = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' },
];

export const OWNER_TYPE_OPTIONS = [
  { value: 'Owner', label: 'Owner' },
  { value: 'Agent', label: 'Agent' },
];

export const QUOTA_OPTIONS = [
  { value: 'Thai', label: 'Thai' },
  { value: 'Foreign', label: 'Foreign' },
  { value: 'Limited Company', label: 'Limited Company' },
];

export const TRANSFER_COSTS_OPTIONS = [
  { value: 'Seller Pays', label: 'Seller Pays' },
  { value: 'Buyer Pays', label: 'Buyer Pays' },
  { value: 'Shared 50/50', label: 'Shared 50/50' },
];

/**
 * Auto-Fill Templates based on Property Type
 */
export const getAutoFillTemplate = (propertyType: string, location: string) => {
  const template: any = {
    communalFacilities: [],
    security: [],
    technicalEquipment: [],
    locationFeatures: [],
  };

  // Base features for Condos
  if (propertyType === 'condo') {
    template.communalFacilities = [
      'Swimming Pool',
      'Fitness Center',
      'Lobby',
      '24h Reception',
      'Communal Parking',
    ];
    template.security = ['24h Communal Security', 'Key Card Access', 'Security Guard'];
    template.technicalEquipment = ['Air Conditioning', 'Balcony'];
  }

  // Base features for Houses/Villas
  if (propertyType === 'house' || propertyType === 'villa') {
    template.security = ['Security Guard', 'CCTV Surveillance'];
    template.technicalEquipment = ['Air Conditioning'];
  }

  // Location-based features
  if (location.toLowerCase().includes('wongamat') || location.toLowerCase().includes('beach')) {
    template.locationFeatures.push('Close to Beach', 'Beach Front', 'Easy Beach Access');
  }

  if (location.toLowerCase().includes('jomtien')) {
    template.locationFeatures.push('Near Jomtien Beach', 'Easy Beach Access');
  }

  if (location.toLowerCase().includes('central') || location.toLowerCase().includes('pattaya')) {
    template.locationFeatures.push('City Center', 'Close to Shopping Center', 'Close to Terminal 21');
  }

  if (location.toLowerCase().includes('pratumnak')) {
    template.locationFeatures.push('Close to Beach', 'Quiet Area');
  }

  return template;
};
