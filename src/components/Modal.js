/**
 * Modal Component
 * 
 * Reusable modal/dialog for displaying results, errors, or confirmations.
 * Features smooth animations and clean design.
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const Modal = ({
  isOpen = false,
  title = 'Dialog',
  message = '',
  type = 'info', // 'info', 'success', 'error', 'warning'
  details = null,
  onClose = () => {},
  actions = [],
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const typeColors = {
    info: {
      darkBg: 'box-shadow: 0 0 0 1px hsl(210, 100%, 50%)',
      lightBg: 'box-shadow: 0 0 0 1px hsl(210, 100%, 60%)',
      icon: '📋',
      darkTitle: 'hsl(210, 100%, 70%)',
      lightTitle: 'hsl(210, 100%, 40%)',
    },
    success: {
      darkBg: 'box-shadow: 0 0 0 1px hsl(142, 72%, 50%)',
      lightBg: 'box-shadow: 0 0 0 1px hsl(142, 72%, 60%)',
      icon: '✅',
      darkTitle: 'hsl(142, 100%, 70%)',
      lightTitle: 'hsl(142, 100%, 40%)',
    },
    error: {
      darkBg: 'box-shadow: 0 0 0 1px hsl(0, 80%, 50%)',
      lightBg: 'box-shadow: 0 0 0 1px hsl(0, 80%, 60%)',
      icon: '❌',
      darkTitle: 'hsl(0, 100%, 70%)',
      lightTitle: 'hsl(0, 100%, 40%)',
    },
    warning: {
      darkBg: 'box-shadow: 0 0 0 1px hsl(38, 92%, 50%)',
      lightBg: 'box-shadow: 0 0 0 1px hsl(38, 92%, 60%)',
      icon: '⚠️',
      darkTitle: 'hsl(38, 100%, 70%)',
      lightTitle: 'hsl(38, 100%, 40%)',
    },
  };

  const style = typeColors[type] || typeColors.info;
  const titleColor = isDark ? style.darkTitle : style.lightTitle;
  const modalBgColor = isDark ? 'hsl(240, 15%, 13%)' : 'hsl(0, 0%, 98%)';
  const borderColor = isDark ? 'hsl(240, 9%, 20%)' : 'hsl(0, 0%, 85%)';
  const messageColor = isDark ? 'hsl(0, 0%, 83%)' : 'hsl(0, 0%, 30%)';
  const detailsBgColor = isDark ? 'hsl(240, 15%, 18%)' : 'hsl(0, 0%, 93%)';
  const detailsTextColor = isDark ? 'hsl(0, 0%, 75%)' : 'hsl(0, 0%, 35%)';
  const headerBgColor = isDark ? 'hsl(240, 15%, 15%)' : 'hsl(0, 0%, 95%)';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
      <div
        style={{
          backgroundColor: modalBgColor,
          borderColor: borderColor,
        }}
        className="border-2 rounded-lg shadow-2xl max-w-md w-full mx-4 animate-slide-up transition-colors duration-200"
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: headerBgColor,
            borderColor: borderColor,
          }}
          className="px-6 py-4 border-b"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{style.icon}</span>
            <h2
              style={{ color: titleColor }}
              className="text-lg font-bold"
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p style={{ color: messageColor }} className="text-sm leading-relaxed">
            {message}
          </p>

          {/* Details section */}
          {details && (
            <div
              style={{
                backgroundColor: detailsBgColor,
                borderColor: borderColor,
              }}
              className="mt-4 rounded p-3 border"
            >
              <pre
                style={{ color: detailsTextColor }}
                className="text-xs font-mono overflow-auto max-h-48"
              >
                {typeof details === 'string'
                  ? details
                  : JSON.stringify(details, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div
          style={{ borderColor: borderColor }}
          className="px-6 py-4 border-t flex gap-3 justify-end"
        >
          <button
            onClick={onClose}
            className="uiverse-button"
          >
            Got it
          </button>

          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.onClick?.();
                onClose();
              }}
              className={`button button--compact ${action.variant === 'primary' ? 'button--primary' : ''}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
