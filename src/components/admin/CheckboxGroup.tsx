/**
 * Checkbox Group Component
 * For multi-select feature lists
 */

import React from 'react';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  columns?: number;
}

export function CheckboxGroup({ label, options, selectedValues, onChange, columns = 2 }: CheckboxGroupProps) {
  const handleToggle = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleSelectAll = () => {
    onChange(options);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Select All
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Clear
          </button>
        </div>
      </div>
      <div className={`grid grid-cols-${columns} gap-3 p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto`}>
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {selectedValues.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {selectedValues.length} selected
        </div>
      )}
    </div>
  );
}
