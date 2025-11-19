/**
 * Import Parser for CSV/Excel Files
 * Converts Google Sheets data to Property format
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface GoogleSheetsRow {
  'Timestamp': string;
  'Email Address': string;
  'Line': string;
  'Name (Owner/Agent)': string;
  'Phone Number': string;
  'Property Address': string;
  'Listing Type': string;
  'Price (THB)': string;
  'Commission Rate (%)': string;
  'Short Term Let Available?': string;
  'Property Type': string;
  'Property Size (sqm)': string;
  'Land Size (SQWha)': string;
  'Quata': string; // Note: Typo in original sheets
  'Number of Bedrooms': string;
  'Number of Bathrooms': string;
  'Location/Area': string;
  'Views': string;
  'Private Features': string;
  'Rooms & Spaces': string;
  'Communal Facilities': string;
  'Technical Equipment': string;
  'Security': string;
  'Location Features': string;
  'Furnishing Status': string;
  'Kitchen & Layout Features': string;
  'Maintenance Charges (Baht/Month)': string;
  'Common Area Fee (Baht/sqm/Month)': string;
  'Transfer Costs Payment': string;
  'Special Features or Remarks': string;
  'Available From': string;
  'Property Photos': string;
  'Email': string;
}

export interface ParsedProperty {
  // Basic Info
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  listingType: string;
  status: string;

  // Owner Info
  ownerName?: string;
  ownerLine?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerType?: string;

  // Listing Details
  commission?: number;
  shortTermLet?: boolean;
  quota?: string;
  landSize?: string;

  // Features (arrays)
  views: string[];
  privateFeatures: string[];
  roomsSpaces: string[];
  communalFacilities: string[];
  technicalEquipment: string[];
  security: string[];
  locationFeatures: string[];

  // Kitchen & Layout
  furnishingStatus?: string;
  kitchenFeatures: string[];
  layoutFeatures?: string[];

  // Financial
  maintenanceCharges?: number;
  commonAreaFee?: number;
  transferCosts?: string;

  // Additional
  availableFrom?: string;
  specialRemarks?: string;

  // Images
  images: string[]; // Raw Google Drive URLs

  // Description (generated)
  description: string;

  // Import tracking
  importSource: string;
  importDate: Date;
}

/**
 * Parse CSV file
 */
export async function parseCSV(file: File): Promise<ParsedProperty[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<GoogleSheetsRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const properties = results.data.map(row => convertRowToProperty(row));
          resolve(properties);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * Parse Excel file
 */
export async function parseExcel(file: File): Promise<ParsedProperty[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<GoogleSheetsRow>(firstSheet);

        const properties = rows.map(row => convertRowToProperty(row));
        resolve(properties);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'));
    };

    reader.readAsBinaryString(file);
  });
}

/**
 * Convert Google Sheets row to Property format
 */
