/**
 * SubmitButton Component
 * 
 * Submits the pipeline to the backend for validation.
 * Shows loading states, errors, and success results in a modal.
 */

import { useState, useCallback } from 'react';
import { useStore } from './store';
import { useTheme } from './context/ThemeContext';
import { shallow } from 'zustand/shallow';
import { validatePipeline } from './services/apiService';
import { Modal } from './components/Modal';

export const SubmitButton = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    details: null,
  });

  const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
  });

  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = useCallback(async () => {
    // Validation: Check if pipeline is empty
    if (nodes.length === 0) {
      setModalState({
        isOpen: true,
        type: 'warning',
        title: 'Whoops, no nodes yet',
        message: 'Drag some nodes onto the canvas to build your pipeline.',
      });
      return;
    }

    // Validation: Check if there are input and output nodes
    const hasInput = nodes.some((n) => n.type === 'customInput');
    const hasOutput = nodes.some((n) => n.type === 'customOutput');

    if (!hasInput || !hasOutput) {
      setModalState({
        isOpen: true,
        type: 'warning',
        title: 'Need start and end',
        message: 'Add at least one Input node and one Output node to define where data flows in and out.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API
      const result = await validatePipeline(nodes, edges);

      // Success case
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'All set! 🚀',
        message: `Your pipeline is set up perfectly. All nodes are connected and ready to go.`,
        details: result,
      });
    } catch (error) {
      // Error case
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Oops, something went wrong',
        message: error.message || 'Could not validate your pipeline. Check your connections and try again.',
        details: error.response?.data,
      });
    } finally {
      setIsLoading(false);
    }
  }, [nodes, edges]);

  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  const containerStyle = {
    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(248, 250, 252, 0.9)',
    borderTop: isDark 
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: isDark
      ? '0 -12px 40px rgba(0, 0, 0, 0.2), 0 -4px 16px rgba(255, 255, 255, 0.08)'
      : '0 -12px 40px rgba(0, 0, 0, 0.08), 0 -4px 16px rgba(0, 0, 0, 0.04)',
    backdropFilter: 'blur(8px)',
  };

  const labelStyle = {
    color: isDark ? 'hsl(0, 0%, 55%)' : 'hsl(0, 0%, 45%)',
  };

  const statStyle = {
    color: isDark ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 20%)',
  };

  return (
    <>
      <div
        style={containerStyle}
        className="px-4 py-2 flex items-center justify-between transition-colors duration-200"
      >
        {/* Stats */}
        <div className="flex gap-3">
          <div className="text-center">
            <p style={labelStyle} className="text-xs font-medium">
              NODES
            </p>
            <p style={statStyle} className="text-lg font-bold">
              {nodeCount}
            </p>
          </div>
          <div className="text-center">
            <p style={labelStyle} className="text-xs font-medium">
              EDGES
            </p>
            <p style={statStyle} className="text-lg font-bold">
              {edgeCount}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`uiverse-button ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          style={{
            opacity: isLoading ? 0.75 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 inline-block mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {isLoading ? 'Validating...' : '✨ Submit & Validate'}
        </button>
      </div>

      {/* Modal for results */}
      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        details={modalState.details}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
      />
    </>
  );
};
