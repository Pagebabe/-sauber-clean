/**
 * Admin Property Import Page
 * Import properties from Google Sheets CSV/Excel
 */

import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authOptions } from '../../api/auth/[...nextauth]';
import { parseCSV, parseExcel, validateProperties, type ParsedProperty } from '@/lib/importParser';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';

type ImportStep = 'upload' | 'preview' | 'importing' | 'complete';

export default function AdminPropertyImportPage() {
  const router = useRouter();
  const [step, setStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [parsedProperties, setParsedProperties] = useState<ParsedProperty[]>([]);
  const [validProperties, setValidProperties] = useState<ParsedProperty[]>([]);
  const [errors, setErrors] = useState<{ index: number; property: ParsedProperty; errors: string[] }[]>([]);
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0 });
  const [importResults, setImportResults] = useState({ success: 0, failed: 0 });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleParse = async () => {
    if (!file) return;

    try {
      let properties: ParsedProperty[] = [];

      if (file.name.endsWith('.csv')) {
        properties = await parseCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        properties = await parseExcel(file);
      } else {
        alert('Unsupported file format. Please use CSV or Excel files.');
        return;
      }

      setParsedProperties(properties);

      // Validate properties
      const { valid, errors: validationErrors } = validateProperties(properties);
      setValidProperties(valid);
      setErrors(validationErrors);

      setStep('preview');
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Failed to parse file. Please check the file format and try again.');
    }
  };

  const handleImport = async () => {
    if (validProperties.length === 0) {
      alert('No valid properties to import');
      return;
    }

    setStep('importing');
    setImportProgress({ current: 0, total: validProperties.length });

    try {
      // Use bulk import API endpoint with image downloading
      const response = await fetch('/api/properties/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties: validProperties }),
      });

      if (!response.ok) {
        throw new Error('Import failed');
      }

      const result = await response.json();

      // Update progress to completion
      setImportProgress({ current: validProperties.length, total: validProperties.length });
      setImportResults({
        success: result.results.success,
        failed: result.results.failed,
      });

      setStep('complete');
    } catch (error) {
      console.error('Error importing properties:', error);
      alert('Import failed. Please try again.');
      setStep('preview');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setFile(null);
    setParsedProperties([]);
    setValidProperties([]);
    setErrors([]);
    setImportProgress({ current: 0, total: 0 });
    setImportResults({ success: 0, failed: 0 });
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Import Properties"
        subtitle="Import properties from Google Sheets CSV or Excel file"
        actions={
          <Button
            variant="secondary"
            onClick={() => router.push('/admin/properties')}
          >
            ← Back to Properties
          </Button>
        }
      />

      <AdminPageContent>
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <StepIndicator number={1} label="Upload" active={step === 'upload'} completed={step !== 'upload'} />
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <StepIndicator number={2} label="Preview" active={step === 'preview'} completed={step === 'importing' || step === 'complete'} />
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <StepIndicator number={3} label="Import" active={step === 'importing' || step === 'complete'} completed={step === 'complete'} />
          </div>
        </div>

        {/* Step 1: Upload */}
        {step === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-4">Upload CSV or Excel File</h2>
              <p className="text-gray-600 mb-6">
                Select a CSV or Excel file exported from Google Sheets with your property data.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Choose File
                </label>

                {file && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Selected: <span className="font-medium text-gray-900">{file.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>

              {file && (
                <button
                  onClick={handleParse}
                  className="mt-6 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Parse File →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Preview & Validation */}
        {step === 'preview' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Import Preview</h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Properties</p>
                  <p className="text-3xl font-bold text-blue-900">{parsedProperties.length}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Valid</p>
                  <p className="text-3xl font-bold text-green-900">{validProperties.length}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium">With Errors</p>
                  <p className="text-3xl font-bold text-red-900">{errors.length}</p>
                </div>
              </div>

              {/* Errors Display */}
              {errors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-red-800">Properties with Issues</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {errors.map(({ index, property, errors: propertyErrors }) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="font-medium text-red-900">
                          Row {index + 1}: {property.title || 'Untitled Property'}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {propertyErrors.map((error, i) => (
                            <li key={i} className="text-sm text-red-700">• {error}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Valid Properties Preview */}
              {validProperties.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Valid Properties (First 5)</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {validProperties.slice(0, 5).map((property, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <p className="text-sm text-gray-600">
                              {property.bedrooms} BR • {property.bathrooms} BA • {property.area} sqm
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{property.price.toLocaleString()} THB</p>
                            <p className="text-sm text-gray-600">{property.location}</p>
                          </div>
                        </div>
                        {property.views.length > 0 && (
                          <p className="text-xs text-gray-500 mt-2">
                            Views: {property.views.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {validProperties.length > 5 && (
                    <p className="text-sm text-gray-500 mt-2">
                      ... and {validProperties.length - 5} more properties
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  ← Start Over
                </button>
                <button
                  onClick={handleImport}
                  disabled={validProperties.length === 0}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                    validProperties.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Import {validProperties.length} Properties →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Importing */}
        {step === 'importing' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Importing Properties...</h2>
              <p className="text-gray-600 mb-6">
                Please wait while we import your properties to the database.
              </p>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {importProgress.current} of {importProgress.total} properties imported
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 'complete' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold mb-2">Import Complete!</h2>
              <p className="text-gray-600 mb-6">
                Your properties have been successfully imported to the database.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Successfully Imported</p>
                  <p className="text-3xl font-bold text-green-900">{importResults.success}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium">Failed</p>
                  <p className="text-3xl font-bold text-red-900">{importResults.failed}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Import More
                </button>
                <button
                  onClick={() => router.push('/admin/properties')}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Properties →
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminPageContent>
    </AdminLayout>
  );
}

// Step Indicator Component
function StepIndicator({ number, label, active, completed }: { number: number; label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
          completed
            ? 'bg-green-600 text-white'
            : active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>
      <p className={`text-xs mt-1 font-medium ${active ? 'text-blue-600' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
  };
};
