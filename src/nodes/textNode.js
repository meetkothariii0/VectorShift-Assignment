/**
 * Text Node - Refactored with Smart Features
 * 
 * Advanced text template node with:
 * - Variable parsing: Detects {{variableName}} patterns
 * - Dynamic handles: Auto-creates input handles for variables
 * - Auto-resize: Textarea grows/shrinks with content
 * 
 * Uses BaseNode abstraction for consistency and maintainability.
 */

import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig } from '../config/nodeConfigs';
import { useStore } from '../store';
import {
  parseVariablesFromText,
  generateVariableHandles,
  autoResizeTextarea,
} from '../utils/textNodeUtils';

// Custom content component for Text Node with variable support
const TextNodeContent = ({ data, onDataChange, onVariablesChange }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text || '');

  // Auto-resize textarea on content change
  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea(textareaRef.current, 60, 500);
    }
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onDataChange?.('text', newText);

    // Detect variables and create handles dynamically
    const variables = parseVariablesFromText(newText);
    if (onVariablesChange) {
      onVariablesChange(variables);
    }
  };

  const variables = parseVariablesFromText(text);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-300 block">
        Template (use {`{{ variable_name }}`})
      </label>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400
                   resize-none font-mono"
        placeholder={'Example:\nHello {{name}}!\nYour score: {{score}}'}
        style={{ minHeight: '80px', maxHeight: 'none', overflow: 'hidden' }}
      />
      {variables.length > 0 && (
        <div className="mt-2 text-xs">
          <p className="font-semibold text-indigo-300 mb-1">
            📌 Variables ({variables.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {variables.map((v) => (
              <span
                key={v}
                className="px-2 py-1 bg-indigo-900 border border-indigo-600
                           rounded text-indigo-100 font-mono text-xs"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [variables, setVariables] = useState(
    parseVariablesFromText(data?.text)
  );

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  // Update node inputs dynamically based on variables
  const handleVariablesChange = (newVariables) => {
    if (JSON.stringify(newVariables) !== JSON.stringify(variables)) {
      setVariables(newVariables);
      updateNodeField(id, 'variables', newVariables);
    }
  };

  // Get base config and augment with variable handles
  const baseConfig = getNodeConfig('text');
  const variableInputs = generateVariableHandles(variables);

  const augmentedConfig = {
    ...baseConfig,
    autoHeight: true,
    inputs: variableInputs,
    content: (data, onDataChange) =>
      <TextNodeContent
        data={data}
        onDataChange={onDataChange}
        onVariablesChange={handleVariablesChange}
      />,
  };

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={augmentedConfig}
      onDataChange={handleDataChange}
    />
  );
};
