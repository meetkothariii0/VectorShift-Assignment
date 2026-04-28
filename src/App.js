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
        className="px-4 py-2 flex items-center justify-between"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, #1e293b, #0f172a)'
            : 'linear-gradient(to right, #e2e8f0, #cbd5e1)',
          boxShadow: isDark
            ? '0 4px 16px rgba(255, 255, 255, 0.08)'
            : '0 4px 16px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div>
          <h1 className="text-lg font-bold" style={{ color: isDark ? '#fff' : '#1e293b' }}>
            🔗 Pipeline Builder
          </h1>
          <p className="text-xs mt-0.5" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
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
