/**
 * Property Form with Tabs
 * Enhanced form for creating/editing properties with all Google Sheets fields
 */

import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckboxGroup } from './CheckboxGroup';
import {
  VIEW_OPTIONS,
  PRIVATE_FEATURE_OPTIONS,
  ROOMS_SPACES_OPTIONS,
  COMMUNAL_FACILITY_OPTIONS,
  TECHNICAL_EQUIPMENT_OPTIONS,
  SECURITY_OPTIONS,
  LOCATION_FEATURE_OPTIONS,
  KITCHEN_FEATURE_OPTIONS,
  LAYOUT_FEATURE_OPTIONS,
  FURNISHING_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  LISTING_TYPE_OPTIONS,
  STATUS_OPTIONS,
  OWNER_TYPE_OPTIONS,
  QUOTA_OPTIONS,
  TRANSFER_COSTS_OPTIONS,
  getAutoFillTemplate,
} from '@/lib/propertyOptions';

interface PropertyFormData {
  // Basic Info
  title: string;
  titleDE: string;
  titleTH: string;
  titleRU: string;
  titleFR: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  floor: string;
  propertyType: string;
  listingType: string;
  status: string;

  // Owner Info
  ownerName: string;
  ownerLine: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerType: string;

  // Listing Details
  commission: string;
  shortTermLet: boolean;
  quota: string;
  landSize: string;

  // Features (arrays)
  views: string[];
  privateFeatures: string[];
  roomsSpaces: string[];
  communalFacilities: string[];
  technicalEquipment: string[];
  security: string[];
  locationFeatures: string[];

  // Kitchen & Layout
  furnishingStatus: string;
  kitchenFeatures: string[];
  layoutFeatures: string[];

  // Financial
  maintenanceCharges: string;
  commonAreaFee: string;
  transferCosts: string;

  // Availability
  availableFrom: string;
  specialRemarks: string;

  // Images & Description
  images: string;
  description: string;
  descriptionDE: string;
  descriptionTH: string;
  descriptionRU: string;
  descriptionFR: string;

  // Coordinates
  latitude: string;
  longitude: string;
}

interface PropertyFormTabsProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
  isNew: boolean;
}

