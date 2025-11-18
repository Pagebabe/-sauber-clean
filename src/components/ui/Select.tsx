/**
 * Select Component - Reusable select/dropdown for PW Pattaya
 *
 * @example
 * <Select
 *   options={[
 *     { value: 'condo', label: 'Condo' },
 *     { value: 'house', label: 'House' }
 *   ]}
 *   value={type}
 *   onChange={(e) => setType(e.target.value)}
 * />
 */

import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  fullWidth = false,
  className = '',
  ...props
}: SelectProps) {

  const baseStyles = 'px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[44px] bg-white';
  const errorStyles = error ? 'border-red-500' : 'border-gray-300';
  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${errorStyles} ${widthStyle} ${className}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <select
        className={combinedClassName}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
