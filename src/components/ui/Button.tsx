/**
 * Button Component - Reusable button for PW Pattaya
 *
 * Variants:
 * - primary: Filled button with primary color (default)
 * - secondary: Outlined button
 * - text: Text-only button
 *
 * Sizes:
 * - sm: Small (py-2 px-4)
 * - md: Medium (py-3 px-6) - default
 * - lg: Large (py-4 px-8)
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {

  // Base styles
  const baseStyles = 'font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
    secondary: 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md',
    text: 'text-primary hover:text-primary-dark',
  };

  // Size styles
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
