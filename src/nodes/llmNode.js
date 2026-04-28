/**
 * LLM Node - Refactored
 * 
 * Represents a Large Language Model processor.
 * Connects system prompt and user prompt inputs to generate responses.
 * Uses BaseNode abstraction for consistency and maintainability.
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderLLMNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('llm');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderLLMNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};
