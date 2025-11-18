/**
 * Input Component - Reusable input field for PW Pattaya
 *
 * Types:
 * - text: Standard text input
 * - email: Email input
 * - tel: Phone input
 * - number: Number input
 *
 * @example
 * <Input
 *   type="text"
 *   placeholder="Enter location"
 *   value={location}
 *   onChange={(e) => setLocation(e.target.value)}
 * />
 */

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) {

  const baseStyles = 'px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[44px]';
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
      <input
        className={combinedClassName}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