function convertRowToProperty(row: GoogleSheetsRow): ParsedProperty {
  // Split comma-separated values into arrays
  const splitAndClean = (value: string | undefined): string[] => {
    if (!value) return [];
    return value
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);
  };

  // Parse views
  const views = splitAndClean(row['Views']);

  // Map Property Type
  const propertyTypeMap: Record<string, string> = {
    'Condo': 'condo',
    'House': 'house',
    'Villa': 'villa',
    'Land': 'land',
  };

  // Map Listing Type
  const listingTypeMap: Record<string, string> = {
    'Sale': 'sale',
    'Rent': 'rent',
  };

  // Generate title from property address + location
  const title = row['Property Address'] || `Property in ${row['Location/Area']}`;

  // Generate description
  const bedroomsText = row['Number of Bedrooms'] === 'Studio' ? 'Studio' : `${row['Number of Bedrooms']} bedroom`;
  const description = `${bedroomsText} ${row['Property Type']} for ${row['Listing Type'].toLowerCase()} in ${row['Location/Area']}. ${row['Property Size (sqm)']} sqm. ${row['Furnishing Status']}.${row['Views'] ? ` Views: ${row['Views']}.` : ''}${row['Special Features or Remarks'] ? ` ${row['Special Features or Remarks']}` : ''}`;

  // Parse bedrooms (handle "Studio" case)
  let bedrooms = 1;
  if (row['Number of Bedrooms'] === 'Studio') {
    bedrooms = 0; // Or 1, depending on preference
  } else {
    bedrooms = parseInt(row['Number of Bedrooms']) || 1;
  }

  return {
    // Basic Info
    title,
    price: parseInt(row['Price (THB)']?.replace(/,/g, '') || '0'),
    location: row['Location/Area'] || '',
    bedrooms,
    bathrooms: parseInt(row['Number of Bathrooms']) || 1,
    area: parseFloat(row['Property Size (sqm)']) || 0,
    propertyType: propertyTypeMap[row['Property Type']] || 'condo',
    listingType: listingTypeMap[row['Listing Type']] || 'sale',
    status: 'active',

    // Owner Info
    ownerName: row['Name (Owner/Agent)'] || undefined,
    ownerLine: row['Line'] || undefined,
    ownerPhone: row['Phone Number'] || undefined,
    ownerEmail: row['Email'] || row['Email Address'] || undefined,
    ownerType: row['Name (Owner/Agent)']?.includes('Owner') ? 'Owner' : 'Agent',

    // Listing Details
    commission: parseFloat(row['Commission Rate (%)']) || 3.0,
    shortTermLet: row['Short Term Let Available?'] === 'Yes',
    quota: row['Quata'] || undefined, // Note: Typo in sheets
    landSize: row['Land Size (SQWha)'] || undefined,

    // Features
    views: splitAndClean(row['Views']),
    privateFeatures: splitAndClean(row['Private Features']),
    roomsSpaces: splitAndClean(row['Rooms & Spaces']),
    communalFacilities: splitAndClean(row['Communal Facilities']),
    technicalEquipment: splitAndClean(row['Technical Equipment']),
    security: splitAndClean(row['Security']),
    locationFeatures: splitAndClean(row['Location Features']),

    // Kitchen & Layout
    furnishingStatus: row['Furnishing Status'] || undefined,
    kitchenFeatures: splitAndClean(row['Kitchen & Layout Features']),

    // Financial
    maintenanceCharges: parseInt(row['Maintenance Charges (Baht/Month)']) || undefined,
    commonAreaFee: parseFloat(row['Common Area Fee (Baht/sqm/Month)']) || undefined,
    transferCosts: row['Transfer Costs Payment'] || undefined,

    // Images (Google Drive URLs)
    images: splitAndClean(row['Property Photos']),

    // Description
    description,

    // Import tracking
    importSource: 'google-sheets',
    importDate: new Date(),
  };
}

/**
 * Validate parsed properties
 */
export function validateProperties(properties: ParsedProperty[]): {
  valid: ParsedProperty[];
  errors: { index: number; property: ParsedProperty; errors: string[] }[];
} {
  const valid: ParsedProperty[] = [];
  const errors: { index: number; property: ParsedProperty; errors: string[] }[] = [];

  properties.forEach((property, index) => {
    const propertyErrors: string[] = [];

    // Required field validation
    if (!property.title) propertyErrors.push('Title is required');
    if (!property.price || property.price <= 0) propertyErrors.push('Valid price is required');
    if (!property.location) propertyErrors.push('Location is required');
    if (!property.bedrooms && property.bedrooms !== 0) propertyErrors.push('Bedrooms is required');
    if (!property.bathrooms) propertyErrors.push('Bathrooms is required');
    if (!property.area || property.area <= 0) propertyErrors.push('Area is required');

    // Price warnings
    if (property.price < 100000) propertyErrors.push('Warning: Price seems too low');
    if (property.price > 100000000) propertyErrors.push('Warning: Price seems too high');

    if (propertyErrors.length > 0) {
      errors.push({ index, property, errors: propertyErrors });
    } else {
      valid.push(property);
    }
  });

  return { valid, errors };
}
