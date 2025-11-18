/**
 * Property Features Component
 * Displays all property features in organized sections
 */

import React from 'react';
import { useTranslation } from 'next-i18next';

interface PropertyFeaturesProps {
  description: string;
  descriptionDE?: string | null;
  descriptionTH?: string | null;
  descriptionRU?: string | null;
  descriptionFR?: string | null;
  views?: string[];
  privateFeatures?: string[];
  roomsSpaces?: string[];
  communalFacilities?: string[];
  technicalEquipment?: string[];
  security?: string[];
  locationFeatures?: string[];
  kitchenFeatures?: string[];
  layoutFeatures?: string[];
  furnishingStatus?: string | null;
  floor?: number | null;
  maintenanceCharges?: number | null;
  commonAreaFee?: number | null;
  transferCosts?: string | null;
  availableFrom?: Date | null;
  specialRemarks?: string | null;
}

export function PropertyFeatures({
  description,
  descriptionDE,
  descriptionTH,
  descriptionRU,
  descriptionFR,
  views = [],
  privateFeatures = [],
  roomsSpaces = [],
  communalFacilities = [],
  technicalEquipment = [],
  security = [],
  locationFeatures = [],
  kitchenFeatures = [],
  layoutFeatures = [],
  furnishingStatus,
  floor,
  maintenanceCharges,
  commonAreaFee,
  transferCosts,
  availableFrom,
  specialRemarks,
}: PropertyFeaturesProps) {
  const { t, i18n } = useTranslation('common');

  // Get localized description
  const getLocalizedDescription = () => {
    switch (i18n.language) {
      case 'de':
        return descriptionDE || description;
      case 'th':
        return descriptionTH || description;
      case 'ru':
        return descriptionRU || description;
      case 'fr':
        return descriptionFR || description;
      default:
        return description;
    }
  };

  return (
    <div className="space-y-8">
      {/* Description Section */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="prose max-w-none text-gray-700">
          {getLocalizedDescription().split('\n').map((paragraph, index) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Views */}
        {views.length > 0 && (
          <FeatureSection
            title="Views"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            }
            features={views}
          />
        )}

        {/* Private Features */}
        {privateFeatures.length > 0 && (
          <FeatureSection
            title="Private Features"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            }
            features={privateFeatures}
          />
        )}

        {/* Rooms & Spaces */}
        {roomsSpaces.length > 0 && (
          <FeatureSection
            title="Rooms & Spaces"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
            features={roomsSpaces}
          />
        )}

        {/* Communal Facilities */}
        {communalFacilities.length > 0 && (
          <FeatureSection
            title="Communal Facilities"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            features={communalFacilities}
          />
        )}

        {/* Technical Equipment */}
        {technicalEquipment.length > 0 && (
          <FeatureSection
            title="Technical Equipment"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            features={technicalEquipment}
          />
        )}

        {/* Security */}
        {security.length > 0 && (
          <FeatureSection
            title="Security"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
            features={security}
          />
        )}

        {/* Location Features */}
        {locationFeatures.length > 0 && (
          <FeatureSection
            title="Location Features"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            features={locationFeatures}
          />
        )}

        {/* Kitchen Features */}
        {kitchenFeatures.length > 0 && (
          <FeatureSection
            title="Kitchen Features"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            }
            features={kitchenFeatures}
          />
        )}

        {/* Layout Features */}
        {layoutFeatures.length > 0 && (
          <FeatureSection
            title="Layout Features"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                />
              </svg>
            }
            features={layoutFeatures}
          />
        )}
      </div>

      {/* Additional Information */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {furnishingStatus && (
            <InfoItem label="Furnishing Status" value={furnishingStatus} />
          )}
          {floor !== null && floor !== undefined && (
            <InfoItem label="Floor" value={`Floor ${floor}`} />
          )}
          {maintenanceCharges && (
            <InfoItem label="Maintenance Charges" value={`฿${maintenanceCharges.toLocaleString()}/month`} />
          )}
          {commonAreaFee && (
            <InfoItem label="Common Area Fee" value={`฿${commonAreaFee.toLocaleString()}/month`} />
          )}
          {transferCosts && (
            <InfoItem label="Transfer Costs" value={transferCosts} />
          )}
          {availableFrom && (
            <InfoItem
              label="Available From"
              value={new Date(availableFrom).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          )}
        </div>
        {specialRemarks && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Special Remarks:</p>
            <p className="text-gray-600">{specialRemarks}</p>
          </div>
        )}
      </section>
    </div>
  );
}

// Feature Section Component
function FeatureSection({
  title,
  icon,
  features,
}: {
  title: string;
  icon: React.ReactNode;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Info Item Component
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
