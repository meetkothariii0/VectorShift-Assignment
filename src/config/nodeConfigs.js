/**
 * Node Configuration System
 * 
 * Centralized configuration for all node types.
 * Each node config defines its UI, handles, and behavior.
 */

import React from 'react';

// ============= CONFIG DEFINITIONS =============

export const nodeConfigs = {
  // ===== CORE NODES =====
  customInput: {
    title: 'Input',
    description: 'Pipeline input',
    color: 'emerald',
    icon: '📥',
    inputs: [],
    outputs: [{ id: 'value', label: 'Value' }],
    width: 280,
    height: 300,
  },

  customOutput: {
    title: 'Output',
    description: 'Pipeline output',
    color: 'rose',
    icon: '📤',
    inputs: [{ id: 'value', label: 'Value' }],
    outputs: [],
    width: 280,
    height: 300,
  },

  llm: {
    title: 'LLM',
    description: 'Large Language Model',
    color: 'purple',
    icon: '🤖',
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' },
    ],
    outputs: [{ id: 'response', label: 'Response' }],
    width: 280,
    height: 360,
  },

  text: {
    title: 'Text',
    description: 'Text template',
    color: 'blue',
    icon: '📝',
    inputs: [], // Dynamically populated based on variables
    outputs: [{ id: 'output', label: 'Output' }],
    width: 210,
    height: 172,
  },

  // ===== NEW NODES =====

  api: {
    title: 'API Call',
    description: 'HTTP request',
    color: 'amber',
    icon: '🌐',
    inputs: [{ id: 'payload', label: 'Payload' }],
    outputs: [
      { id: 'response', label: 'Response' },
      { id: 'status', label: 'Status' },
    ],
    width: 280,
    height: 380,
  },

  filter: {
    title: 'Filter',
    description: 'Conditional filter',
    color: 'blue',
    icon: '🔍',
    inputs: [{ id: 'data', label: 'Data' }],
    outputs: [
      { id: 'pass', label: 'Pass' },
      { id: 'fail', label: 'Fail' },
    ],
    width: 280,
    height: 340,
  },

  math: {
    title: 'Math',
    description: 'Mathematical operation',
    color: 'slate',
    icon: '🔢',
    inputs: [
      { id: 'a', label: 'Value A' },
      { id: 'b', label: 'Value B' },
    ],
    outputs: [{ id: 'result', label: 'Result' }],
    width: 280,
    height: 350,
  },

  delay: {
    title: 'Delay',
    description: 'Time delay',
    color: 'slate',
    icon: '⏱️',
    inputs: [{ id: 'data', label: 'Data' }],
    outputs: [{ id: 'output', label: 'Output' }],
    width: 280,
    height: 300,
  },

  condition: {
    title: 'Condition',
    description: 'If/else branching',
    color: 'purple',
    icon: '🔀',
    inputs: [
      { id: 'condition', label: 'Condition' },
      { id: 'true_val', label: 'True Value' },
      { id: 'false_val', label: 'False Value' },
    ],
    outputs: [{ id: 'result', label: 'Result' }],
    width: 280,
    height: 390,
  },
};

// ============= CONTENT RENDERERS =============
// These functions render the content inside each node's body

