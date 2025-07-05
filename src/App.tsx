import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider } from './contexts/NavigationContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import MainContent from './components/MainContent';

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <div className="flex h-screen bg-white dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNavigation />
            <MainContent />
          </div>
        </div>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;