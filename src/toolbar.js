/**
 * PipelineToolbar Component
 * 
 * Displays draggable node palette for users to add nodes to the pipeline.
 * Organized by categories for better UX.
 */

import { DraggableNode } from './draggableNode';
import { useTheme } from './context/ThemeContext';

export const PipelineToolbar = () => {
  const { isDark } = useTheme();

  const toolbarStyle = {
    backgroundColor: isDark ? 'hsl(240, 13%, 13%)' : 'hsl(0, 0%, 96%)',
    backgroundImage: isDark
      ? 'linear-gradient(180deg, hsl(240, 15%, 16%), hsl(240, 13%, 13%))'
      : 'linear-gradient(180deg, hsl(0, 0%, 98%), hsl(0, 0%, 94%))',
    boxShadow: isDark
      ? '0 4px 16px rgba(255, 255, 255, 0.08), 0 8px 16px rgba(255, 255, 255, 0.05)'
      : '0 4px 16px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.05)',
  };

  const headerTextStyle = {
    color: isDark ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 20%)',
  };

  const descriptionTextStyle = {
    color: isDark ? 'hsl(0, 0%, 55%)' : 'hsl(0, 0%, 45%)',
  };

  const tipTextStyle = {
    color: isDark ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 55%)',
  };

  return (
    <div style={toolbarStyle} className="px-6 py-4 transition-colors duration-200">
      {/* Header */}
      <div className="mb-4">
        <h2 style={headerTextStyle} className="text-lg font-bold">Node Library</h2>
        <p style={descriptionTextStyle} className="text-xs">Drag nodes to the canvas</p>
      </div>

      {/* Node palette organized by category */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* Core IO Nodes */}
        <DraggableNode type="customInput" label="📥 Input" />
        <DraggableNode type="customOutput" label="📤 Output" />

        {/* Processing Nodes */}
        <DraggableNode type="text" label="📝 Text" />
        <DraggableNode type="llm" label="🤖 LLM" />

        {/* New Nodes */}
        <DraggableNode type="api" label="🌐 API" />
        <DraggableNode type="filter" label="🔍 Filter" />
        <DraggableNode type="math" label="🔢 Math" />
        <DraggableNode type="delay" label="⏱️ Delay" />
        <DraggableNode type="condition" label="🔀 Condition" />
      </div>

      {/* Info text */}
      <div style={tipTextStyle} className="mt-4 text-xs">
        💡 Tip: Connect nodes with edges to create your pipeline workflow
      </div>
    </div>
  );
};
