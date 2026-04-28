/**
 * Delay Node
 * 
 * Introduces a time delay in the pipeline.
 * Useful for rate limiting, creating pauses, or simulating latency.
 * 
 * Inputs: data (to delay)
 * Outputs: output (delayed data)
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderDelayNodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('delay');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderDelayNodeContent }}
      onDataChange={handleDataChange}
    />
  );
};

export default DelayNode;
