/**
 * API Node
 * 
 * Makes HTTP requests to external APIs.
 * Inputs: payload (JSON to send)
 * Outputs: response, status code
 */

import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { getNodeConfig, renderAPINodeContent } from '../config/nodeConfigs';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDataChange = (fieldName, fieldValue) => {
    updateNodeField(id, fieldName, fieldValue);
  };

  const config = getNodeConfig('api');

  return (
    <BaseNode
      id={id}
      data={data}
      nodeConfig={{ ...config, content: renderAPINodeContent }}
      onDataChange={handleDataChange}
    />
  );
};

export default APINode;
