import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import TaskTable from './TaskTable';
import Dashboard from './Dashboard';
import Goals from './Goals';
import Docs from './Docs';
import Calendar from './Calendar';
import Automations from './Automations';
import Settings from './Settings';

const MainContent = () => {
  const { activeSection } = useNavigation();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskTable />;
      case 'goals':
        return <Goals />;
      case 'docs':
        return <Docs />;
      case 'calendar':
        return <Calendar />;
      case 'automations':
        return <Automations />;
      case 'settings':
        return <Settings />;
      default:
        return <TaskTable />;
    }
  };

  return renderContent();
};

export default MainContent;