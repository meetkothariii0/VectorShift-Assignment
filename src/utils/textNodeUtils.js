/**
 * Text Node Utilities
 * 
 * Handles variable parsing, dynamic handle generation, and auto-resize logic
 */

/**
 * Parse variables from template string
 * 
 * Detects {{variableName}} patterns in text
 * Returns array of unique valid variable names
 * 
 * Rules:
 * - Variable names must start with letter or underscore
 * - Can contain letters, numbers, underscores
 * - Case sensitive
 * - Ignores duplicates
 */
export const parseVariablesFromText = (text) => {
  if (!text || typeof text !== 'string') return [];

  // Regex to match {{variableName}} patterns
  const variablePattern = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  const matches = new Set();

  let match;
  while ((match = variablePattern.exec(text)) !== null) {
    matches.add(match[1]);
  }

  return Array.from(matches).sort();
};

/**
 * Auto-resize textarea based on content
 * 
 * Expands height as user types, with min/max constraints
 */
export const autoResizeTextarea = (textareaElement, minHeight = 80, maxHeight = 500) => {
  if (!textareaElement) return;

  // Reset height to allow proper calculation
  textareaElement.style.height = 'auto';

  // Calculate new height based on content
  const newHeight = Math.min(maxHeight, Math.max(minHeight, textareaElement.scrollHeight));
  textareaElement.style.height = `${newHeight}px`;
};

/**
 * Generate dynamic input handles from parsed variables
 * 
 * Creates corresponding input handle for each variable
 * Handles: { id: 'var_name', label: 'var_name' }
 */
export const generateVariableHandles = (variables) => {
  return variables.map((varName) => ({
    id: varName,
    label: varName,
    type: 'input',
  }));
};

/**
 * Validate variable name
 * 
 * - Must start with letter or underscore
 * - Can contain letters, numbers, underscores
 */
export const isValidVariableName = (name) => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

/**
 * Compare two variable lists and identify changes
 * 
 * Returns: { added: [], removed: [] }
 */
export const diffVariables = (oldVars, newVars) => {
  const oldSet = new Set(oldVars);
  const newSet = new Set(newVars);

  const added = newVars.filter((v) => !oldSet.has(v));
  const removed = oldVars.filter((v) => !newSet.has(v));

  return { added, removed };
};

const textNodeUtils = {
  parseVariablesFromText,
  autoResizeTextarea,
  generateVariableHandles,
  isValidVariableName,
  diffVariables,
};

export default textNodeUtils;