export function PropertyFormTabs({ formData, setFormData, onSubmit, isSaving, isNew }: PropertyFormTabsProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleLoadTemplate = async (templateId: string) => {
    if (!templateId) return;

    try {
      const response = await fetch(`/api/templates/${templateId}`);
      const template = await response.json();

      // Apply template to form data
      setFormData({
        ...formData,
        propertyType: template.propertyType,
        listingType: template.listingType || formData.listingType,
        location: template.location || formData.location,
        views: template.views || [],
        privateFeatures: template.privateFeatures || [],
        roomsSpaces: template.roomsSpaces || [],
        communalFacilities: template.communalFacilities || [],
        technicalEquipment: template.technicalEquipment || [],
        security: template.security || [],
        locationFeatures: template.locationFeatures || [],
        kitchenFeatures: template.kitchenFeatures || [],
        layoutFeatures: template.layoutFeatures || [],
        furnishingStatus: template.furnishingStatus || formData.furnishingStatus,
        commission: template.commission?.toString() || formData.commission,
        shortTermLet: template.shortTermLet || false,
        quota: template.quota || formData.quota,
        transferCosts: template.transferCosts || formData.transferCosts,
      });

      alert(`Template "${template.name}" loaded successfully!`);
      setSelectedTemplateId('');
    } catch (error) {
      console.error('Error loading template:', error);
      alert('Failed to load template');
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateName,
          description: `Template based on ${formData.title || 'property'}`,
          propertyType: formData.propertyType,
          listingType: formData.listingType,
          location: formData.location,
          views: formData.views,
          privateFeatures: formData.privateFeatures,
          roomsSpaces: formData.roomsSpaces,
          communalFacilities: formData.communalFacilities,
          technicalEquipment: formData.technicalEquipment,
          security: formData.security,
          locationFeatures: formData.locationFeatures,
          kitchenFeatures: formData.kitchenFeatures,
          layoutFeatures: formData.layoutFeatures,
          furnishingStatus: formData.furnishingStatus,
          commission: parseFloat(formData.commission) || 3.0,
          shortTermLet: formData.shortTermLet,
          quota: formData.quota,
          transferCosts: formData.transferCosts,
        }),
      });

      if (!response.ok) throw new Error('Failed to save template');

      alert('Template saved successfully!');
      setTemplateName('');
      setShowSaveTemplate(false);
      fetchTemplates(); // Refresh templates list
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    }
  };

  const handleAutoFill = () => {
    const template = getAutoFillTemplate(formData.propertyType, formData.location);
    setFormData({
      ...formData,
      communalFacilities: template.communalFacilities,
      security: template.security,
      technicalEquipment: template.technicalEquipment,
      locationFeatures: template.locationFeatures,
    });
    alert('Auto-filled based on property type and location!');
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-sm">
      {/* Template Bar */}
      {isNew && (
        <div className="p-4 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Quick Start:</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  handleLoadTemplate(e.target.value);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Load from Template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} ({template.propertyType})
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-500">
                {templates.length} templates available
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSaveTemplate(!showSaveTemplate)}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              💾 Save as Template
            </button>
          </div>

          {/* Save Template Form */}
          {showSaveTemplate && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Template name (e.g., 'Wongamat Luxury Condo')"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSaveAsTemplate}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Template
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSaveTemplate(false);
                    setTemplateName('');
                  }}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This will save all features, facilities, and default settings as a reusable template.
              </p>
            </div>
          )}
        </div>
      )}

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex border-b border-gray-200 px-6">
          <Tab className="px-4 py-3 cursor-pointer hover:text-blue-600 border-b-2 border-transparent" selectedClassName="border-blue-600 text-blue-600">
            Basic Info
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer hover:text-blue-600 border-b-2 border-transparent" selectedClassName="border-blue-600 text-blue-600">
            Features & Views
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer hover:text-blue-600 border-b-2 border-transparent" selectedClassName="border-blue-600 text-blue-600">
            Facilities & Equipment
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer hover:text-blue-600 border-b-2 border-transparent" selectedClassName="border-blue-600 text-blue-600">
            Kitchen & Layout
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer hover:text-blue-600 border-b-2 border-transparent" selectedClassName="border-blue-600 text-blue-600">
            Financial & Availability
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer hover:text-blue-600 border-b-2 border-transparent" selectedClassName="border-blue-600 text-blue-600">
            Images & Description
          </Tab>
        </TabList>

        {/* Tab 1: Basic Info */}
        <TabPanel className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Property Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <Input
                label="Property Title (English)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                fullWidth
              />
            </div>

            <Input
              label="Title (German)"
              value={formData.titleDE}
              onChange={(e) => setFormData({ ...formData, titleDE: e.target.value })}
              fullWidth
            />

            <Input
              label="Title (Thai)"
              value={formData.titleTH}
              onChange={(e) => setFormData({ ...formData, titleTH: e.target.value })}
              fullWidth
            />

            <Input
              label="Title (Russian)"
              value={formData.titleRU}
              onChange={(e) => setFormData({ ...formData, titleRU: e.target.value })}
              fullWidth
            />

            <Input
              label="Title (French)"
              value={formData.titleFR}
              onChange={(e) => setFormData({ ...formData, titleFR: e.target.value })}
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {PROPERTY_TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
              <select
                value={formData.listingType}
                onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {LISTING_TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Input
              label="Price (THB)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              fullWidth
            />

            <Input
              label="Bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
              required
              fullWidth
            />

            <Input
              label="Bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              required
              fullWidth
            />

            <Input
              label="Area (sqm)"
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              required
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              label="Location/Area"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              fullWidth
              placeholder="e.g. Jomtien, Wong Amat, Central Pattaya"
            />

            <Input
              label="Floor"
              type="number"
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
              fullWidth
            />

            <Input
              label="Land Size (SQWha)"
              value={formData.landSize}
              onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
              fullWidth
            />
          </div>

          <h4 className="text-md font-semibold mb-3 mt-6">Owner/Agent Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Owner/Agent Name"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.ownerType}
                onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                {OWNER_TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <Input
              label="Phone"
              value={formData.ownerPhone}
              onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
              fullWidth
            />

            <Input
              label="Line ID"
              value={formData.ownerLine}
              onChange={(e) => setFormData({ ...formData, ownerLine: e.target.value })}
              fullWidth
            />

            <Input
              label="Email"
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
              fullWidth
            />
          </div>

          <h4 className="text-md font-semibold mb-3 mt-6">Listing Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Commission Rate (%)"
              type="number"
              step="0.1"
              value={formData.commission}
              onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quota</label>
              <select
                value={formData.quota}
                onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                {QUOTA_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                id="shortTermLet"
                checked={formData.shortTermLet}
                onChange={(e) => setFormData({ ...formData, shortTermLet: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="shortTermLet" className="ml-2 text-sm text-gray-700">Short Term Let Available</label>
            </div>
          </div>
        </TabPanel>

        {/* Tab 2: Features & Views */}
        <TabPanel className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Features & Views</h3>
            <Button type="button" variant="secondary" onClick={handleAutoFill}>
              🤖 Auto-Fill Features
            </Button>
          </div>

          <CheckboxGroup
            label="Views"
            options={VIEW_OPTIONS}
            selectedValues={formData.views}
            onChange={(values) => setFormData({ ...formData, views: values })}
          />

          <CheckboxGroup
            label="Private Features"
            options={PRIVATE_FEATURE_OPTIONS}
            selectedValues={formData.privateFeatures}
            onChange={(values) => setFormData({ ...formData, privateFeatures: values })}
          />

          <CheckboxGroup
            label="Rooms & Spaces"
            options={ROOMS_SPACES_OPTIONS}
            selectedValues={formData.roomsSpaces}
            onChange={(values) => setFormData({ ...formData, roomsSpaces: values })}
          />
        </TabPanel>

        {/* Tab 3: Facilities & Equipment */}
        <TabPanel className="p-6">
          <h3 className="text-lg font-semibold mb-6">Communal Facilities & Equipment</h3>

          <CheckboxGroup
            label="Communal Facilities"
            options={COMMUNAL_FACILITY_OPTIONS}
            selectedValues={formData.communalFacilities}
            onChange={(values) => setFormData({ ...formData, communalFacilities: values })}
            columns={3}
          />

          <CheckboxGroup
            label="Technical Equipment"
            options={TECHNICAL_EQUIPMENT_OPTIONS}
            selectedValues={formData.technicalEquipment}
            onChange={(values) => setFormData({ ...formData, technicalEquipment: values })}
            columns={3}
          />

          <CheckboxGroup
            label="Security Features"
            options={SECURITY_OPTIONS}
            selectedValues={formData.security}
            onChange={(values) => setFormData({ ...formData, security: values })}
            columns={2}
          />

          <CheckboxGroup
            label="Location Features"
            options={LOCATION_FEATURE_OPTIONS}
            selectedValues={formData.locationFeatures}
            onChange={(values) => setFormData({ ...formData, locationFeatures: values })}
            columns={3}
          />
        </TabPanel>

        {/* Tab 4: Kitchen & Layout */}
        <TabPanel className="p-6">
          <h3 className="text-lg font-semibold mb-6">Kitchen & Layout Features</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Status</label>
            <select
              value={formData.furnishingStatus}
              onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              {FURNISHING_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <CheckboxGroup
            label="Kitchen Features"
            options={KITCHEN_FEATURE_OPTIONS}
            selectedValues={formData.kitchenFeatures}
            onChange={(values) => setFormData({ ...formData, kitchenFeatures: values })}
          />

          <CheckboxGroup
            label="Layout Features"
            options={LAYOUT_FEATURE_OPTIONS}
            selectedValues={formData.layoutFeatures}
            onChange={(values) => setFormData({ ...formData, layoutFeatures: values })}
          />
        </TabPanel>

        {/* Tab 5: Financial & Availability */}
        <TabPanel className="p-6">
          <h3 className="text-lg font-semibold mb-6">Financial & Availability</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Maintenance Charges (Baht/Month)"
              type="number"
              value={formData.maintenanceCharges}
              onChange={(e) => setFormData({ ...formData, maintenanceCharges: e.target.value })}
              fullWidth
            />

            <Input
              label="Common Area Fee (Baht/sqm/Month)"
              type="number"
              step="0.01"
              value={formData.commonAreaFee}
              onChange={(e) => setFormData({ ...formData, commonAreaFee: e.target.value })}
              fullWidth
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Costs Payment</label>
            <select
              value={formData.transferCosts}
              onChange={(e) => setFormData({ ...formData, transferCosts: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              {TRANSFER_COSTS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Available From</label>
            <input
              type="date"
              value={formData.availableFrom}
              onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Special Features or Remarks</label>
            <textarea
              value={formData.specialRemarks}
              onChange={(e) => setFormData({ ...formData, specialRemarks: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Any special notes, features, or remarks about this property..."
            />
          </div>
        </TabPanel>

        {/* Tab 6: Images & Description */}
        <TabPanel className="p-6">
          <h3 className="text-lg font-semibold mb-6">Images & Description</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs (comma-separated)</label>
            <textarea
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="https://image1.jpg, https://image2.jpg, https://drive.google.com/open?id=..."
            />
            <p className="mt-1 text-sm text-gray-500">Supports direct URLs and Google Drive links</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (German)</label>
              <textarea
                value={formData.descriptionDE}
                onChange={(e) => setFormData({ ...formData, descriptionDE: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Thai)</label>
              <textarea
                value={formData.descriptionTH}
                onChange={(e) => setFormData({ ...formData, descriptionTH: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Russian)</label>
              <textarea
                value={formData.descriptionRU}
                onChange={(e) => setFormData({ ...formData, descriptionRU: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (French)</label>
              <textarea
                value={formData.descriptionFR}
                onChange={(e) => setFormData({ ...formData, descriptionFR: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <h4 className="text-md font-semibold mb-3 mt-6">Map Coordinates (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="0.000001"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              fullWidth
            />

            <Input
              label="Longitude"
              type="number"
              step="0.000001"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              fullWidth
            />
          </div>
        </TabPanel>
      </Tabs>

      {/* Submit Button - Always Visible */}
      <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Tab {tabIndex + 1} of 6
        </div>
        <div className="flex gap-3">
          {tabIndex > 0 && (
            <Button type="button" variant="secondary" onClick={() => setTabIndex(tabIndex - 1)}>
              Previous
            </Button>
          )}
          {tabIndex < 5 && (
            <Button type="button" variant="secondary" onClick={() => setTabIndex(tabIndex + 1)}>
              Next
            </Button>
          )}
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : isNew ? 'Create Property' : 'Update Property'}
          </Button>
        </div>
      </div>
    </form>
  );
}
