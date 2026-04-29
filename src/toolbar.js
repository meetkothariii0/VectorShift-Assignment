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
    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(248, 250, 252, 0.8)',
    backgroundImage: isDark
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.65), rgba(15, 23, 42, 0.75))'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.85), rgba(241, 245, 249, 0.75))',
    backdropFilter: 'blur(16px) saturate(190%)',
    WebkitBackdropFilter: 'blur(16px) saturate(190%)',
    border: isDark 
      ? '1px solid rgba(255, 255, 255, 0.12)' 
      : '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    boxShadow: isDark
      ? '0 12px 40px rgba(59, 130, 246, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
      : '0 12px 40px rgba(59, 130, 246, 0.15), 0 6px 20px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
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
    <div style={toolbarStyle} className="px-6 py-3 transition-colors duration-200">
      {/* Header */}
      <div className="mb-3">
        <h2 style={headerTextStyle} className="text-lg font-bold">Node Library</h2>
        <p style={descriptionTextStyle} className="text-xs">Drag nodes to the canvas</p>
      </div>

      {/* Node palette organized by category */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
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
      <div style={tipTextStyle} className="mt-3 text-xs">
        💡 Tip: Connect nodes with edges to create your pipeline workflow
      </div>
    </div>
  );
};
