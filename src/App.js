/**
 * Main App Component
 * 
 * Root component of the pipeline builder application.
 * Integrates toolbar, canvas, and controls.
 */

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className="flex flex-col w-full h-screen transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#f1f5f9' : '#1e293b',
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-3.5 flex items-center justify-between transition-colors duration-300"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(255, 255, 255, 0.08)'
            : '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
          borderBottom: isDark
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: isDark ? '#fff' : '#0f172a' }}>
            🔗 Pipeline Builder
          </h1>
          <p className="text-sm mt-1" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
            Build, visualize, and validate data pipelines
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Toolbar */}
      <PipelineToolbar />

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <PipelineUI />
      </div>

      {/* Footer */}
      <SubmitButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
