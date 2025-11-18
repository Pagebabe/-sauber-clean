/**
 * ConfirmDialog Component
 * Modal dialog for confirming destructive actions
 * Replaces browser's alert() and confirm() with a better UX
 *
 * Usage:
 * ```typescript
 * const confirm = useConfirm();
 *
 * const handleDelete = async () => {
 *   const confirmed = await confirm({
 *     title: 'Delete Property?',
 *     message: 'This action cannot be undone.',
 *     variant: 'danger',
 *     confirmText: 'Delete',
 *     cancelText: 'Cancel'
 *   });
 *
 *   if (confirmed) {
 *     // Proceed with delete
 *   }
 * };
 * ```
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Types
export type ConfirmDialogVariant = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  variant?: ConfirmDialogVariant;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}

interface ConfirmDialogState extends ConfirmDialogOptions {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

interface ConfirmDialogContextType {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

// Context
const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

// Hook
export function useConfirm() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirm must be used within ConfirmDialogProvider');
  }
  return context.confirm;
}

// Variant Styles
const variantStyles = {
  danger: {
    icon: (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    iconBg: 'bg-red-100',
    confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  },
  warning: {
    icon: (
      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    iconBg: 'bg-yellow-100',
    confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
  },
  info: {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    iconBg: 'bg-blue-100',
    confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  },
  success: {
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    iconBg: 'bg-green-100',
    confirmButton: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  },
};

// Provider Component
export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    resolve: null,
  });

  // Confirm function (returns Promise)
  const confirm = useCallback((options: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        message: options.message,
        variant: options.variant || 'info',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        icon: options.icon,
        resolve,
      });
    });
  }, []);

  // Handle confirm
  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [state.resolve]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [state.resolve]);

  // Keyboard handler (ESC to cancel, Enter to confirm)
  useEffect(() => {
    if (!state.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        handleConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, handleConfirm, handleCancel]);

  const variant = variantStyles[state.variant || 'info'];

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      {/* Modal */}
      {state.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleCancel}
          />

          {/* Dialog */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className={`w-12 h-12 rounded-full ${variant.iconBg} flex items-center justify-center`}>
                  {state.icon || variant.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {state.title}
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-600 text-center mb-6">
                {state.message}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Cancel Button */}
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  {state.cancelText}
                </button>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirm}
                  className={`flex-1 px-4 py-2.5 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${variant.confirmButton}`}
                >
                  {state.confirmText}
                </button>
              </div>

              {/* Hint */}
              <div className="mt-4 text-center text-xs text-gray-400">
                Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">ESC</kbd> to cancel or{' '}
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">Enter</kbd> to confirm
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
}

// Example usage component (for documentation)
export function ConfirmDialogExample() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Property?',
      message: 'This action cannot be undone. All data associated with this property will be permanently deleted.',
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (confirmed) {
      console.log('Property deleted');
    }
  };

  const handleWarning = async () => {
    const confirmed = await confirm({
      title: 'Publish Draft?',
      message: 'This will make the property visible to all users on the website.',
      variant: 'warning',
      confirmText: 'Publish',
      cancelText: 'Keep as Draft',
    });

    if (confirmed) {
      console.log('Property published');
    }
  };

  const handleInfo = async () => {
    const confirmed = await confirm({
      title: 'Archive Property?',
      message: 'Archived properties can be restored later from the archive section.',
      variant: 'info',
      confirmText: 'Archive',
      cancelText: 'Cancel',
    });

    if (confirmed) {
      console.log('Property archived');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
        Delete (Danger)
      </button>
      <button onClick={handleWarning} className="px-4 py-2 bg-yellow-600 text-white rounded">
        Publish (Warning)
      </button>
      <button onClick={handleInfo} className="px-4 py-2 bg-blue-600 text-white rounded">
        Archive (Info)
      </button>
    </div>
  );
}