export const renderInputNodeContent = (data, onDataChange) => {
  const customOutputLabels = data?.customOutputLabels || {};
  return (
  <div className="space-y-3">
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Node Name
      </label>
      <input
        type="text"
        value={data?.inputName || 'input_1'}
        onChange={(e) => onDataChange?.('inputName', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600 
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400"
        placeholder="input_1"
      />
    </div>
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Type
      </label>
      <select
        value={data?.inputType || 'Text'}
        onChange={(e) => onDataChange?.('inputType', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white
                   focus:outline-none focus:border-indigo-400"
      >
        <option value="Text">Text</option>
        <option value="Number">Number</option>
        <option value="File">File</option>
        <option value="JSON">JSON</option>
      </select>
    </div>
    <div className="border-t border-slate-600 pt-2 mt-2">
      <label className="text-xs font-medium block mb-2">
        📤 Output Port Name
      </label>
      <input
        type="text"
        value={customOutputLabels['value'] || 'Value'}
        onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, value: e.target.value })}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600 
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400"
        placeholder="Value"
      />
    </div>
  </div>
);
};

export const renderOutputNodeContent = (data, onDataChange) => {
  const customInputLabels = data?.customInputLabels || {};
  return (
  <div className="space-y-3">
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Node Name
      </label>
      <input
        type="text"
        value={data?.outputName || 'output_1'}
        onChange={(e) => onDataChange?.('outputName', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400"
        placeholder="output_1"
      />
    </div>
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Type
      </label>
      <select
        value={data?.outputType || 'Text'}
        onChange={(e) => onDataChange?.('outputType', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white
                   focus:outline-none focus:border-indigo-400"
      >
        <option value="Text">Text</option>
        <option value="Number">Number</option>
        <option value="Image">Image</option>
        <option value="JSON">JSON</option>
      </select>
    </div>
    <div className="border-t border-slate-600 pt-2 mt-2">
      <label className="text-xs font-medium block mb-2">
        📥 Input Port Name
      </label>
      <input
        type="text"
        value={customInputLabels['value'] || 'Value'}
        onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, value: e.target.value })}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400"
        placeholder="Value"
      />
    </div>
  </div>
);
};

export const renderLLMNodeContent = (data, onDataChange, isDark) => {
  const customInputLabels = data?.customInputLabels || {};
  const customOutputLabels = data?.customOutputLabels || {};
  const portLabelColor = isDark ? 'white' : 'black';
  return (
  <div className="space-y-2">
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Model
      </label>
      <select
        value={data?.model || 'gpt-4'}
        onChange={(e) => onDataChange?.('model', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white
                   focus:outline-none focus:border-indigo-400"
      >
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5">GPT-3.5</option>
        <option value="claude">Claude</option>
      </select>
    </div>
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Temperature
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={data?.temperature || 0.7}
        onChange={(e) => onDataChange?.('temperature', parseFloat(e.target.value))}
        className="w-full"
      />
      <span className="text-xs">{data?.temperature || 0.7}</span>
    </div>
    <div className="border-t border-slate-600 pt-2 mt-2 space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📥 Input Ports</p>
      <input type="text" value={customInputLabels['system'] || 'System'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, system: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="System" />
      <input type="text" value={customInputLabels['prompt'] || 'Prompt'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, prompt: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Prompt" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📤 Output Port</p>
      <input type="text" value={customOutputLabels['response'] || 'Response'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, response: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Response" />
    </div>
  </div>
);
};

export const renderTextNodeContent = (data, onDataChange) => (
  <div className="space-y-2">
    <label className="text-xs font-medium block">
      Content (use {'{{'} variable_name {'}}'})
    </label>
    <textarea
      value={data?.text || 'Enter text...'}
      onChange={(e) => onDataChange?.('text', e.target.value)}
      className="w-full h-20 px-2 py-1 bg-slate-700 border border-slate-600
                 rounded text-xs text-white placeholder-gray-500
                 focus:outline-none focus:border-indigo-400
                 resize-none font-mono text-xs"
      placeholder={'Output: {{input}}\nVariables auto-detected'}
    />
    <p className="text-xs">
      Variables detected: {data?.variables?.length || 0}
    </p>
  </div>
);

export const renderAPINodeContent = (data, onDataChange, isDark) => {
  const customInputLabels = data?.customInputLabels || {};
  const customOutputLabels = data?.customOutputLabels || {};
  const portLabelColor = isDark ? 'white' : 'black';
  return (
  <div className="space-y-2">
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        URL
      </label>
      <input
        type="text"
        value={data?.url || ''}
        onChange={(e) => onDataChange?.('url', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400"
        placeholder="https://api.example.com/endpoint"
      />
    </div>
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Method
      </label>
      <select
        value={data?.method || 'GET'}
        onChange={(e) => onDataChange?.('method', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white
                   focus:outline-none focus:border-indigo-400"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
    </div>
    <div className="border-t border-slate-600 pt-2 mt-2 space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📥 Input Port</p>
      <input type="text" value={customInputLabels['payload'] || 'Payload'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, payload: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Payload" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📤 Output Ports</p>
      <input type="text" value={customOutputLabels['response'] || 'Response'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, response: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Response" />
      <input type="text" value={customOutputLabels['status'] || 'Status'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, status: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Status" />
    </div>
  </div>
);
};

export const renderFilterNodeContent = (data, onDataChange, isDark) => {
  const customInputLabels = data?.customInputLabels || {};
  const customOutputLabels = data?.customOutputLabels || {};
  const portLabelColor = isDark ? 'white' : 'black';
  return (
  <div className="space-y-2">
    <div>
      <label className="text-xs font-medium text-gray-300 block mb-1">
        Condition
      </label>
      <input
        type="text"
        value={data?.condition || 'data > 0'}
        onChange={(e) => onDataChange?.('condition', e.target.value)}
        className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                   rounded text-xs text-white placeholder-gray-500
                   focus:outline-none focus:border-indigo-400"
        placeholder="e.g., data > 0"
      />
    </div>
    <p className="text-xs">✓ Pass / ✗ Fail</p>
    <div className="border-t border-slate-600 pt-2 mt-2 space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📥 Input Port</p>
      <input type="text" value={customInputLabels['data'] || 'Data'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, data: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Data" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📤 Output Ports</p>
      <input type="text" value={customOutputLabels['pass'] || 'Pass'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, pass: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Pass" />
      <input type="text" value={customOutputLabels['fail'] || 'Fail'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, fail: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Fail" />
    </div>
  </div>
);
};

export const renderMathNodeContent = (data, onDataChange, isDark) => {
  const customInputLabels = data?.customInputLabels || {};
  const customOutputLabels = data?.customOutputLabels || {};
  const portLabelColor = isDark ? 'white' : 'black';
  return (
  <div className="space-y-2">
    <label className="text-xs font-medium text-gray-300 block mb-1">
      Operation
    </label>
    <select
      value={data?.operation || 'add'}
      onChange={(e) => onDataChange?.('operation', e.target.value)}
      className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                 rounded text-xs text-white
                 focus:outline-none focus:border-indigo-400"
    >
      <option value="add">Add</option>
      <option value="subtract">Subtract</option>
      <option value="multiply">Multiply</option>
      <option value="divide">Divide</option>
      <option value="modulo">Modulo</option>
      <option value="power">Power</option>
    </select>
    <div className="border-t border-slate-600 pt-2 mt-2 space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📥 Input Ports</p>
      <input type="text" value={customInputLabels['a'] || 'Value A'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, a: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Value A" />
      <input type="text" value={customInputLabels['b'] || 'Value B'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, b: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Value B" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📤 Output Port</p>
      <input type="text" value={customOutputLabels['result'] || 'Result'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, result: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Result" />
    </div>
  </div>
);
};

export const renderDelayNodeContent = (data, onDataChange, isDark) => {
  const customInputLabels = data?.customInputLabels || {};
  const customOutputLabels = data?.customOutputLabels || {};
  const portLabelColor = isDark ? 'white' : 'black';
  return (
  <div className="space-y-2">
    <label className="text-xs font-medium text-gray-300 block mb-1">
      Delay (ms)
    </label>
    <input
      type="number"
      value={data?.delayMs || 1000}
      onChange={(e) => onDataChange?.('delayMs', parseInt(e.target.value))}
      className="w-full px-2 py-1 bg-slate-700 border border-slate-600
                 rounded text-xs text-white placeholder-gray-500
                 focus:outline-none focus:border-indigo-400"
      placeholder="1000"
    />
    <p className="text-xs">⏱️ {data?.delayMs || 1000}ms</p>
    <div className="border-t border-slate-600 pt-2 mt-2 space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📥 Input Port</p>
      <input type="text" value={customInputLabels['data'] || 'Data'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, data: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Data" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📤 Output Port</p>
      <input type="text" value={customOutputLabels['output'] || 'Output'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, output: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Output" />
    </div>
  </div>
);
};

export const renderConditionNodeContent = (data, onDataChange, isDark) => {
  const customInputLabels = data?.customInputLabels || {};
  const customOutputLabels = data?.customOutputLabels || {};
  const portLabelColor = isDark ? 'white' : 'black';
  return (
  <div className="space-y-2">
    <p className="text-xs">
      Routes input based on condition
    </p>
    <div className="border-t border-slate-600 pt-2 mt-2 space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📥 Input Ports</p>
      <input type="text" value={customInputLabels['condition'] || 'Condition'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, condition: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Condition" />
      <input type="text" value={customInputLabels['true_val'] || 'True Value'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, true_val: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="True Value" />
      <input type="text" value={customInputLabels['false_val'] || 'False Value'} onChange={(e) => onDataChange?.('customInputLabels', { ...customInputLabels, false_val: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="False Value" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-medium" style={{ color: portLabelColor }}>📤 Output Port</p>
      <input type="text" value={customOutputLabels['result'] || 'Result'} onChange={(e) => onDataChange?.('customOutputLabels', { ...customOutputLabels, result: e.target.value })} className="w-full px-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-indigo-400" placeholder="Result" />
    </div>
  </div>
);
};

// ============= HELPERS =============

/**
 * Get node config by type
 */
export const getNodeConfig = (type) => {
  const config = nodeConfigs[type];
  if (!config) {
    console.warn(`Unknown node type: ${type}`);
    return nodeConfigs.text;
  }
  return config;
};

/**
 * Get content renderer for node type
 */
export const getNodeContentRenderer = (type) => {
  const renderers = {
    customInput: renderInputNodeContent,
    customOutput: renderOutputNodeContent,
    llm: renderLLMNodeContent,
    text: renderTextNodeContent,
    api: renderAPINodeContent,
    filter: renderFilterNodeContent,
    math: renderMathNodeContent,
    delay: renderDelayNodeContent,
    condition: renderConditionNodeContent,
  };

  return renderers[type] || (() => <div>No renderer</div>);
};
